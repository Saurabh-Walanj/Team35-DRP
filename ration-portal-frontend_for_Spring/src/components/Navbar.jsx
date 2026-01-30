import { NavLink } from "react-router-dom";

export const Navbar = () => {
    const linkClass = ({ isActive }) =>
        isActive
            ? "text-[#FF6B35] font-semibold border-b-2 border-[#FF6B35]"
            : "text-[#1A1A2E] hover:text-[#FF6B35] transition-colors duration-300";

    return (
        <>
            <nav className="bg-[#FFFBF0] border-b-2 border-[#DAA520] px-8 py-2 flex justify-between items-center shadow-md">

                <div className="flex items-center space-x-3">
                    <h1 className="text-xl font-bold text-[#003D82] tracking-wide" style={{ fontFamily: " sans-serif" }}>
                        RationSahayata
                    </h1>
                </div>

                <div className="flex items-center space-x-6 text-l font-medium">
                    <NavLink to="/" className={linkClass}>Home</NavLink>
                    <NavLink to="/about" className={linkClass}>About</NavLink>
                    <NavLink to="/how-it-works" className={linkClass}>How It Works</NavLink>
                    <NavLink to="/contact" className={linkClass}>Contact</NavLink>
                    <NavLink
                        to="/login"
                        className="ml-4 px-6 py-2 rounded-md bg-[#003D82] text-white hover:bg-[#002A5C] transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/register"
                        className="px-6 py-2 rounded-md border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white transition-all duration-300"
                    >
                        Register
                    </NavLink>
                </div>
            </nav>

            {/* Important Notice Banner */}
            <div className="bg-[#FF6B35] text-white py-2 text-sm font-medium border-b border-[#DAA520]">
                <marquee>
                    🔔 Important Notice: All users must register on Ration Portal before 03/01/2026. | Ministry of Food & Public Distribution
                </marquee>
            </div>
        </>
    );
};
