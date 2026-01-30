import React from "react";
import { Navbar } from "./Navbar";

export default function About() {
    return (
        <div className="min-h-screen bg-[#FFFBF0]">
            <Navbar />

            <div className="bg-gradient-to-br from-[#003D82] to-[#1A1A2E] text-white py-4">
                <h1 className="text-4xl font-bold text-center" style={{ fontFamily: " sans-serif" }}>
                    About Ration Portal
                </h1>
                <p className="text-center mt-2 text-gray-200">
                    Transparent • Secure • Digital Ration Distribution
                </p>
            </div>

            <div className="max-w-5xl mx-auto p-8">
                <div className="bg-white rounded-lg shadow-xl p-10 border-t-4 border-[#003D82]">
                    <h2 className="text-3xl font-bold mb-6 text-[#003D82]" style={{ fontFamily: "sans-serif" }}>
                        Our Mission
                    </h2>
                    <p className="text-gray-700 mb-8 leading-relaxed text-lg" style={{ fontFamily: "sans-serif" }}>
                        The Digital Ration Distribution Portal is a dedicated platform designed to bring absolute transparency,
                        efficiency, and accountability to the Public Distribution System (PDS). Guided by our commitment
                        to food security, we ensure that every eligible citizen receives their rightful entitlements
                        without administrative delays or leakage.
                    </p>

                    <div className="grid md:grid-cols-2 gap-10" style={{ fontFamily: "sans-serif" }}>
                        <div>
                            <h2 className="text-2xl font-bold mb-5 text-[#FF6B35]">
                                Platform Features
                            </h2>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-[#DAA520] mr-2">✦</span>
                                    <span>Role-based access for Admin, Shopkeeper, and Citizen</span>
                                </li>

                                <li className="flex items-start">
                                    <span className="text-[#DAA520] mr-2">✦</span>
                                    <span>Secure login And Registration</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#DAA520] mr-2">✦</span>
                                    <span>Transperent stock allocation & live tracking</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#DAA520] mr-2">✦</span>
                                    <span>Verified distribution through OTP authentication</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-5 text-[#FF6B35]">
                                Digital Transformation
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                By digitizing the traditional ration process, we minimize manual errors and eliminate corruption.
                                Our system allows for real-time monitoring of distribution metrics, empowering both
                                government officials and public beneficiaries.
                            </p>

                        </div>
                    </div>
                </div>
            </div>

            {/* Simple Footer Copy */}
            <div className="bg-[#1A1A2E] text-white py-6 mt-10 text-center text-sm border-t-2 border-[#DAA520]">
                <p>&copy; 2026 Digital Ration Portal | Ministry of Food & Public Distribution</p>
            </div>
        </div>
    );
}