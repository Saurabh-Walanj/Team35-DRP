import { useEffect, useState } from 'react';
import { shopkeeperAPI } from '../../api';
import { toast } from 'react-toastify';
import DataTable from '../../components/DataTable';
import { getUserId } from '../../utils/authUtils';

const StockManagement = () => {
    const [allocations, setAllocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const shopkeeperId = getUserId();
            const shop = await shopkeeperAPI.getMyShop(shopkeeperId);

            if (shop && shop.shopId) {
                const allocs = await shopkeeperAPI.getMyAllocations(shopkeeperId);
                setAllocations(allocs || []);
            }
        } catch (error) {
            console.error('Error fetching stock data:', error);
            toast.error('Failed to load stock data');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmStock = async () => {
        const pendingCount = allocations.filter(a => a.status === 'Pending').length;
        if (pendingCount === 0) {
            toast.info('No pending allocations to confirm');
            return;
        }

        if (!confirm(`Are you sure you want to verify receipt of all ${pendingCount} pending allocations?`)) return;

        try {
            const shopkeeperId = getUserId();
            await shopkeeperAPI.confirmAllPendingStock(shopkeeperId);
            toast.success('Inventory balance updated successfully');
            fetchData();
        } catch (error) {
            console.error('Error confirming stock:', error);
            toast.error(error.response?.data?.message || 'Failed to confirm stock receipt');
        }
    };

    const allocationColumns = [
        { key: 'allocationId', label: 'Allocation ID' },
        {
            key: 'grain',
            label: 'grain',
            render: (row) => <span className="font-bold uppercase tracking-wide">{row.grain}</span>
        },
        {
            key: 'quantityAllocated',
            label: 'Quantity (kg)',
            render: (row) => <span className="font-mono font-bold">{row.quantityAllocated} KG</span>,
        },
        {
            key: 'allocatedDate',
            label: 'Allocation Date',
            render: (row) => <span className="text-xs text-gray-500">{new Date(row.allocatedDate).toLocaleDateString()}</span>,
        },
        {
            key: 'status',
            label: 'Inventory Status',
            render: (row) => (
                <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${row.status === 'COMPLETED'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-[#FFFBF0] text-[#DAA520] border border-[#DAA520]'
                        }`}
                >
                    {row.status}
                </span>
            ),
        },
    ];

    const pendingAllocations = allocations.filter(a => a.status === 'Pending');

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#003D82]"></div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-8 border-b-2 border-[#FFFBF0] pb-6">
                <h3 className="text-2xl font-bold text-[#003D82]">My Allocations </h3>
            </div>

            {/* Verification Alert */}
            {pendingAllocations.length > 0 && (
                <div className="bg-[#FFFBF0] border-2 border-[#DAA520] rounded-2xl p-8 mb-10 shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#DAA520] opacity-5 -mr-16 -mt-16 rounded-full group-hover:scale-110 transition-transform"></div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1">
                            <h4 className="text-xl font-bold text-[#003D82] mb-2 uppercase tracking-tight">Pending Dispatch Verification</h4>
                            <p className="text-sm text-gray-600 font-medium leading-relaxed">
                                You have <span className="text-[#FF6B35] font-bold text-lg">{pendingAllocations.length}</span> unconfirmed stock delivery logs.
                                Please verify the receipt of physical goods before digitally updating the registry.
                            </p>
                        </div>
                        <button
                            onClick={handleConfirmStock}
                            className="bg-[#003D82] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#002A5C] transition-all shadow-xl active:scale-95 uppercase tracking-widest text-sm"
                        >
                            Verify All Deliveries
                        </button>
                    </div>
                </div>
            )}

            {/* History Database */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-8 py-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                    <h4 className="text-xs font-bold text-gray-400 uppercase">Alloaction History</h4>
                </div>
                <DataTable columns={allocationColumns} data={allocations} />
            </div>
        </div>
    );
};

export default StockManagement;
