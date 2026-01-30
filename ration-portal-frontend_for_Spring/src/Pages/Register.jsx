import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../api";
import { toast } from "react-toastify";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("CITIZEN");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const nameRegex = /^[A-Za-z ]{3,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

        if (!nameRegex.test(name)) {
            setLoading(false);
            return toast.error("Enter Name with letters and at least 3 characters");
        }

        if (!emailRegex.test(email)) {
            setLoading(false);
            return toast.error("Please enter a valid email address");
        }

        if (!passwordRegex.test(password)) {
            setLoading(false);
            return toast.error(
                "Password must be at least 6 characters and include uppercase, lowercase, number and a special Character"
            );
        }

        try {
            const payload = {
                name: name,
                email: email,
                password: password,
                role: role
            };

            await authAPI.register(payload);
            toast.success("Registration successful! Please login.");
            navigate("/login");

        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFBF0] py-10 px-4">
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-xl border-t-4 border-[#003D82]">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-semibold text-[#003D82]" style={{ fontFamily: "sans-serif" }}>
                        Registration
                    </h2>

                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-all duration-300"
                            placeholder="Register your full name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-all duration-300"
                            placeholder="example@email.gov.in"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">
                            Create Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-all duration-300 pr-12"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#003D82] font-semibold text-xs transition-colors duration-300"
                            >
                                {showPassword ? "HIDE" : "SHOW"}
                            </button>
                        </div>

                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[#1A1A2E] mb-1">
                            Registration Role
                        </label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-all duration-300 bg-white"
                        >
                            <option value="CITIZEN">Citizen</option>
                            <option value="SHOPKEEPER">Shopkeeper</option>
                        </select>
                    </div>

                    {role === "SHOPKEEPER" && (
                        <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg flex items-start space-x-2">
                            <span className="text-orange-600 text-lg">⚠️</span>
                            <p className="text-[11px] text-orange-800 font-medium">
                                IMPORTANT: Shopkeeper registrations are subject to manual verification by Admin. Access will be granted post-approval.
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#FF6B35] text-white py-3 rounded-lg  text-lg hover:bg-[#E55A25] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 mt-2 active:scale-95"
                    >
                        {loading ? "Processing..." : "Register"}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-100 text-center space-y-4">
                    <p className="text-sm text-gray-600 font-medium">
                        Already registered?{" "}
                        <Link to="/login" className="text-[#003D82] font-bold hover:underline ml-1">
                            Sign In
                        </Link>
                    </p>
                    <Link to="/" className="inline-block text-[#003D82] text-sm font-bold hover:text-[#FF6B35] transition-colors duration-300">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
