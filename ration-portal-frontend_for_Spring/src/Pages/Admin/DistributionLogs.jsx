import { useEffect, useState } from 'react';
import { adminAPI } from '../../api';
import { toast } from 'react-toastify';
import DataTable from '../../components/DataTable';
import { useNavigate } from 'react-router-dom';

const DistributionLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const data = await adminAPI.getAllDistributionLogs();
            setLogs(data || []);
        } catch (error) {
            console.error('Error fetching distribution logs:', error);
            toast.error(error.response?.data?.message || 'Failed to load distribution logs');
        } finally {
            setLoading(false);
        }
    };

    const handleNavigate = (id) => {
        navigate(`/admin/distribution-logs/distribution-details/${id}`);
    };

    const columns = [
        { key: 'distributionId', label: 'ID' },
        {
            key: 'distributionDate',
            label: 'Timestamp',
            render: (row) => <span className="text-xs font-medium text-gray-500">{new Date(row.distributionDate).toLocaleDateString()}</span>,
        },
        {
            key: 'headOfFamily',
            label: 'family head',
            render: (row) => <span className="font-semibold">{row.headOfFamily || 'N/A'}</span>,
        },
        {
            key: 'grain',
            label: 'Commodity',
            render: (row) => <span className="font-semibold tracking-widest text-sm">{row.grain || 'N/A'}</span>,
        },
        {
            key: 'quantityGiven',
            label: 'Net Weight',
            render: (row) => <span className="font-mono font-bold">{row.quantityGiven} KG</span>,
        },
        {
            key: 'shopName',
            label: 'Issuing FPS',
            render: (row) => <span className="font-medium text-gray-700">{row.shopName || 'N/A'}</span>,
        },
        {
            key: 'status',
            label: 'Audit Status',
            render: (row) => {
                const status = row.status || 'Completed';
                const colorClass = (status === 'SUCCESS' || status === 'Completed')
                    ? 'bg-green-100 text-green-700'
                    : status === 'Pending'
                        ? 'bg-[#FFFBF0] text-[#DAA520] border border-[#DAA520]'
                        : 'bg-red-100 text-red-700';

                return (
                    <span className={`px-3 py-1 rounded-full text-[10px] font-semibold  ${colorClass}`}>
                        {status}
                    </span>
                );
            },
        },
        {
            key: 'Info',
            label: 'Audit Trail',
            render: (row) => (
                <button
                    onClick={() => handleNavigate(row.distributionId)}
                    className="text-blue-500 hover: font-semibold text-xs border-b border-transparent transition-all"
                >
                    View Details
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
            <div className="mb-8 border-b-2 pb-6">
                <h3 className="text-2xl font-bold text-[#003D82]">Distribution Audit Logs</h3>
            </div>

            {logs.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-200 p-16 text-center">
                    <span className="text-5xl mb-4 block">🔍</span>
                    <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-sm">No Audit Records Available</p>
                    <p className="text-xs text-gray-400 mt-2">Logs will be generated as shopkeepers facilitate ration distribution.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <DataTable
                        columns={columns}
                        data={logs}
                        searchable
                        searchPlaceholder="Filter registry by card ID, commodity, or FPS center..."
                    />
                </div>
            )}
        </div>
    );
};

export default DistributionLogs;
