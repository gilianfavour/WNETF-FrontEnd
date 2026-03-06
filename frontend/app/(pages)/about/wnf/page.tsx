import React from 'react';
import { IconUsersGroup, IconArrowDown, IconBuildingCommunity } from '@tabler/icons-react';

// Define the theme colors
const PRIMARY_BLUE = '#032B53';
const LIGHT_GREY = '#EAEAEA';

const WnfPage: React.FC = () => {
    return (
        <div className="bg-white">
            
            {/* Page Header / Introduction */}
            <section className="py-16 px-4 md:px-8 text-center" style={{ backgroundColor: PRIMARY_BLUE }}>
                <div className="max-w-4xl mx-auto text-white">
                    <IconBuildingCommunity size={60} className="mx-auto mb-4" />
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        West Nile Foundation (WNF)
                    </h1>
                    <p className="text-xl font-light italic mb-6">
                        "An umbrella Organisation formed to foster development for the people of West Nile."
                    </p>
                </div>
            </section>

            {/* Brief Introduction and Establishment */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4" style={{ color: PRIMARY_BLUE }}>
                        Our Mandate
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                        The West Nile Foundation (WNF) was established in **2013** to create a link and establish a forum to address socio-economic issues, undertake, and execute programs leading to the socio-economic transformation of the lives of the people of the West Nile region.
                    </p>
                    <p className="text-lg font-semibold" style={{ color: PRIMARY_BLUE }}>
                        We bring together people, well-wishers, and those hailing from or originating from the West Nile Region of Uganda on a common agenda to augment and further regional development.
                    </p>
                </div>
            </section>

            {/* Relationship Visual: WNF and WNETF */}
            <section className="py-16 px-4 md:px-8" style={{ backgroundColor: LIGHT_GREY }}>
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-12" style={{ color: PRIMARY_BLUE }}>
                        The WNF Development Ecosystem
                    </h2>

                    <div className="flex flex-col items-center justify-center space-y-8">
                        {/* 1. WNF - The Umbrella */}
                        <div className="w-full max-w-sm p-8 rounded-xl shadow-xl border-b-4 border-b-primary" style={{ backgroundColor: PRIMARY_BLUE }}>
                            <IconUsersGroup size={40} className="mx-auto mb-3 text-white" />
                            <h3 className="text-2xl font-bold text-white mb-1">
                                West Nile Foundation (WNF)
                            </h3>
                            <p className="text-gray-200">
                                The umbrella organization fostering overall regional transformation.
                            </p>
                        </div>

                        {/* Arrow Down */}
                        <IconArrowDown size={40} className="text-gray-500 animate-bounce" />

                        {/* 2. WNETF - The Subordinate */}
                        <div className="w-full max-w-sm p-8 rounded-xl shadow-xl border-b-4 border-b-primary" style={{ borderColor: PRIMARY_BLUE, backgroundColor: 'white' }}>
                            <IconBuildingCommunity size={40} className="mx-auto mb-3" style={{ color: PRIMARY_BLUE }} />
                            <h3 className="text-2xl font-bold mb-1" style={{ color: PRIMARY_BLUE }}>
                                WNETF
                            </h3>
                            <p className="text-gray-600">
                                A subordinate entity dedicated specifically to **revamping educational opportunities**.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WNETF Success Highlight */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4" style={{ color: PRIMARY_BLUE }}>
                    Our Impact Through WNETF
                </h2>
                <p className="max-w-3xl mx-auto text-lg text-gray-700 mb-8">
                    True to its goal, the WNF's initiative, WNETF, has faithfully supported 26 beneficiaries since 2017 to disciplines like medicine, pharmacy, and engineering, with 9 now full graduates.
                </p>
                <a
                    href="/about/wnetf"
                    className="px-8 py-3 text-lg font-semibold text-white rounded-full transition duration-300 hover:opacity-90 shadow-lg"
                    style={{ backgroundColor: PRIMARY_BLUE }}
                >
                    See WNETF's Full Success Story
                </a>
            </section>
        </div>
    );
};

export default WnfPage;