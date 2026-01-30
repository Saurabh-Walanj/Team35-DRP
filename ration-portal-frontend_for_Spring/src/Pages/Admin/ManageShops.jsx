import { useEffect, useState } from 'react';
import { adminAPI } from '../../api';
import { toast } from 'react-toastify';
import DataTable from '../../components/DataTable';

const ManageShops = () => {
    const [shops, setShops] = useState([]);
    const [shopkeepers, setShopkeepers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        shopName: '',
        location: '',
        shopkeeperId: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [shopsData, shopkeepersData] = await Promise.all([
                adminAPI.getAllShops(),
                adminAPI.getAllShopkeepers(),
            ]);
            setShops(shopsData || []);
            setShopkeepers((shopkeepersData || []).filter(sk => sk.status === 'Active'));
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to load shops data');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { shopkeeperId, ...shopData } = formData;
            await adminAPI.createShop(shopkeeperId, shopData);
            toast.success('Shop created successfully');
            setShowForm(false);
            setFormData({ shopName: '', location: '', shopkeeperId: '' });
            fetchData();
        } catch (error) {
            console.error('Error creating shop:', error);
            toast.error(error.response?.data?.message || 'Failed to create shop');
        }
    };

    const handleSuspend = async (shopkeeperId, status) => {
        if (!shopkeeperId) {
            toast.error("Invalid shopkeeper ID");
            return;
        }
        const action = status === "ACTIVE" ? "suspend" : "activate";
        if (!confirm(`Are you sure you want to ${action} this shopkeeper?`)) return;

        try {
            await adminAPI.suspendShopkeeper(shopkeeperId);
            toast.success(`Shopkeeper ${action}ed successfully`);
            fetchData();
        } catch (error) {
            console.error(`Error ${action}ing shopkeeper:`, error);
            toast.error(error.response?.data?.message || `Failed to ${action} shopkeeper`);
        }
    };

    const columns = [
        { key: 'shopId', label: 'Shop ID' },
        {
            key: 'shopName',
            label: 'Shop Name',
            render: (row) => <span className="font-semibold ">{row.shopName}</span>
        },
        { key: 'location', label: ' Address' },
        {
            key: 'shopkeeperName',
            label: 'Shopkeeper Name',
        },
        {
            key: 'status',
            label: 'Shop Status',
            render: (row) => (
                <span
                    className={`px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider ${row.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}
                >
                    {row.status}
                </span>
            ),
        },
        {
            key: 'actions',
            label: <div className="text-center w-full uppercase text-l font-semibold text-black">Actions</div>,
            render: (row) => (
                <div className="flex justify-center gap-2">
                    <button
                        onClick={() => handleSuspend(row.shopkeeperId, row.status)}
                        className={`text-white px-4 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm active:scale-95
                        ${row.status === "ACTIVE"
                                ? "bg-red-600 hover:bg-red-700 shadow-red-100"
                                : "bg-blue-600 hover:bg-blue-800 shadow-blue-100"
                            }`}
                    >
                        {row.status === "ACTIVE" ? "Suspend " : "Active"}
                    </button>
                </div>
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
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-[#FFFBF0] pb-6">

                <button
                    onClick={() => setShowForm(!showForm)}
                    className={`px-6 py-2.5 rounded-lg font-bold transition-all duration-300 shadow-lg text-sm  flex items-center gap-2 ${showForm
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-blue-700 text-white hover:bg-blue-900'}`}
                >
                    {showForm ? '✕ Cancel Entry' : '＋ Issue New Shop License'}
                </button>
            </div>

            {showForm && (
                <div className="bg-grey-100 rounded-xl border-2  p-8 mb-8 shadow-sm">
                    <h4 className="text-xl font-bold text-[#003D82] mb-6 uppercase tracking-tight">Add Ration Shop</h4>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                                    Shop Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.shopName}
                                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-black focus:outline-none transition-all"
                                    placeholder="e.g. Kendriya Bhandar Unit 45"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                                    Geographic Address
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-black  focus:outline-none transition-all"
                                    placeholder="e.g. Central Delhi West"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                                    Assign Shopkeeper
                                </label>
                                <select
                                    required
                                    value={formData.shopkeeperId}
                                    onChange={(e) => setFormData({ ...formData, shopkeeperId: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-black  focus:outline-none transition-all bg-white"
                                >
                                    <option value="">-- Choose Verified Shopkeeper --</option>
                                    {shopkeepers.map((sk) => (
                                        <option key={sk.userId} value={sk.userId}>
                                            {sk.name}({sk.email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-[#003D82] text-white px-10 py-3 rounded-lg font-bold text-base hover:bg-[#002A5C] transition-all shadow-xl active:scale-95 "
                            >
                                Add Shop
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <DataTable
                    columns={columns}
                    data={shops}
                    searchable
                    searchPlaceholder="Search registry by name or location..."
                />
            </div>
        </div>
    );
};

export default ManageShops;
