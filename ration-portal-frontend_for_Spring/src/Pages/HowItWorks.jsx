import React from 'react';
import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
    const steps = [
        {
            number: 1,
            title: "Registration",
            description: "Get Your Account",
            details: "Register on the portal with your email. Your assigned shopkeeper will verify and add you."
        },
        {
            number: 2,
            title: "Allocation",
            description: "Stock Is Allocated",
            details: "Admin allocates monthly stock to shops based on entitlements."
        },
        {
            number: 3,
            title: "Visit Shop",
            description: "Visit Assigned Shop",
            details: "Go to your assigned ration shop during distribution hours with your card details."
        },
        {
            number: 4,
            title: "Verification",
            description: "OTP Confirmation",
            details: "Shopkeeper generates an OTP sent to your email. Provide it to verify the transaction."
        },
        {
            number: 5,
            title: "Collection",
            description: "Receive Your Ration",
            details: "After OTP verification, collect your ration. Transaction is recorded instantly."
        }
    ];

    return (
        <div className="bg-[#FFFBF0] min-h-screen">
            <Navbar />


            <section className="bg-gradient-to-br from-[#003D82] to-[#002A5C] text-white py-8 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Process Workflow
                    </h1>
                    <p className="text-sm text-gray-200 uppercase tracking-widest font-semibold font-sans">
                        Transparent • Secure • Digital
                    </p>
                </div>
            </section>


            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto overflow-hidden">
                    <div className=" h-80 grid grid-cols-1 md:grid-cols-5 gap-4">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center relative">


                                <div className="w-16 h-16 bg-gradient-to-br from-[#003D82] to-[#002A5C] rounded-full 
                  flex items-center justify-center shadow-lg border-2 border-[#DAA520] mb-4">
                                    <span className="text-xl font-semibold text-white">
                                        {step.number}
                                    </span>
                                </div>


                                <div className="bg-white h-52 p-5 rounded-lg border border-[#DAA520] shadow-sm text-center max-w-[220px]">

                                    <div className="text-3xl mb-3">
                                        {step.emoji}
                                    </div>

                                    <h3 className="text-base font-semibold text-[#003D82] mb-2">
                                        {step.title}
                                    </h3>

                                    <p className="text-xs text-[#FF6B35] font-semibold mb-2 tracking-wide uppercase">
                                        {step.description}
                                    </p>

                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {step.details}
                                    </p>
                                </div>


                                {/* {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10">
                                        decorative connector
                                    </div>
                                )} */}
                            </div>

                        ))}
                    </div>
                </div>
            </section>


            <section className="py-10 px-4 bg-white border-y border-gray-100">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[#003D82] mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Role Privileges
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div className="bg-[#FFFBF0] p-5 rounded-lg border border-[#003D82] shadow-sm">

                            <h3 className="text-lg font-bold text-[#003D82] mb-3 border-b border-[#003D82]/20 pb-1">Administrator</h3>
                            <ul className="space-y-1.5 text-l text-gray-700">
                                <li>• Approve Shop Registrations</li>
                                <li>• Manage Official Shops</li>
                                <li>• Allocate Monthly Stock</li>
                                <li>• Define Entitlements</li>
                                <li>• Audit Distribution Logs</li>
                            </ul>
                        </div>


                        <div className="bg-[#FFFBF0] p-5 rounded-lg border border-[#FF6B35] shadow-sm">

                            <h3 className="text-lg font-bold text-[#FF6B35] mb-3 border-b border-[#FF6B35]/20 pb-1">Shopkeeper</h3>
                            <ul className="space-y-1.5 text-l text-gray-700">
                                <li>• Manage Citizen Database</li>
                                <li>• Inventory Monitoring</li>
                                <li>• OTP Verification</li>
                                <li>• Secure Ration Delivery</li>
                                <li>• View Transaction History</li>
                            </ul>
                        </div>


                        <div className="bg-[#FFFBF0] p-5 rounded-lg border border-[#DAA520] shadow-sm">

                            <h3 className="text-lg font-bold text-[#DAA520] mb-3 border-b border-[#DAA520]/20 pb-1">Citizen</h3>
                            <ul className="space-y-1.5 text-l text-gray-700">
                                <li>• Digital Card Viewing</li>
                                <li>• Track Personal History</li>
                                <li>• Secure OTP Receipt</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            <footer className="bg-[#1A1A2E] text-white py-8 px-6 text-center">
                <p className="text-[12px] text-gray-400">&copy; 2026 RationSahayata Portal | Public Distribution Regulatory Authority</p>
                <div className="mt-2 space-x-4">
                    <Link to="/register" className="text-[12px] text-[#FF6B35] font-bold hover:underline">Register</Link>
                    <Link to="/login" className="text-[12px] text-white font-bold hover:underline">Login</Link>
                    <Link to="/" className="text-[12px] text-gray-300 font-bold hover:underline">Home</Link>
                </div>
            </footer>
        </div>
    );
};

export default HowItWorks;
