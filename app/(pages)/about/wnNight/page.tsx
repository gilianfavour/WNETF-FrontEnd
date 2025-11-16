import React from 'react';
import Image from 'next/image';
import { IconCalendar, IconMapPin, IconUsersGroup, IconClock } from '@tabler/icons-react';
// Placeholder image for a casual, fun community gathering
import heroSocial from '~/assets/images/night-socials.jpg'; 

// Define the theme colors
const PRIMARY_BLUE = '#032B53';
const LIGHT_GREY = '#EAEAEA';
const ACCENT_Gold = '#FFD744'; // Using a warm, casual accent color

// Placeholder data for the recurring social event
const socialEventDetails = {
    title: "West Nile Night Social",
    frequency: "Every Last Friday of the Month",
    time: "7:00 PM - Late",
    location: "The Log Cabin, Ntinda, Kampala", // Example of a casual venue
    purpose: "Connect, network, and unwind with the West Nile Community.",
};

const WnNightPage: React.FC = () => {
    return (
        <div className="bg-white">
            
            {/* Page Header / Hero Section (Focus on Community & Fun) */}
            <section className="relative w-full h-[60vh] overflow-hidden">
                <Image
                    src={heroSocial}
                    alt="West Nile Community Social Event"
                    fill
                    priority
                    className="object-cover brightness-[0.65]"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white z-10" style={{ backgroundColor: 'rgba(3, 43, 83, 0.4)' /* Dark overlay using PRIMARY_BLUE */ }}>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">
                        {socialEventDetails.title}
                    </h1>
                    <p className="text-xl md:text-2xl font-semibold mb-6">
                        {socialEventDetails.purpose}
                    </p>
                    <a
                        href="#details" 
                        className="px-8 py-3 text-lg font-bold rounded-full transition duration-300 shadow-xl hover:opacity-90"
                        style={{ backgroundColor: ACCENT_Gold, color: PRIMARY_BLUE  }}
                    >
                        Join the Next Night!
                    </a>
                </div>
            </section>

            {/* Event Schedule & Location Section */}
            <section id="details" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12" style={{ color: PRIMARY_BLUE }}>
                    When and Where to Meet Up
                </h2>
                
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 rounded-lg shadow-lg border-t-4 border-t-primary-blue" style={{ borderColor: PRIMARY_BLUE }}>
                        <IconCalendar size={40} className="mx-auto mb-3" style={{ color: PRIMARY_BLUE }} />
                        <h3 className="text-xl font-semibold mb-1" style={{ color: PRIMARY_BLUE }}>Frequency</h3>
                        <p className="text-lg text-gray-700 font-bold">{socialEventDetails.frequency}</p>
                        <p className="text-md text-gray-600">Always on a Friday.</p>
                    </div>
                    
                    <div className="p-6 rounded-lg shadow-lg border-t-4 border-t-primary-blue" style={{ borderColor: PRIMARY_BLUE }}>
                        <IconMapPin size={40} className="mx-auto mb-3" style={{ color: PRIMARY_BLUE }} />
                        <h3 className="text-xl font-semibold mb-1" style={{ color: PRIMARY_BLUE }}>Location</h3>
                        <p className="text-lg text-gray-700 font-bold">{socialEventDetails.location}</p>
                        <p className="text-md text-gray-600">Check our social media for specific monthly changes.</p>
                    </div>

                    <div className="p-6 rounded-lg shadow-lg border-t-4 border-t-primary-blue" style={{ borderColor: PRIMARY_BLUE }}>
                        <IconClock size={40} className="mx-auto mb-3" style={{ color: PRIMARY_BLUE }} />
                        <h3 className="text-xl font-semibold mb-1" style={{ color: PRIMARY_BLUE }}>Time</h3>
                        <p className="text-lg text-gray-700 font-bold">{socialEventDetails.time}</p>
                        <p className="text-md text-gray-600">Start your weekend with us!</p>
                    </div>
                </div>
            </section>
            
            <hr className="my-8" />

            {/* Why Attend / Activity Highlight */}
            <section className="py-16 px-4 md:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <IconUsersGroup size={40} className="mx-auto mb-4" style={{ color: PRIMARY_BLUE }} />
                    <h2 className="text-3xl font-bold mb-4" style={{ color: PRIMARY_BLUE }}>
                        Community & Networking
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                        The West Nile Night is a casual space for professionals, students, and community leaders from the West Nile region to **connect**, **share ideas**, and **enjoy a relaxed evening** away from the formal setting. It's the perfect way to build your network.
                    </p>
                    <a
                        href="https://facebook.com/westnilefoundation" // Link to social media page where event updates are posted
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 text-lg font-semibold rounded-full transition duration-300 shadow-lg"
                        style={{ backgroundColor: PRIMARY_BLUE, color: 'white' }}
                    >
                        View Photos from Previous Nights
                    </a>
                </div>
            </section>
        </div>
    );
};

export default WnNightPage;