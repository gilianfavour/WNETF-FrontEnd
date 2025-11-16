import React from 'react';
import HeroCarousel from '~/components/widgets/HeroCarousel'; // Adjust path as necessary
import {
    heroSlides,
    wnetfObjectives,
    wnetfImpactStats,
    strategicAreas,
} from '~/shared/data/pages/about.data'; // Adjust path as necessary

// Define the theme colors
const PRIMARY_BLUE = '#032B53';
const LIGHT_GREY = '#EAEAEA';

const WnetfPage: React.FC = () => {
    return (
        <div className="bg-white">
            {/* A. Hero Section */}
            <HeroCarousel
                slides={heroSlides}
                title="West Nile Education Trust Fund (WNETF)"
                subtitle="Revamping educational opportunities for underprivileged but brilliant students across the West Nile Region."
                ctaText="Be Part of the Change! Donate Today"
                ctaHref="/donate"
            />

            {/* B. Vision & Mission Section */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4" style={{ color: PRIMARY_BLUE }}>
                        About WNETF
                    </h2>
                    <p className="max-w-3xl mx-auto text-lg text-gray-700">
                        WNETF was established in 2013 as an initiative of West Nile Foundation to augment and further the development of the region by focusing exclusively on education. We are driven by one core vision.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 text-center">
                    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-3" style={{ color: PRIMARY_BLUE }}>Our Vision</h3>
                        <p className="text-xl font-medium italic text-gray-800">
                            "To attain well educated and empowered people of the West Nile Region in Uganda."
                        </p>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold mb-3" style={{ color: PRIMARY_BLUE }}>Our Goal</h3>
                        <p className="text-xl font-medium italic text-gray-800">
                            "To empower students with higher academic levels and standards through quality formal and informal education."
                        </p>
                    </div>
                </div>
            </section>
            
            <hr className="my-8" />

            {/* C. Our Objectives (Key Programs) */}
            <section className="py-16 px-4 md:px-8" style={{ backgroundColor: LIGHT_GREY }}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12" style={{ color: PRIMARY_BLUE }}>
                        Our Core Objectives
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {wnetfObjectives.map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center transition duration-300 hover:shadow-xl">
                                <item.icon size={48} className="mx-auto mb-4" style={{ color: PRIMARY_BLUE }} />
                                <h3 className="text-xl font-semibold mb-3" style={{ color: PRIMARY_BLUE }}>
                                    {item.title}
                                </h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <hr className="my-8" />

            {/* D. Impact in Numbers */}
            <section className="py-16 px-4 md:px-8" style={{ backgroundColor: PRIMARY_BLUE }}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 text-white">
                        Our Impact to Date
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {wnetfImpactStats.map((stat, index) => (
                            <div key={index} className="p-6 text-center border-2 border-white/30 rounded-lg">
                                <p className="text-6xl font-extrabold mb-2" style={{ color: 'white' }}>
                                    {stat.number}
                                </p>
                                <h3 className="text-xl font-semibold mb-1 text-white">
                                    {stat.label}
                                </h3>
                                <p className="text-sm text-gray-300">{stat.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* E. Strategic Plan Overview (Accordion Style - Simple List for Code Example) */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12" style={{ color: PRIMARY_BLUE }}>
                    Strategic Areas of Focus
                </h2>
                <div className="space-y-4">
                    {strategicAreas.map((area, index) => (
                        <div key={index} className="p-5 border-l-4 border-l-primary-500 rounded-lg shadow-md" style={{ borderColor: PRIMARY_BLUE, backgroundColor: LIGHT_GREY }}>
                            <h3 className="text-xl font-bold mb-2" style={{ color: PRIMARY_BLUE }}>
                                {area.title}
                            </h3>
                            <p className="text-gray-700">{area.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default WnetfPage;