"use client";

import React, { useState } from 'react'; // Import useState for the custom input
import { IconHeart, IconTargetArrow, IconCreditCard, IconCash, IconArrowsSplit, IconSchool, IconUsersGroup } from '@tabler/icons-react';

// Define the theme colors
const PRIMARY_BLUE = '#032B53'; // Deep Blue
const LIGHT_GREY = '#EAEAEA'; // Background Grey
const ACCENT_GREEN = '#fcbf03'; // Standard color for positive action/money

// --- Placeholder Data ---
const donationData = {
    header: {
        title: "Invest in West Nile's Future",
        subtitle: "Every contribution, big or small, directly powers scholarships and infrastructure for brilliant students.",
    },
    impactTiers: [
        { 
            amount: "100,000", // Use clean numbers here
            label: "Textbooks",
            description: "Covers a student's essential textbooks for one full semester.",
            icon: IconSchool 
        },
        { 
            amount: "500,000", 
            label: "Accommodation",
            description: "Funds a student's accommodation for two months at university.",
            icon: IconUsersGroup
        },
        { 
            amount: "2,000,000", 
            label: "Full Year Support",
            description: "Provides a full year of living expenses for one medical student.",
            icon: IconTargetArrow 
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
        phoneNumber: "+256 782 123 456",
        reference: "WNETF Donation",
    }
};

const DonatePage: React.FC = () => {
    // State to manage the custom donation amount input
    const [customAmount, setCustomAmount] = useState<string>('');

    // Handler to simulate proceeding to payment/form
    const handleDonate = (amount: string) => {
        // In a real application, this would redirect to a payment gateway
        console.log(`Proceeding to donate: ${amount}`);
        alert(`Thank you for choosing to donate ${amount}! Redirecting to payment...`);
        // Example: router.push(`/payment?amount=${amount}`);
    };

    return (
        <div className="bg-white">
            
            {/* Header / Impact Statement */}
            <section className="pt-36 lg:pt-40 pb-20 px-4 md:px-8 text-center" style={{ backgroundColor: LIGHT_GREY }}>
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

            {/* Custom Donation Input & Suggested Tiers */}
            <section className="py-16 px-4 md:px-8 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10" style={{ color: PRIMARY_BLUE }}>
                    1. Choose Your Contribution
                </h2>

                {/* --- Custom Input Field --- */}
                <div className="mb-10 p-6 rounded-xl shadow-2xl" style={{ backgroundColor: LIGHT_GREY }}>
                    <label htmlFor="custom-amount" className="block text-2xl font-semibold mb-3 text-left" style={{ color: PRIMARY_BLUE }}>
                        Enter Custom Amount (UGX)
                    </label>
                    <div className="flex items-center">
                        <span className="text-3xl font-bold mr-2" style={{ color: ACCENT_GREEN }}>UGX</span>
                        <input
                            id="custom-amount"
                            type="number"
                            placeholder="e.g., 85000"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            className="flex-grow p-4 text-3xl font-bold border-2 rounded-lg focus:ring-4"
                            style={{ borderColor: PRIMARY_BLUE, color: PRIMARY_BLUE }}
                        />
                    </div>
                    <button
                        onClick={() => handleDonate(customAmount)}
                        disabled={!customAmount || parseFloat(customAmount) <= 0}
                        className="w-full mt-4 py-4 text-xl font-bold text-white rounded-lg transition duration-300 disabled:opacity-50"
                        style={{ backgroundColor: ACCENT_GREEN }}
                    >
                        Donate UGX {customAmount || '0'} Now
                    </button>
                </div>

                <div className="text-center mb-8">
                    <p className="text-xl font-semibold text-gray-700">Or choose a suggested amount:</p>
                </div>

                {/* --- Suggested Amount Buttons (Inline/Buttons) --- */}
                <div className="flex flex-wrap justify-center gap-4">
                    {donationData.impactTiers.map((tier) => (
                        <button
                            key={tier.amount}
                            onClick={() => handleDonate(tier.amount)}
                            className="px-6 py-3 border-2 font-semibold rounded-full transition duration-300 hover:bg-opacity-90 hover:shadow-md"
                            style={{ borderColor: PRIMARY_BLUE, color: PRIMARY_BLUE, backgroundColor: 'white' }}
                        >
                            UGX {tier.amount} ({tier.label})
                        </button>
                    ))}
                </div>
                
                {/* Visualizing the Impact (Still useful, kept below the buttons) */}
                <div className="grid sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-300">
                    {donationData.impactTiers.map((tier, index) => {
                        const TierIcon = tier.icon;
                        return (
                            <div 
                                key={index} 
                                className="text-center" 
                            >
                                <TierIcon size={30} className="mx-auto mb-2" style={{ color: ACCENT_GREEN }} />
                                <p className="text-lg font-bold" style={{ color: PRIMARY_BLUE }}>
                                    UGX {tier.amount}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {tier.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>
            
            <hr className="my-8" />

            {/* Donation Methods (Bank/Mobile Money) - No Change */}
            <section className="py-16 px-4 md:px-8" style={{ backgroundColor: PRIMARY_BLUE }}>
                <div className="max-w-6xl mx-auto text-white">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        2. Direct Payment Options
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