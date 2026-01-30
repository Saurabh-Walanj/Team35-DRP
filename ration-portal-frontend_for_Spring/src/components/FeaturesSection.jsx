import React from 'react'

export const FeaturesSection = () => {
    const features = [
        {

            title: "Real-Time Distribution Tracking",
            description: "Monitor ration distribution in real-time with complete transparency and accountability"
        },
        {

            title: "Transparent Stock Management",
            description: "View stock allocations, distributions, and inventory levels across all shops"
        },
        {

            title: "Secure Citizen Verification",
            description: "Robust verification system ensuring only eligible citizens receive benefits"
        },
        {

            title: "OTP-Based Authentication",
            description: "Secure OTP verification for every ration distribution transaction"
        }
    ];

    return (
        <section className="py-20 px-8 bg-white">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-[#003D82] mb-4" style={{ fontFamily: " sans-serif" }}>
                    Key Features
                </h2>
                <p className="text-center text-gray-600 mb-12 text-lg">
                    Empowering transparent and efficient food distribution
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-[#FFFBF0] p-6 rounded-lg border-2 border-[#DAA520] hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="text-5xl mb-4">{feature.emoji}</div>
                            <h3 className="text-xl font-bold text-[#003D82] mb-3">{feature.title}</h3>
                            <p className="text-gray-700">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
