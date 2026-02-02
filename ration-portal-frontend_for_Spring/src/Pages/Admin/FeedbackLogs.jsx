import DataTable from '../../components/DataTable';
import { adminAPI } from '../../api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const FeedbackLogs = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const data = await adminAPI.getAllFeedback();
            setFeedbacks(data || []);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
            toast.error('Failed to load feedback logs');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            key: 'createdAt',
            label: 'Date',
            render: (row) => <span className="text-gray-600 font-mono text-xs">{new Date(row.createdAt).toLocaleDateString()}</span>,
        },
        {
            key: 'shopName',
            label: 'Shop Name',
            render: (row) => <span className="font-bold text-[#003D82]">{row.shopName || 'Unknown Shop'}</span>,
        },
        {
            key: 'rationCardNumber',
            label: 'Ration Card No.',
            render: (row) => <span className="font-mono text-gray-800 font-bold">{row.rationCardNumber || 'N/A'}</span>,
        },
        {
            key: 'rating',
            label: 'Rating',
            render: (row) => (
                <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < row.rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
            ),
        },
        {
            key: 'comments',
            label: 'Comments',
            render: (row) => <span className="text-sm text-gray-600 italic">"{row.comments || 'No comments'}"</span>,
        },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#003D82]"></div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-8 border-b-2 border-[#FFFBF0] pb-6 flex justify-between items-center">
                <div>
                    <h3 className="text-2xl font-bold text-[#003D82]">Citizen Feedback Logs</h3>
                    <p className="text-sm text-gray-400 mt-1 uppercase tracking-widest font-bold">Monitor Public Satisfaction & Grievances</p>
                </div>
                <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Average Rating</span>
                    <span className="text-2xl font-bold text-[#003D82]">
                        {(feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / (feedbacks.length || 1)).toFixed(1)} / 5
                    </span>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={feedbacks}
                searchable
                searchPlaceholder="Search by Shop Name or Card Number..."
            />
        </div>
    );
};

export default FeedbackLogs;
