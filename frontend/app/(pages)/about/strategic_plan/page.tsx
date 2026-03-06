import React from 'react';
import { IconTargetArrow } from '@tabler/icons-react';
import { strategicAreas } from '~/shared/data/pages/about.data'; // Assuming you keep your data here

// Define the theme colors
const PRIMARY_BLUE = '#032B53';
const LIGHT_GREY = '#EAEAEA';

// This is the main component for the Strategic Plan page
const StrategicPlanPage: React.FC = () => {
    return (
        <div className="bg-white">
            
            {/* Page Header / Strategic Purpose */}
            <section className="py-16 px-4 md:px-8 text-center" style={{ backgroundColor: LIGHT_GREY }}>
                <div className="max-w-4xl mx-auto">
                    <IconTargetArrow size={60} className="mx-auto mb-4" style={{ color: PRIMARY_BLUE }} />
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: PRIMARY_BLUE }}>
                        WNETF Strategic Plan
                    </h1>
                    <h2 className="text-xl font-semibold mb-6 text-gray-700">
                        Strategic Purpose (Broad Objective)
                    </h2>
                    <p className="text-lg text-gray-800 italic">
                        "A well-trained and skilled human resource pool in West Nile is crucial for bolstering regional progress and for active participation at both national and international levels in matters of strategic development."
                    </p>
                </div>
            </section>

            {/* Strategic Areas of Focus - Card/Grid Layout */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12" style={{ color: PRIMARY_BLUE }}>
                    8 Strategic Areas of Focus
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {strategicAreas.map((area, index) => (
                        <div 
                            key={index} 
                            className="p-6 rounded-lg shadow-xl border-t-8 transition duration-300 hover:scale-[1.02]"
                            style={{ borderColor: PRIMARY_BLUE, backgroundColor: LIGHT_GREY }}
                        >
                            <span 
                                className="text-4xl font-extrabold block mb-3" 
                                style={{ color: PRIMARY_BLUE }}
                            >
                                0{index + 1}
                            </span>
                            <h3 className="text-xl font-bold mb-3" style={{ color: PRIMARY_BLUE }}>
                                {area.title}
                            </h3>
                            <p className="text-gray-700">
                                {area.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
            
            {/* Final CTA Banner (Reuse WNETF's donate theme) */}
            <section className="py-12 px-4 md:px-8 text-center" style={{ backgroundColor: PRIMARY_BLUE }}>
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-3xl font-bold text-white mb-4">
                        Do you believe in this plan?
                    </h3>
                    <p className="text-lg text-gray-200 mb-6">
                        Support the implementation of our strategic goals by making a commitment today.
                    </p>
                    <a
                        href="/donate"
                        className="px-8 py-3 text-lg font-semibold text-white rounded-full transition duration-300 shadow-lg"
                        style={{ backgroundColor: '#1E90FF' /* Introducing a brighter blue accent for contrast */ }}
                    >
                        Fund Our Strategy
                    </a>
                </div>
            </section>

        </div>
    );
};

export default StrategicPlanPage;