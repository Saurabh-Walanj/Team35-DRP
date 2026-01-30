import { citizenAPI } from '../../api';
import { toast } from 'react-toastify';
import { getUserEmail } from '../../utils/authUtils';
import { useEffect, useState } from 'react';

const RationCard = () => {
    const [rationCard, setRationCard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRationCard();
    }, []);

    const fetchRationCard = async () => {
        try {
            const email = getUserEmail();
            const data = await citizenAPI.getMyRationCard(email);
            setRationCard(data);
        } catch (error) {
            console.error('Error fetching ration card:', error);
            toast.error('Failed to load ration card');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#003D82]"></div>
            </div>
        );
    }

    if (!rationCard) {
        return (
            <div className="bg-[#FFFBF0] border-2  rounded-2xl p-10 text-center shadow-lg max-w-2xl mx-auto mt-10">
                <span className="text-5xl mb-6 block"></span>
                <h3 className="text-2xl font-bold text-[#003D82] mb-4 uppercase tracking-tight">Identity Not Found</h3>
                <p className="text-gray-600 font-medium">Your credentials are not associated with any active ration card. Please contact your local PDS office.</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto rounded-lg border-2 border-gray-300 p-6">


            <div className="border-b pb-4 mb-6">
                <h2 className="text-l font-bold text-gray-800">
                    Digital Ration Card
                </h2>
                <p className="text-l text-gray-700">
                    Head of Family: <strong>{rationCard.headOfFamilyName}</strong>
                </p>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">

                <div>
                    <p className="text-gray-500">Card Number</p>
                    <p className="font-mono font-semibold">{rationCard.cardNumber}</p>
                </div>

                <div>
                    <p className="text-gray-500">Status</p>
                    <span
                        className={`inline-block px-3 py-1 rounded text-xs font-semibold ${rationCard.status === 'VERIFIED'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                            }`}
                    >
                        {rationCard.status}
                    </span>
                </div>

                <div>
                    <p className="text-gray-500">Family Members</p>
                    <p className="font-semibold">{rationCard.familyMemberCount}</p>
                </div>

                <div>
                    <p className="text-gray-500">Issue Date</p>
                    <p className="font-semibold">
                        {new Date(rationCard.issueDate).toLocaleDateString('en-IN')}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500">Ration Shop</p>
                    <p className="font-semibold">{rationCard.shopName}</p>
                </div>

                <div>
                    <p className="text-gray-500">Shop Location</p>
                    <p className="font-semibold">{rationCard.shopLocation}</p>
                </div>

                <div className="sm:col-span-2">
                    <p className="text-gray-500">Registered Address</p>
                    <p className="font-semibold">
                        {rationCard.address}
                    </p>
                </div>
            </div>


            <div className="mt-8 flex justify-end">
                <button
                    onClick={() => window.print()}
                    className="px-6 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-900"
                >
                    Print / Save PDF
                </button>
            </div>
        </div>

    );
};

const DataPoint = ({ label, value }) => (
    <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-base font-bold text-gray-800">{value || 'N/A'}</p>
    </div>
);

export default RationCard;
