import React from 'react';
import { IconHeart, IconTargetArrow, IconCreditCard, IconCash, IconArrowsSplit, IconSchool, IconUsersGroup } from '@tabler/icons-react';

// Define the theme colors
const PRIMARY_BLUE = '#032B53'; // Deep Blue
const LIGHT_GREY = '#EAEAEA'; // Background Grey
const ACCENT_GREEN = '#4CAF50'; // Standard color for positive action/money

// --- Placeholder Data ---
// This data should ideally come from a separate data file (e.g., 'donate.data.ts')
const donationData = {
    header: {
        title: "Invest in West Nile's Future",
        subtitle: "Every contribution, big or small, directly powers scholarships and infrastructure for brilliant students.",
    },
    impactTiers: [
        { 
            amount: "UGX 100,000", 
            description: "Covers a student's essential textbooks for one full semester.",
            icon: IconSchool 
        },
        { 
            amount: "UGX 500,000", 
            description: "Funds a student's accommodation for two months at university.",
            icon: IconUsersGroup // Assuming this is available
        },
        { 
            amount: "UGX 2,000,000", 
            description: "Provides a full year of living expenses for one medical student.",
            icon: IconTargetArrow 
        },
        { 
            amount: "Any Amount", 
            description: "Flexible contribution towards our general scholarship and mentorship fund.",
            icon: IconHeart 
        },
    ],
    bankDetails: {
        bankName: "Stanbic Bank Uganda",
        accountName: "West Nile Educational Trust Fund",
        accountNumber: "9030011502476",
        currency: "UGX",
    },
    mobileMoney: {
        network: "MTN Mobile Money / Airtel Money",
        phoneNumber: "+256 782 123 456", // Use a real, designated number here
        reference: "WNETF Donation",
    }
};

const DonatePage: React.FC = () => {
    return (
        <div className="bg-white">
            
            {/* Header / Impact Statement */}
            <section className="py-20 px-4 md:px-8 text-center" style={{ backgroundColor: LIGHT_GREY }}>
                <div className="max-w-4xl mx-auto">
                    <IconHeart size={70} className="mx-auto mb-4" style={{ color: PRIMARY_BLUE }} />
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4" style={{ color: PRIMARY_BLUE }}>
                        {donationData.header.title}
                    </h1>
                    <p className="text-xl text-gray-700 font-medium max-w-3xl mx-auto">
                        {donationData.header.subtitle}
                    </p>
                </div>
            </section>

            {/* Impact Tiers / Suggested Amounts */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12" style={{ color: PRIMARY_BLUE }}>
                    How Your Generosity Translates to Impact
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {donationData.impactTiers.map((tier, index) => {
                        const TierIcon = tier.icon;
                        return (
                            <div 
                                key={index} 
                                className="p-6 rounded-xl shadow-lg border-t-4 text-center hover:shadow-2xl transition duration-300" 
                                style={{ borderColor: PRIMARY_BLUE, backgroundColor: LIGHT_GREY }}
                            >
                                <TierIcon size={40} className="mx-auto mb-4" style={{ color: PRIMARY_BLUE }} />
                                <h3 className="text-3xl font-extrabold mb-2" style={{ color: ACCENT_GREEN }}>
                                    {tier.amount}
                                </h3>
                                <p className="text-md text-gray-700 font-medium">
                                    {tier.description}
                                </p>
                                <a 
                                    href="/contribute" // Link to a donation form or payment gateway
                                    className="block mt-4 text-sm font-semibold hover:underline"
                                    style={{ color: PRIMARY_BLUE }}
                                >
                                    Donate this amount &rarr;
                                </a>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Donation Methods (Bank/Mobile Money) */}
            <section className="py-16 px-4 md:px-8" style={{ backgroundColor: PRIMARY_BLUE }}>
                <div className="max-w-6xl mx-auto text-white">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Choose Your Method of Contribution
                    </h2>

                    <div className="grid md:grid-cols-2 gap-10">
                        
                        {/* 1. Bank Transfer */}
                        <div className="bg-white/10 p-8 rounded-xl shadow-xl">
                            <IconCreditCard size={50} className="mb-4" style={{ color: ACCENT_GREEN }} />
                            <h3 className="text-2xl font-bold mb-4">
                                Direct Bank Transfer
                            </h3>
                            <div className="space-y-3 text-lg">
                                <p><strong>Bank:</strong> {donationData.bankDetails.bankName}</p>
                                <p><strong>Account Name:</strong> {donationData.bankDetails.accountName}</p>
                                <p><strong>Account No:</strong> <span className="font-mono text-xl" style={{ color: ACCENT_GREEN }}>{donationData.bankDetails.accountNumber}</span></p>
                                <p><strong>Currency:</strong> {donationData.bankDetails.currency}</p>
                            </div>
                            <p className="mt-6 text-sm text-gray-300">
                                Please email us a proof of transfer so we can acknowledge your gift.
                            </p>
                        </div>

                        {/* 2. Mobile Money */}
                        <div className="bg-white/10 p-8 rounded-xl shadow-xl">
                            <IconCash size={50} className="mb-4" style={{ color: ACCENT_GREEN }} />
                            <h3 className="text-2xl font-bold mb-4">
                                Mobile Money (Uganda)
                            </h3>
                            <div className="space-y-3 text-lg">
                                <p><strong>Network:</strong> {donationData.mobileMoney.network}</p>
                                <p><strong>Phone Number:</strong> <span className="font-mono text-xl" style={{ color: ACCENT_GREEN }}>{donationData.mobileMoney.phoneNumber}</span></p>
                                <p><strong>Reference:</strong> {donationData.mobileMoney.reference}</p>
                            </div>
                            <p className="mt-6 text-sm text-gray-300">
                                Ensure you use the exact reference code to track the donation to WNETF.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA / Contact */}
            <section className="py-12 px-4 md:px-8 text-center bg-white">
                <div className="max-w-4xl mx-auto">
                    <IconArrowsSplit size={40} className="mx-auto mb-4" style={{ color: PRIMARY_BLUE }} />
                    <h2 className="text-2xl font-bold mb-4" style={{ color: PRIMARY_BLUE }}>
                        Need Assistance or Want to Partner?
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                        For large gifts, corporate matching, or assistance with international transfers, please contact our finance team directly.
                    </p>
                    <a
                        href="/contact-us"
                        className="px-8 py-3 text-lg font-semibold text-white rounded-full transition duration-300 shadow-lg"
                        style={{ backgroundColor: ACCENT_GREEN }}
                    >
                        Contact Finance Team
                    </a>
                </div>
            </section>
        </div>
    );
};

export default DonatePage;