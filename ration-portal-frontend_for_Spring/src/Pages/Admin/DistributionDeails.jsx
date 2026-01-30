import React, { useEffect, useState } from 'react';
import { adminAPI } from '../../api';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

export const DistributionDeails = () => {
    const { id } = useParams(); // distributionId from URL
    const [distribution, setDistribution] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const data = await adminAPI.getAllDistributionLogs();
            const selected = data.find(
                log => log.distributionId === Number(id)
            );

            if (!selected) {
                toast.error("Distribution record not found");
            } else {
                setDistribution(selected);
            }
        } catch (error) {
            console.error('Error fetching distribution logs:', error);
            toast.error('Failed to load distribution details');
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

    if (!distribution) {
        return (
            <div className="text-center mt-20">
                <p className="text-red-600 font-bold uppercase tracking-widest">Unauthorized or Missing Record</p>
                <button onClick={() => navigate(-1)} className="mt-4 text-[#003D82] font-bold hover:underline">Return to Logs</button>
            </div>
        );
    }

    // const safeValue = (value) => (value === null || value === undefined || typeof value === 'object') ? 'N/A' : String(value);

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
                <div className="bg-[#003D82] p-5 text-white relative">
                    <div className="flex justify-between items-start">
                        <div className="flex justify-evenly items-center">
                            <h2 className="text-2xl font-bold mr-9">Distribution Slip</h2>
                            <span className="text-xl font-semibold">Transaction ID: {distribution.distributionId}</span>

                        </div>
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all border border-white/20"
                        >
                            ← Back
                        </button>
                    </div>

                </div>


                <div className="p-10 space-y-8 bg-[#FFFBF0]/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <DetailBlock label="Beneficiary Name" value={distribution.headOfFamily} />
                        <DetailBlock label="Ration Card Number" value={distribution.cardNumber} />
                        <DetailBlock label="Issuing Authority (FPS)" value={distribution.shopName} />
                        <DetailBlock label="Commodity Allocated" value={distribution.grain} />
                        <DetailBlock label="Net Weight Delivered" value={`${distribution.quantityGiven || 0} KG`} />
                        <DetailBlock label="Distribution Period" value={distribution.distributionMonth} />
                    </div>

                    <div className="pt-5 border-t border-dashed border-gray-200">
                        <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Transaction Timestamp</p>
                                <p className="text-sm font-bold text-gray-800">
                                    {distribution.distributionDate ? new Date(distribution.distributionDate).toLocaleString() : 'N/A'}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Final Status</p>
                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${(distribution.status === 'SUCCESS') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {distribution.status || 'Verified'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailBlock = ({ label, value }) => {
    const renderValue = (val) => {
        if (val && typeof val === 'object') {
            // Handle if it's the RationCard object or similar nested entity
            return val.cardNumber || val.headOfFamilyName || val.name || JSON.stringify(val);
        }
        return val || 'N/A';
    };

    return (
        <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
            <p className="text-lg font-bold text-[#1A1A2E]">{renderValue(value)}</p>
        </div>
    );
};

export default DistributionDeails;
