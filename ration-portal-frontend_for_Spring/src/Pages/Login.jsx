import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../api";
import { setAuthData } from "../utils/authUtils";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                email: email,
                password: password
            };

            const data = await authAPI.login(payload);
            setAuthData(data.token, data.user);

            if (data.user.role === "ADMIN") {
                navigate("/admin/dashboard");
            } else if (data.user.role === "SHOPKEEPER") {
                navigate("/shopkeeper/dashboard");
            } else {
                navigate("/citizen/ration-card");
            }

        } catch (err) {
            console.error('Login Error:', err);
            if (err.response?.status === 403) {
                toast.error('Login failed. Please try again.');
            } else {
                toast.error(err.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFBF0]" style={{ fontFamily: "sans-serif" }}>
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-xl border-t-4 border-[#003D82]">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-semibold text-[#003D82]" style={{ fontFamily: "sans-serif" }}>
                        RationSahayata Portal
                    </h2>

                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-all duration-300"
                            placeholder="Enter your registered email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[#1A1A2E] mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF6B35] focus:outline-none transition-all duration-300 pr-12"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#003D82] font-semibold text-sm transition-colors duration-300"
                            >
                                {showPassword ? "HIDE" : "SHOW"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#003D82] text-white py-3 rounded-lg  text-lg hover:bg-[#002A5C] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 mt-4 active:scale-95"
                    >
                        {loading ? "Processing..." : "Login"}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center space-y-4">
                    <p className="text-sm text-gray-600 font-medium">
                        Dont Have Any Account?{" "}
                        <Link to="/register" className="text-[#FF6B35] font-bold hover:underline ml-1">
                            Register Now
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

export default Login;
