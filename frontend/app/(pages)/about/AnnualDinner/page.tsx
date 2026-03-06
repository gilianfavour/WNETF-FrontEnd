import React from 'react';
import Image from 'next/image';
import { IconCalendarEvent, IconTicket, IconTrendingUp, IconUsers } from '@tabler/icons-react';
import heroNight from '~/assets/images/night-event.jpg'; // Placeholder for an actual event photo

// Define the theme colors
const PRIMARY_BLUE = '#032B53';
const LIGHT_GREY = '#EAEAEA';
const ACCENT_GOLD = '#FFD744'; // Using Gold for a festive/fundraising accent

// Placeholder data for the event
const eventDetails = {
    title: "Annual Dinner: The Annual Fundraising Dinner",
    date: "Saturday, November 25, 2025",
    time: "6:00 PM - Late",
    location: "Kampala Serena Hotel, Kampala, Uganda",
    pastFundsRaised: "UGX 60 Million",
    studentsSupported: "5 New Scholarships Awarded",
    ticketPrice: "UGX 100,000",
};

const AnnualDinner: React.FC = () => {
    return (
        <div className="bg-white">
            
            {/* Page Header / Hero Section (Focus on Event Vibe) */}
            <section className="relative w-full h-[60vh] overflow-hidden">
                <Image
                    src={heroNight}
                    alt="Annual Dinner Event"
                    fill
                    priority
                    className="object-cover brightness-[0.55]"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white z-10" style={{ backgroundColor: 'rgba(3, 43, 83, 0.5)' /* Dark overlay using PRIMARY_BLUE */ }}>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">
                        {eventDetails.title}
                    </h1>
                    <p className="text-xl md:text-2xl font-semibold mb-6">
                        An evening dedicated to transforming education in the West Nile Region.
                    </p>
                    <a
                        href="/tickets" 
                        className="px-10 py-4 text-xl font-bold rounded-full transition duration-300 shadow-xl hover:opacity-90"
                        style={{ backgroundColor: ACCENT_GOLD, color: PRIMARY_BLUE }}
                    >
                        Get Your Tickets Now!
                    </a>
                </div>
            </section>

            {/* Event Details Section */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12" style={{ color: PRIMARY_BLUE }}>
                    Upcoming Event
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: LIGHT_GREY }}>
                        <IconCalendarEvent size={40} className="mx-auto mb-3" style={{ color: PRIMARY_BLUE }} />
                        <h3 className="text-xl font-semibold mb-1" style={{ color: PRIMARY_BLUE }}>Date & Time</h3>
                        <p className="text-lg text-gray-700">{eventDetails.date}</p>
                        <p className="text-md text-gray-600">{eventDetails.time}</p>
                    </div>
                    
                    <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: LIGHT_GREY }}>
                        <IconTicket size={40} className="mx-auto mb-3" style={{ color: PRIMARY_BLUE }} />
                        <h3 className="text-xl font-semibold mb-1" style={{ color: PRIMARY_BLUE }}>Tickets</h3>
                        <p className="text-lg text-gray-700">{eventDetails.ticketPrice} Per Person</p>
                        <p className="text-md text-gray-600">Available online and at the door.</p>
                    </div>

                    <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: LIGHT_GREY }}>
                        <IconUsers size={40} className="mx-auto mb-3" style={{ color: PRIMARY_BLUE }} />
                        <h3 className="text-xl font-semibold mb-1" style={{ color: PRIMARY_BLUE }}>Location</h3>
                        <p className="text-lg text-gray-700">{eventDetails.location}</p>
                        <p className="text-md text-gray-600">Secure your spot early!</p>
                    </div>
                </div>
            </section>
            
            <hr className="my-8" />

            {/* Impact Highlight: What Annual Dinner Achieves */}
            <section className="py-16 px-4 md:px-8" style={{ backgroundColor: PRIMARY_BLUE }}>
                <div className="max-w-7xl mx-auto text-center text-white">
                    <IconTrendingUp size={40} className="mx-auto mb-4" style={{ color: ACCENT_GOLD }} />
                    <h2 className="text-3xl font-bold mb-4">
                        The Impact of Last Year's Event
                    </h2>
                    <p className="text-lg max-w-3xl mx-auto mb-8 text-gray-200">
                        The "Annual Dinner" is our flagship annual fundraiser. The proceeds go directly into the WNETF scholarship fund and infrastructure projects.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-6 rounded-lg border-2 border-white/50">
                            <p className="text-5xl font-extrabold mb-1" style={{ color: ACCENT_GOLD }}>{eventDetails.pastFundsRaised}</p>
                            <h3 className="text-xl font-semibold text-white">Raised at Last Year's Dinner</h3>
                        </div>
                        <div className="p-6 rounded-lg border-2 border-white/50">
                            <p className="text-5xl font-extrabold mb-1" style={{ color: ACCENT_GOLD }}>{eventDetails.studentsSupported}</p>
                            <h3 className="text-xl font-semibold text-white">Students Directly Benefited</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA: Sponsorship */}
            <section className="py-16 px-4 md:px-8 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4" style={{ color: PRIMARY_BLUE }}>
                        Sponsor the Annual Dinner
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Organizations and corporations can make a powerful statement by sponsoring our event. Gain visibility while investing directly in West Nile's future.
                    </p>
                    <a
                        href="/contact-us"
                        className="px-8 py-3 text-lg font-semibold text-white rounded-full transition duration-300 shadow-lg"
                        style={{ backgroundColor: PRIMARY_BLUE }}
                    >
                        Discuss Sponsorship Packages
                    </a>
                </div>
            </section>

        </div>
    );
};

export default AnnualDinner;