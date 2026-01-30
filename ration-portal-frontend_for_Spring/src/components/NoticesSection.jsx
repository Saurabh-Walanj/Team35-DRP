export const NoticesSection = () => {
    const notices = [
        {
            type: "urgent",
            title: "Stock Update - January 2026",
            description: "New stock allocation for all registered shops. Check your dashboard for details.",
            date: "29 Jan 2026"
        },
        {
            type: "info",
            title: "Maintenance Window",
            description: "System maintenance scheduled for Sunday, 2:00 AM - 4:00 AM",
            date: "28 Jan 2026"
        },
        {
            type: "success",
            title: "New Shops Opening",
            description: "50+ new ration shops opening in your area this month",
            date: "25 Jan 2026"
        },
        {
            type: "warning",
            title: "Document Verification Deadline",
            description: "Complete your document verification before 3rd February 2026",
            date: "20 Jan 2026"
        }
    ];

    const getNoticeStyle = (type) => {
        switch (type) {
            case 'urgent': return 'bg-red-50 border-red-500 text-red-800';
            case 'warning': return 'bg-yellow-50 border-yellow-500 text-yellow-800';
            case 'info': return 'bg-blue-50 border-blue-500 text-blue-800';
            case 'success': return 'bg-green-50 border-green-500 text-green-800';
            default: return 'bg-gray-50 border-gray-500 text-gray-800';
        }
    };

    return (
        <section className="py-20 px-8 bg-[#FFFBF0]">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-[#003D82] mb-4" style={{ fontFamily: "sans-serif" }}>
                    Notices & Announcements
                </h2>
                <p className="text-center text-gray-600 mb-12 text-lg">
                    Stay updated with important information
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {notices.map((notice, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-lg border-l-4 ${getNoticeStyle(notice.type)} shadow-md hover:shadow-lg transition-all duration-300`}
                        >
                            <div className="flex items-start space-x-4">
                                <div className="text-3xl mt-1">{notice.emoji}</div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold mb-2">{notice.title}</h3>
                                    <p className="text-sm mb-3">{notice.description}</p>
                                    <span className="text-xs font-semibold">{notice.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};