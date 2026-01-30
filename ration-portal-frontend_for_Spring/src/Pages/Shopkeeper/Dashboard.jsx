import { useEffect, useState } from 'react';
import { shopkeeperAPI } from '../../api';
import { toast } from 'react-toastify';
import { getUserId } from '../../utils/authUtils';

const ShopkeeperDashboard = () => {
    const [shopInfo, setShopInfo] = useState(null);
    const [stock, setStock] = useState([]);
    const [allocations, setAllocations] = useState([]);
    const [citizens, setCitizens] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const shopkeeperId = getUserId();
            const shop = await shopkeeperAPI.getMyShop(shopkeeperId);
            setShopInfo(shop);

            if (shop && shop.shopId) {
                const [currentStock, allocs, citizensList] = await Promise.all([
                    shopkeeperAPI.viewCurrentStock(shop.shopId),
                    shopkeeperAPI.getMyAllocations(shopkeeperId),
                    shopkeeperAPI.getCitizensUnderShop(shopkeeperId),
                ]);

                setStock(currentStock || []);
                setAllocations(allocs || []);
                setCitizens(citizensList || []);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    // const pendingAllocations = allocations.filter(a => a.status === 'Pending').length;

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#003D82]"></div>
            </div>
        );
    }

    if (!shopInfo) {
        return (
            <div className="bg-white rounded-2xl shadow-xl p-16 text-center border-t-8 border-red-600 max-w-2xl mx-auto mt-10">
                <span className="text-6xl mb-6 block"></span>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-tight">
                    Shop Authorization Pending
                </h2>
                <p className="text-gray-500 font-medium">
                    Your official retail outlet has not been registered in the national database yet.<br />
                    Please contact the District Administrative Office for license issuance.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Store Information Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-[#003D82] px-8 py-4 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-blue-200 ">Authorized Shop Information</h3>
                    <span className="text-[10px] bg-white/10 text-white px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-white/20">Status: Active</span>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <p className="text-sm text-gray-400 font-bold uppercase  mb-1">Shop Name</p>
                        <p className="text-xl font-bold tracking-tight">{shopInfo?.shopName || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 font-bold uppercase  mb-1">Shop Location</p>
                        <p className="text-base font-bold text-gray-700">{shopInfo?.location || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 font-bold uppercase  mb-1">ShopId</p>
                        <p className="text-base font-mono font-bold text-gray-900">{shopInfo?.shopId || 'N/A'}</p>
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    label="Active Citizens"
                    value={citizens.length}
                    color="text-[#003D82]"
                />
                <StatCard
                    label="Grains Available In Inventory"
                    value={stock.length}
                    color="text-green-700"
                />
                <StatCard
                    label="Total Distribution"
                    value={allocations.length}
                    color="text-[#DAA520]"
                />
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-[#003D82] uppercase tracking-tight">Real-time Stock Tracker</h3>
                    </div>

                    {stock.length === 0 ? (
                        <div className="bg-[#FFFBF0] border-2 border-dashed border-[#DAA520]/30 rounded-xl p-10 text-center">
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No Inventory Detected</p>
                            <p className="text-[10px] text-gray-400 mt-1">Please confirm pending allocations to update stock.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-4 sm:grid-cols-2 gap-4">
                            {stock.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-100 group hover:bg-white hover:shadow-md transition-all">
                                    <div className="flex items-center gap-4">

                                        <div>
                                            <p className="text-sm text-gray-400 font-bold uppercase">{item.grain}</p>
                                            <p className="text-lg font-semibold text-gray-800 font-">{item.availableQuantity} KG</p>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Operations Control */}
                {/* <div className="bg-[#1A1A2E] text-white rounded-2xl shadow-xl p-8 flex flex-col justify-between border-t-8 border-[#FF6B35]">
                    <div>
                        <h4 className="text-lg font-bold text-[#FF6B35] mb-6 uppercase tracking-tight">Operations Panel</h4>
                        <div className="space-y-3">
                            {pendingAllocations > 0 && (
                                <ActionLink
                                    href="/shopkeeper/stock-management"
                                    label={`Confirm Receipts (${pendingAllocations})`}
                                    bg="bg-[#FF6B35] hover:bg-[#E55A25]"
                                    icon="📥"
                                />
                            )}
                            <ActionLink
                                href="/shopkeeper/distribute-ration"
                                label="Initiate Distribution"
                                bg="bg-[#003D82] hover:bg-[#002A5C]"
                                icon="🏪"
                            />
                            <ActionLink
                                href="/shopkeeper/manage-citizens"
                                label="View Families"
                                bg="bg-white/10 hover:bg-white/20"
                                icon="📋"
                            />
                            <ActionLink
                                href="/shopkeeper/distribution-history"
                                label="Sales History"
                                bg="bg-white/10 hover:bg-white/20"
                                icon="🕒"
                            />
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/10">
                        <p className="text-[9px] text-gray-400 uppercase font-bold tracking-[0.15em] leading-relaxed">
                            Access restricted to authorized FPS personnel only.
                            All transactions are logged for administrative audit.
                        </p>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

const StatCard = ({ label, value, icon, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 group hover:shadow-md transition-all">
        <div className="text-4xl">{icon}</div>
        <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">{label}</p>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
    </div>
);

const ActionLink = ({ href, label, bg, icon }) => (
    <a
        href={href}
        className={`flex items-center gap-3 px-5 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 uppercase tracking-wider ${bg}`}
    >
        <span>{icon}</span>
        <span>{label}</span>
    </a>
);

export default ShopkeeperDashboard;
