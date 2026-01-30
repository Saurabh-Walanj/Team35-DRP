import { useEffect, useState } from 'react';
import { adminAPI } from '../../api';
import { toast } from 'react-toastify';
import DataTable from '../../components/DataTable';

const ViewFamilies = () => {
    const [families, setFamilies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFamilies();
    }, []);

    const fetchFamilies = async () => {
        try {
            const data = await adminAPI.getAllFamilies();
            setFamilies(data || []);
        } catch (error) {
            console.error('Error fetching families:', error);
            toast.error('Failed to load families data');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { key: 'cardNumber', label: 'Ration Card ID' },
        {
            key: 'headOfFamilyName',
            label: 'Head of Family',
            render: (row) => <span className="font-bold">{row.headOfFamilyName || row.headOfFamily || 'N/A'}</span>
        },
        {
            key: 'familyMemberCount',
            label: 'Family count',
            render: (row) => <span className="font-mono font-bold">{row.familyMemberCount}</span>,
        },
        {
            key: 'address',
            label: 'Address',
            render: (row) => <span className="text-xs text-gray-500 line-clamp-1">{row.address}</span>
        },
        {
            key: 'shopName',
            label: 'Associated Shops',
            render: (row) => <span className="font-medium text-gray-700">{row.shopName}</span>,
        },
        {
            key: 'status',
            label: 'Verification',
            render: (row) => {
                const status = row.status?.toUpperCase();
                return (
                    <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${status === 'VERIFIED' || status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                            }`}
                    >
                        {row.status || 'PENDING'}
                    </span>
                );
            },
        },
        {
            key: 'issueDate',
            label: 'Registry Date',
            render: (row) => <span className="text-xs text-gray-400">{new Date(row.issueDate).toLocaleDateString()}</span>,
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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 text-center">
                <StatCard
                    label="Total Families"
                    value={families.length}
                    color="text-[#003D82]"
                    bg="bg-blue-50"
                    desc="Active Records"
                />
                <StatCard
                    label="Verified Cards"
                    value={families.filter(f => f.status === 'VERIFIED').length}
                    color="text-green-700"
                    bg="bg-green-50"
                    desc="Validation Passed"
                />
                <StatCard
                    label="Total Beneficiaries"
                    value={families.reduce((sum, f) => sum + f.familyMemberCount, 0)}
                    color="text-orange-700"
                    bg="bg-orange-50"
                    desc="Cumulative Count"
                />
                <StatCard
                    label="Avg Household Size"
                    value={families.length > 0 ? (families.reduce((sum, f) => sum + f.familyMemberCount, 0) / families.length).toFixed(1) : 0}
                    color="text-[#DAA520]"
                    bg="bg-[#FFFBF0]"
                    desc="Statistical Mean"
                />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <DataTable
                    columns={columns}
                    data={families}
                    searchable
                    searchPlaceholder="Search registry by card number or family head..."
                />
            </div>
        </div>
    );
};

const StatCard = ({ label, value, color, bg, desc }) => (
    <div className={`${bg} p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center group hover:scale-105 transition-transform duration-300`}>
        <p className="text-[10px] text-gray-500 uppercase font-bold  mb-2">{label}</p>
        <p className={`text-4xl font-bold ${color}`}>{value}</p>
        <p className="text-[10px] text-gray-400 mt-2 font-medium">{desc}</p>
    </div>
);

export default ViewFamilies;
