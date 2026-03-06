import React from 'react';
import Image from 'next/image';
import { IconHeartHandshake, IconUsers } from '@tabler/icons-react';
import { socialProofHome } from '~/shared/data/pages/about.data'; // Assuming this data is available

// Define the theme colors
const PRIMARY_BLUE = '#032B53';
const LIGHT_GREY = '#EAEAEA';

const PartnersPage: React.FC = () => {
    // Defensive check: Return early if data or images array is missing/empty
    if (!socialProofHome || !socialProofHome.images || socialProofHome.images.length === 0) {
         return (
            <div className="text-center py-20">
                <h2 className="text-2xl" style={{ color: PRIMARY_BLUE }}>Partner information is currently being updated.</h2>
            </div>
        );
    }
    
    return (
        <div className="bg-white">
            
            {/* Page Header / Introduction */}
            <section className="py-16 px-4 md:px-8 text-center" style={{ backgroundColor: LIGHT_GREY }}>
                <div className="max-w-4xl mx-auto">
                    <IconHeartHandshake size={60} className="mx-auto mb-4" style={{ color: PRIMARY_BLUE }} />
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: PRIMARY_BLUE }}>
                        Our Valued Partners
                    </h1>
                    <p className="text-xl text-gray-700 italic">
                        "Collaboration is paramount for achieving WNETF's goals. We are proud to work alongside pivotal organizations, government agencies, and individuals."
                    </p>
                </div>
            </section>

            {/* Partner Logos Display */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12" style={{ color: PRIMARY_BLUE }}>
                    Organizations We Work With
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12 items-center justify-center">
                    {/* Map through the socialProofHome data (partner logos) */}
                    {socialProofHome.images.map((partner, index) => {
                        
                        // FIX: Safely determine the partner link using optional chaining and nullish check
                        const partnerLink = partner.link?.trim() || null; 

                        // The logo container content
                        const LogoContent = (
                            <div className="p-4 bg-white shadow-lg rounded-lg transition duration-300 hover:shadow-2xl hover:scale-105">
                                {/* Ensure image source is available before rendering */}
                                {partner.src && (
                                    <Image
                                        src={partner.src}
                                        alt={partner.alt}
                                        className="w-full h-auto object-contain max-h-24"
                                        priority
                                    />
                                )}
                            </div>
                        );

                        // If a link exists, wrap the content in a clickable anchor tag
                        if (partnerLink) {
                            return (
                                <a 
                                    key={index}
                                    href={partnerLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    title={`Visit the website of ${partner.alt}`}
                                >
                                    {LogoContent}
                                </a>
                            );
                        }
                        
                        // If no link exists, return the content in a non-clickable div
                        return (
                            <div key={index}>
                                {LogoContent}
                            </div>
                        );
                    })}
                </div>
                
                {/* Optional: Partner Description Text */}
                <p className="max-w-3xl mx-auto mt-12 text-center text-lg text-gray-600 border-t pt-8">
                    Each partnership is a strategic contribution to educational transformation, helping us mobilize resources and extend our reach to more students and schools in the West Nile region.
                </p>
            </section>

            {/* Call to Partnership (CTA) */}
            <section className="py-16 px-4 md:px-8 text-center" style={{ backgroundColor: PRIMARY_BLUE }}>
                <div className="max-w-4xl mx-auto text-white">
                    <IconUsers size={60} className="mx-auto mb-4" />
                    <h2 className="text-3xl font-bold mb-4">
                        Join Our Network of Support
                    </h2>
                    <p className="text-lg mb-6 text-gray-200">
                        Are you an organization, corporation, or individual passionate about education in Uganda? We welcome strategic collaborations that align with our mission.
                    </p>
                    <a
                        href="/contact-us" // Assuming you have a contact or partnership form page
                        className="px-8 py-3 text-lg font-semibold text-white rounded-full transition duration-300 shadow-lg"
                        style={{ backgroundColor: '#FFD700', color: PRIMARY_BLUE /* Gold accent for impact */ }}
                    >
                        Explore Partnership Opportunities
                    </a>
                </div>
            </section>
        </div>
    );
};

export default PartnersPage;