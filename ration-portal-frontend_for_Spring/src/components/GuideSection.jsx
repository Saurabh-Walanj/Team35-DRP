import { useState } from "react";

export const GuideSection = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            question: "How do I register on the Portal?",
            answer: "Click on 'Register' button  => select 'Citizen' role  => fill in your details  => Submit  ==>  Your shopkeeper will verify and add you to their shop."
        },
        {
            question: "What Details are required?",
            answer: "You need a valid email address, Aadhar card details, and proof of residence. Your shopkeeper may request additional documents during verification."
        },
        {
            question: "How does OTP verification work?",
            answer: "When collecting ration, the shopkeeper generates an OTP sent to your registered email. Provide this OTP to complete the transaction securely."
        },
        {
            question: "Can I change my assigned shop?",
            answer: "Contact your local admin office to request a shop change. You'll need to provide a valid reason and supporting documents."
        }
    ];

    return (
        <section className="py-20 px-8 bg-white">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-[#003D82] mb-4" style={{ fontFamily: "sans-serif" }}>
                    Frequently Asked Questions
                </h2>
                <p className="text-center text-gray-600 mb-12 text-lg">
                    Find answers to common questions
                </p>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border-2 border-[#DAA520] rounded-lg overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                className="w-full px-6 py-4 text-left bg-[#FFFBF0] hover:bg-[#F5F0E0] transition-colors duration-200 flex justify-between items-center"
                            >
                                <span className="font-semibold text-[#003D82]">{faq.question}</span>
                                <span className="text-2xl text-[#FF6B35]">{openFaq === index ? '−' : '+'}</span>
                            </button>
                            {openFaq === index && (
                                <div className="px-6 py-4 bg-white border-t-2 border-[#DAA520]">
                                    <p className="text-gray-700">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};