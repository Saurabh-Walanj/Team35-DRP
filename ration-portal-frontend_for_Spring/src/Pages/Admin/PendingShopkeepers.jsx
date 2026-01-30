import { useEffect, useState } from 'react';
import { adminAPI } from '../../api';
import { toast } from 'react-toastify';
import DataTable from '../../components/DataTable';

const PendingShopkeepers = () => {
    const [shopkeepers, setShopkeepers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingShopkeepers();
    }, []);

    const fetchPendingShopkeepers = async () => {
        try {
            const data = await adminAPI.getPendingShopkeepers();
            setShopkeepers(data || []);
        } catch (error) {
            console.error('Error fetching pending shopkeepers:', error);
            toast.error('Failed to load pending shopkeepers');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (shopkeeperId) => {
        if (!confirm('Are you sure you want to approve this shopkeeper?')) return;

        try {
            await adminAPI.approveShopkeeper(shopkeeperId);
            toast.success('Shopkeeper approved successfully');
            fetchPendingShopkeepers();
        } catch (error) {
            console.error('Error approving shopkeeper:', error);
            toast.error(error.response?.data?.message || 'Failed to approve shopkeeper');
        }
    };

    const columns = [
        { key: 'userId', label: 'Shopkeeper ID' },
        {
            key: 'name',
            label: 'Applicant Name',
            render: (row) => <span className="font-bold">{row.name}</span>
        },
        { key: 'email', label: 'Official Email' },
        {
            key: 'createdAt',
            label: 'Registration Date',
            render: (row) => new Date(row.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' }),
        },
        {
            key: 'actions',
            label: 'Action',
            render: (row) => (
                <button
                    onClick={() => handleApprove(row.userId)}
                    className="bg-blue-600   text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800 transition-all shadow-md active:scale-95  text-xs "
                >
                    Approve
                </button>
            ),
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
            <div className="mb-8 border-b-2 border-black pb-4">
                <h3 className="text-2xl font-bold text-blue-900">
                    Verification Tab
                </h3>
                {/* <p className="text-sm text-gray-500 mt-1 font-medium uppercase -wider">
                    Review and Validate Shopkeeper Credential Requests
                </p> */}
            </div>

            {shopkeepers.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-200 p-12 text-center">
                    <span className="text-4xl mb-4 block"></span>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">All Requests Approved</p>
                    <p className="text-xs text-gray-400 mt-2">No pending applications at this time.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <DataTable
                        columns={columns}
                        data={shopkeepers}
                        searchable
                        searchPlaceholder="Search by applicant name or email..."
                    />
                </div>
            )}
        </div>
    );
};

export default PendingShopkeepers;
