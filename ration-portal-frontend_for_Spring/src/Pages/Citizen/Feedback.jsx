import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { citizenAPI, shopkeeperAPI } from '../../api';
import { getUserEmail } from '../../utils/authUtils';

const CitizenFeedback = () => {
    const [shopDetails, setShopDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState('');
    const [hover, setHover] = useState(0);

    useEffect(() => {
        fetchShopDetails();
    }, []);

    const fetchShopDetails = async () => {
        try {
            const email = getUserEmail();
            const data = await citizenAPI.getMyRationCard(email);
            setShopDetails(data);
        } catch (error) {
            console.error('Error fetching shop details:', error);
            toast.error('Failed to load shop details');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error('Please provide a rating');
            return;
        }
        if (!comments.trim()) {
            toast.error('Please provide comments');
            return;
        }

        try {
            const payload = {
                shopkeeperId: shopDetails.shopkeeperId,
                citizenEmail: getUserEmail(),
                rating: rating,
                comments: comments
            };
            console.log("Submitting feedback payload:", payload);
            await shopkeeperAPI.addFeedback(payload);
            toast.success('Feedback submitted successfully!');
            setRating(0);
            setComments('');
        } catch (error) {
            console.error('Feedback submission failed:', error);
            toast.error(error.response?.data?.message || 'Failed to submit feedback');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#003D82]"></div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
            <div className="mb-8 border-b-2s pb-6 text-center">
                <h3 className="text-2xl font-bold text-[#003D82]">Rate Your Shop</h3>
                <p className="text-sm text-gray-500 mt-1 uppercase tracking-wider">Share your experience with {shopDetails?.shopName}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-center">
                        <label className="block text-sm font-bold text-gray-700 mb-4">How would you rate your experience?</label>
                        <div className="flex justify-center gap-2">
                            {[...Array(5)].map((_, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        className={`text-4xl transition-all duration-200 transform hover:scale-110 focus:outline-none ${ratingValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
                                            }`}
                                        onClick={() => setRating(ratingValue)}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(rating)}
                                    >
                                        ★
                                    </button>
                                );
                            })}
                        </div>
                        <p className="text-xs text-gray-400 mt-2 font-medium">Click on a star to rate</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Tell us more</label>
                        <textarea
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#003D82] focus:ring-1 focus:ring-[#003D82] outline-none transition-all resize-none bg-gray-50 focus:bg-white"
                            rows="4"
                            placeholder="Was the service quick? Was the quality good?..."
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#003D82] text-white py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-[#002A5C] transition-all shadow-md active:scale-95"
                    >
                        Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CitizenFeedback;
