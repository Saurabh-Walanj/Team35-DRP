import { useEffect, useState } from 'react';
import { adminAPI } from '../../api';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        pendingShopkeepers: 0,
        activeShops: 0,
        totalFamilies: 0,
        totalAllocations: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [shopkeepers, shops, families, allocations] = await Promise.all([
                adminAPI.getPendingShopkeepers(),
                adminAPI.getAllShops(),
                adminAPI.getAllFamilies(),
                adminAPI.getAllAllocations(),
            ]);

            setStats({
                pendingShopkeepers: shopkeepers.length || 0,
                activeShops: shops.length || 0,
                totalFamilies: families.length || 0,
                totalAllocations: allocations.length || 0,
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Pending Approvals',
            value: stats.pendingShopkeepers,
            color: 'bg-orange-50 border-orange-200 text-orange-700',
            link: '/admin/pending-shopkeepers',
        },
        {
            title: 'Active Stores',
            value: stats.activeShops,
            color: 'bg-blue-50 border-blue-200 text-blue-700',
            link: '/admin/manage-shops',
        },
        {
            title: 'Registered Families',
            value: stats.totalFamilies,
            color: 'bg-green-50 border-green-200 text-green-700',
            link: '/admin/view-families',
        },
        {
            title: 'Stock Distributions',
            value: stats.totalAllocations,
            color: 'bg-purple-50 border-purple-200 text-purple-700',
            link: '/admin/allocate-stock',
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003D82]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 duration-700">

            <div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((card, index) => (
                        <div
                            key={index}
                            className={`bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 cursor-pointer}`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase mb-1">{card.title}</p>
                                    <p className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform">{card.value}</p>
                                </div>
                                <div className="text-4xl opacity-80 group-hover:opacity-100 transition-opacity">
                                    {card.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h4 className="text-xl font-bold text-[#003D82]">Admin Controls</h4>

                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ActionCard
                            href="/admin/pending-shopkeepers"
                            label="Approve Shopkeeper"
                            desc="Review and approve new shopkeepers"
                            color="hover:bg-yellow-50"
                        />
                        <ActionCard
                            href="/admin/manage-shops"
                            label="Store Registry"
                            desc="Create and update Ration shop records"
                            color="hover:bg-yellow-50"
                        />
                        <ActionCard
                            href="/admin/allocate-stock"
                            label="Stock Allocation"
                            desc="Allocate monthly stock to active shops"
                            color="hover:bg-yellow-50"
                        />
                        <ActionCard
                            href="/admin/monthly-entitlement"
                            label="Entitlements"
                            desc="Set per-family grain entitlements"
                            color="hover:bg-yellow-50"
                        />
                    </div>
                </div>


                <div className=" bg-gray-700 text-white rounded-xl shadow-xl p-10 ">
                    <h4 className="text-2xl font-semibold mb-6 text ">System Information</h4>
                    <div className="space-y-4">
                        <div className="mt-2 pt-6 border-t border-gray-700">
                            <div className="space-y-3">
                                <div className="flex mt-8 justify-between items-center text-sm">
                                    <span className="text-gray-400">Total Families </span>
                                    <span className="font-bold">{stats.totalFamilies}</span>
                                </div>
                                <div className="flex mt-8 justify-between items-center text-sm">
                                    <span className="text-gray-400">Ration Shops</span>
                                    <span className="font-bold">{stats.activeShops}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400">Waitlist Count</span>
                                    <span className="font-bold">{stats.pendingShopkeepers}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ActionCard = ({ href, label, desc, icon, color }) => (
    <a
        href={href}
        className={`flex items-start gap-4 p-5 border-2 border-gray-50 rounded-xl transition-all duration-300 ${color} group shadow-sm`}
    >
        <div className="text-2xl mt-1">{icon}</div>
        <div>
            <span className="block font-bold text-gray-800 text-base">{label}</span>
            <span className="block text-xs text-gray-500 mt-1 font-medium">{desc}</span>
        </div>
    </a>
);

const SystemInfoRow = ({ label, value }) => (
    <div className="flex flex-col py-1">
        <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">{label}</span>
        <span className="text-sm font-semibold tracking-wide">{value}</span>
    </div>
);

export default AdminDashboard;
