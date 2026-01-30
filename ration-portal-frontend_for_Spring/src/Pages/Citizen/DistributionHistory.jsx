import { citizenAPI } from '../../api';
import { toast } from 'react-toastify';
import DataTable from '../../components/DataTable';
import { getUserEmail } from '../../utils/authUtils';
import { useEffect, useState } from 'react';

const CitizenDistributionHistory = () => {
    const [distributions, setDistributions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDistributions();
    }, []);

    const fetchDistributions = async () => {
        try {
            const email = getUserEmail();
            const data = await citizenAPI.getMyDistributions(email);
            setDistributions(data || []);
        } catch (error) {
            console.error('Error fetching distribution history:', error);
            toast.error('Failed to load distribution history');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            key: 'distributionDate',
            label: 'Issue Date',
            render: (row) => <span className="text-xs font-bold text-gray-500">{new Date(row.distributionDate).toLocaleDateString()}</span>,
        },
        {
            key: 'grain',
            label: 'Commodity',
            render: (row) => <span className="font-bold text-[#003D82] uppercase tracking-wide">{row.grain}</span>
        },
        {
            key: 'quantityGiven',
            label: 'Quantity Received',
            render: (row) => <span className="font-mono font-bold text-gray-900">{row.quantityGiven} KG</span>,
        },
        {
            key: 'shopName',
            label: 'FPS Center',
            render: (row) => <span className="text-xs font-medium text-gray-600">{row.shopName || 'N/A'}</span>,
        },
        {
            key: 'status',
            label: 'Audit Status',
            render: (row) => {
                const isCompleted = row.status === 'SUCCESS';
                return (
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-[#FFFBF0] text-[#DAA520] border border-[#DAA520]'}`}>
                        {row.status || 'Verified'}
                    </span>
                );
            },
        },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#003D82]"></div>
            </div>
        );
    }

    const totalQuantity = distributions.reduce((sum, d) => sum + (d.quantityGiven || 0), 0);
    const thisMonthLogs = distributions.filter(d => {
        const distDate = new Date(d.distributionDate);
        const now = new Date();
        return distDate.getMonth() === now.getMonth() && distDate.getFullYear() === now.getFullYear();
    });

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-8 border-b-2s pb-6">
                {/* <h3 className="text-2xl font-bold text-[#003D82]">Benefit Ledger</h3> */}
                {/* <p className="text-sm text-gray-500 mt-1 font-medium uppercase tracking-wider">Historical Record of Rations Received from Public Outlets</p> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <SummaryCard
                    label="Lifetime Receipts"
                    value={`${totalQuantity.toFixed(2)} KG`}

                    color="text-[#003D82]"
                />
                <SummaryCard
                    label="Transaction Count"
                    value={distributions.length}

                    color="text-[#FF6B35]"
                />
                <SummaryCard
                    label="Current Month"
                    value={thisMonthLogs.length}

                    color="text-green-700"
                />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-8 py-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Personal Distribution History</h4>

                </div>
                <DataTable
                    columns={columns}
                    data={distributions}
                    searchable
                    searchPlaceholder="Search by commodity or date..."
                />
            </div>
        </div>
    );
};

const SummaryCard = ({ label, value, icon, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md flex items-center gap-5 group hover:shadow-xl transition-all duration-300">
        <div className="text-4xl group-hover:scale-110 transition-transform">{icon}</div>
        <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">{label}</p>
            <p className={`text-3xl font-bold ${color} tracking-tight`}>{value}</p>
        </div>
    </div>
);

export default CitizenDistributionHistory;
