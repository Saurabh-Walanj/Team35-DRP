import React from "react";
import { Navbar } from "./Navbar";

export default function Contact() {
    return (
        <div className="min-h-screen bg-[#FFFBF0]">
            <Navbar />

            {/* Header */}
            <div className="bg-gradient-to-br from-[#003D82] to-[#1A1A2E] text-white py-8">
                <h1 className="text-4xl font-bold text-center" style={{ fontFamily: "sans-serif" }}>
                    Contact Support
                </h1>
                <p className="text-center mt-2 text-gray-200">
                    Dedicated Assistance for Your Food Security Needs
                </p>
            </div>

            <div className="max-w-5xl mx-auto p-8">
                <div className="bg-white rounded-lg shadow-xl p-10 grid md:grid-cols-2 gap-12 border-t-4 border-[#003D82]">

                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-[#003D82]" style={{ fontFamily: "sans-serif" }}>
                            Communication
                        </h2>
                        <p className="text-gray-700 mb-8 leading-relaxed">
                            For any inquiries regarding ration distribution, card generation, or technical assistance,
                            our official support channels are ready to assist you.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <span className="text-2xl mr-4"></span>
                                <div>
                                    <p className="text-sm font-bold text-[#FF6B35] uppercase tracking-wider">Email Support</p>
                                    <p className="text-gray-900 font-medium">support@rationportal.gov.in</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <span className="text-2xl mr-4"></span>
                                <div>
                                    <p className="text-sm font-bold text-[#FF6B35] uppercase tracking-wider">Toll-Free Helpline</p>
                                    <p className="text-gray-900 font-medium">1800-245-6789 (9 AM – 6 PM)</p>
                                    <p className="text-gray-900 font-medium">1800-124-0124 (9 AM – 4 PM)</p>
                                    <p className="text-gray-900 font-medium">1800-478-7894 (9 AM – 4 PM)</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <span className="text-2xl mr-4"></span>
                                <div>
                                    <p className="text-sm font-bold text-[#FF6B35] uppercase tracking-wider">Official Location</p>
                                    <p className="text-gray-900 font-medium leading-tight">Civil Supplies Department, HQ Building, New Mumbai</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <span className="text-2xl mr-4"></span>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <p className="text-xs text-gray-500 font-medium leading-relaxed italic">
                                Note: Please mention your Ration Card Number or Registered Email for faster issue resolution.
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-xl border-2 border-black">
                        <h2 className="text-2xl font-bold mb-6 text-[#003D82]">
                            Official Inquiry
                        </h2>
                        <form className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Name"
                                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FF6B35] transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Email</label>
                                <input
                                    type="email"
                                    placeholder="yourname@official.com"
                                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FF6B35] transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Message Description</label>
                                <textarea
                                    placeholder="Describe your query in detail..."
                                    rows="4"
                                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FF6B35] transition-all"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#003D82] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#002A5C] transition-all shadow-md hover:shadow-xl active:scale-95"
                            >
                                SUBMIT INQUIRY
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="bg-[#1A1A2E] text-white py-6 mt-10 text-center text-sm border-t-2 border-[#DAA520]">
                <p>&copy; 2026 Digital Ration Portal | Public Grievance Cell</p>
            </div>
        </div>
    );
}