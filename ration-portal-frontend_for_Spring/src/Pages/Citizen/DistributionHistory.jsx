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

    const handlePrint = (row) => {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Payment Receipt</title>');
        printWindow.document.write('<style>');
        printWindow.document.write(`
            body { font-family: 'Courier New', Courier, monospace; padding: 20px; }
            .receipt { border: 2px dashed #003D82; padding: 30px; max-width: 500px; margin: 0 auto; background: #fff; }
            .header { text-align: center; border-bottom: 2px solid #003D82; padding-bottom: 20px; margin-bottom: 20px; }
            .row { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 14px; }
            .total { font-weight: bold; border-top: 1px solid #003D82; padding-top: 15px; margin-top: 15px; font-size: 18px; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
            .title { font-size: 24px; font-weight: bold; color: #003D82; margin: 0; }
            .subtitle { font-size: 14px; color: #666; margin-top: 5px; }
        `);
        printWindow.document.write('</style></head><body>');
        printWindow.document.write(`
            <div class="receipt">
                <div class="header">
                    <h1 class="title">RATION SAHAYATA</h1>
                    <p class="subtitle">Official Distribution Receipt</p>
                </div>
                <div class="row">
                    <span>Date:</span>
                    <span>${new Date(row.distributionDate).toLocaleString()}</span>
                </div>
                <div class="row">
                    <span>Receipt ID:</span>
                    <span>${row.transactionId || 'DIST-' + row.distributionId}</span>
                </div>
                <div class="row">
                    <span>Commodity:</span>
                    <span>${row.grain}</span>
                </div>
                 <div class="row">
                    <span>Quantity:</span>
                    <span>${row.quantityGiven} KG</span>
                </div>
                 <div class="row">
                    <span>Shop Name:</span>
                    <span>${row.shopName}</span>
                </div>
                <div class="total">
                    <span>STATUS:</span>
                    <span>${row.status}</span>
                </div>
                <div class="footer">
                    <p>This is a computer generated receipt.</p>
                </div>
            </div>
        `);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
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
        {
            key: 'actions',
            label: 'Actions',
            render: (row) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handlePrint(row)}
                        className="p-2 text-gray-500 hover:text-[#003D82] hover:bg-blue-50 rounded-lg transition-all"
                        title="Download Receipt"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </button>
                </div>
            )
        }
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
