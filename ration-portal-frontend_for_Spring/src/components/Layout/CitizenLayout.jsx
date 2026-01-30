import { Link, useLocation, Outlet } from 'react-router-dom';
import { authAPI } from '../../api';

const CitizenLayout = () => {
    const location = useLocation();
    const userName = localStorage.getItem('userName') || 'Citizen';

    const isActive = (path) => location.pathname === path;

    const menuItems = [
        // { path: '/citizen/dashboard', label: 'Citizen Panel' },
        { path: '/citizen/ration-card', label: 'Digital Ration Card' },
        { path: '/citizen/distribution-history', label: 'My Ration History' },
    ];

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="text-center w-72 bg-[#1A1A2E] text-white flex flex-col min-h-screen shadow-2xl">
                <div className="p-5 border-b border-gray-700 bg-blue-900">
                    <h1 className="text-xl font-semibold">RATION SAHAYATA</h1>
                    <p className=" text-[13px] text-gray-200 mt-1 uppercase  font-bold">Citizen</p>
                </div>

                <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-md  group ${isActive(item.path)
                                ? 'bg-blue-900 text-white shadow-lg'
                                : 'text-gray-300 hover:bg-blue-700 hover:text-white'
                                }`}
                        >
                            <span className={`text-sm font-bold ${isActive(item.path) ? 'tracking-wide' : ''}`}>
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-gray-700 bg-[#002A5C]">
                    <button
                        onClick={authAPI.logout}
                        className="w-full bg-blue-900 text-xs text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all duration-300 border border-gray-600 uppercase tracking-widest"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white border-b-1 px-8 py-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-bold text-[#003D82] tracking-tight">
                                {menuItems.find(item => isActive(item.path))?.label || 'Account Overview'}
                            </h2>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col text-right">
                                <span className="text-sm font-bold text-gray-800">Welcome {userName}</span>
                            </div>

                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8 lg:p-12">
                    <div className="max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-700">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CitizenLayout;
