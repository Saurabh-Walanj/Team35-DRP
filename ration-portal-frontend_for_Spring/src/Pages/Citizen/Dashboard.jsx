import { citizenAPI, adminAPI, shopkeeperAPI } from '../../api';
import { toast } from 'react-toastify';
import { getUserEmail } from '../../utils/authUtils';
import FeedbackModal from '../../Components/FeedbackModal';


const CitizenDashboard = () => {
    const [rationCard, setRationCard] = useState(null);
    const [entitlements, setEntitlements] = useState([]);
    const [distributions, setDistributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFeedback, setShowFeedback] = useState(false);
    const [selectedDistribution, setSelectedDistribution] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const email = getUserEmail();
            const card = await citizenAPI.getMyRationCard(email);
            setRationCard(card);

            if (card && card.cardNumber) {
                const [allEntitlements, myDistributions] = await Promise.all([
                    adminAPI.getAllEntitlements(),
                    citizenAPI.getMyDistributions(email)
                ]);
                setEntitlements(allEntitlements || []);
                setDistributions(myDistributions || []);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#003D82]"></div>
            </div>
        );
    }

    if (!rationCard) {
        return (
            <div className="bg-[#FFFBF0] border-2 border-[#DAA520] rounded-2xl p-10 text-center shadow-lg max-w-2xl mx-auto mt-10">
                <span className="text-5xl mb-6 block">🛂</span>
                <h3 className="text-2xl font-bold text-[#003D82] mb-4 uppercase tracking-tight">Registry Search Result: No Data</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                    Your digital profile is not currently linked to any authorized Fair Price Shop.<br />
                    Please visit your local administrative office for inclusion in the National Food Security Database.
                </p>
                <button className="mt-8 bg-[#003D82] text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-[#002A5C] transition-all uppercase tracking-widest text-xs">
                    View Registration Procedures
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">

            <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-10 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
                <div>
                    <h3 className="text-[15px] text-gray-400 font-black  mb-3">Family Primary Profile</h3>
                    <h2 className="text-3xl font-bold mb-2">{rationCard.headOfFamilyName}</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-lg  font-bold text-[#003D82] px-3 py-1 ">Card Number: {rationCard.cardNumber}</span>
                        <span className="text-xs font-bold text-green-600 uppercase tracking-widest flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span> {rationCard.status}
                        </span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="bg-gray-50 px-8 py-4 rounded-2xl border border-gray-100 text-center">
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Family Members Count</p>
                        <p className="text-2xl font-bold text-gray-800">{rationCard.familyMemberCount}</p>
                    </div>
                </div>
            </div>


            <div className="bg-white border rounded-md p-4">
                <h3 className="text-lg font-semibold mb-4">
                    Monthly Entitlement Details
                </h3>

                {entitlements.length === 0 ? (
                    <p className="text-gray-500 text-sm">No entitlements available.</p>
                ) : (
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-3 py-2 text-left">Grain</th>
                                <th className="border border-gray-300 px-3 py-2 text-left">Qty / Person (KG)</th>
                                <th className="border border-gray-300 px-3 py-2 text-left">Family Members</th>
                                <th className="border border-gray-300 px-3 py-2 text-left">Total Quantity (KG)</th>
                                <th className="border border-gray-300 px-3 py-2 text-left">Price / KG</th>
                            </tr>
                        </thead>

                        <tbody>
                            {entitlements.map((ent) => {
                                const qtyPerPerson = ent.quantityPerPerson || 0;
                                const familyCount = rationCard.familyMemberCount || 0;
                                const totalQty = qtyPerPerson * familyCount;

                                return (
                                    <tr key={ent.entitlementId}>
                                        <td className="border border-gray-300 px-3 py-2">
                                            {ent.grainType}
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2">
                                            {qtyPerPerson}
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2">
                                            {familyCount}
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2 font-medium">
                                            {totalQty}
                                        </td>
                                        <td className="border border-gray-300 px-3 py-2">
                                            {ent.pricePerKg ? `₹${ent.pricePerKg}` : 'Subsidized'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>





            <div className="bg-white border rounded-md p-4">
                <h3 className="text-lg font-semibold mb-4">
                    Recent Distributions & Feedback
                </h3>

                {distributions.length === 0 ? (
                    <p className="text-gray-500 text-sm">No distribution history found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {distributions.map((dist) => (
                            <div key={dist.distributionId} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-gray-50">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                        {dist.distributionMonth}
                                    </span>
                                    <span className="text-xs text-gray-500 font-mono">
                                        {new Date(dist.distributionDate).toLocaleDateString()}
                                    </span>
                                </div>

                                <h4 className="font-bold text-[#003D82] mb-1">{dist.shopName}</h4>
                                <p className="text-sm text-gray-600 mb-3">
                                    Recieved: <span className="font-bold text-black">{dist.grain} - {dist.quantityGiven}kg</span>
                                </p>

                                <button
                                    onClick={() => {
                                        setSelectedDistribution(dist);
                                        setShowFeedback(true);
                                    }}
                                    className="w-full py-2 bg-white border-2 border-[#003D82] text-[#003D82] rounded-lg text-xs font-bold hover:bg-[#003D82] hover:text-white transition-all"
                                >
                                    Give Feedback
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {
                showFeedback && selectedDistribution && (
                    <FeedbackModal
                        shopkeeperId={selectedDistribution.shopkeeperId}
                        citizenEmail={rationCard.citizenEmail || getUserEmail()}
                        onClose={() => setShowFeedback(false)}
                        onSubmit={async (data) => {
                            try {
                                await shopkeeperAPI.addFeedback(data);
                                toast.success('Thank you for your feedback!');
                                setShowFeedback(false);
                                // Optionally refresh data but not strictly needed
                            } catch (err) {
                                console.error(err);
                                toast.error('Failed to submit feedback');
                            }
                        }}
                    />
                )
            }

        </div >
    );
};


export default CitizenDashboard;
