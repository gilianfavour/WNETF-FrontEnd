import React from 'react';
import Image from 'next/image';
import { IconUsersGroup, IconMail, IconBrandLinkedin } from '@tabler/icons-react';
import { teamHome } from '~/shared/data/pages/about.data'; 
import { TeamProps } from '~/shared/types';

// Define the theme colors
const PRIMARY_BLUE = '#032B53';
const LIGHT_GREY = '#EAEAEA';

const typedTeamHome: TeamProps = teamHome;

const TeamPage: React.FC = () => {
    // Determine the icon component based on the item title (used for social links)
    const getIcon = (title: string) => {
        switch (title) {
            case 'LinkedIn':
                return IconBrandLinkedin;
            case 'Email':
                return IconMail;
            default:
                return IconUsersGroup; // Fallback
        }
    };

    return (
        <div className="bg-white">
            
            {/* Page Header / Introduction */}
            <section className="py-16 px-4 md:px-8 text-center" style={{ backgroundColor: LIGHT_GREY }}>
                <div className="max-w-4xl mx-auto">
                    <IconUsersGroup size={60} className="mx-auto mb-4" style={{ color: PRIMARY_BLUE }} />
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: PRIMARY_BLUE }}>
                        {teamHome.header.title}
                    </h1>
                    <p className="text-xl text-gray-700 italic">
                        {teamHome.header.subtitle}
                    </p>
                </div>
            </section>

            {/* Team Member Grid */}
            <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {teamHome.teams.map((member, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-lg shadow-xl overflow-hidden transition duration-330 hover:shadow-2xl hover:scale-[1.02]"
                        >
                            <div className="relative h-64 w-full">
                                {/* Team Image */}
                                <Image
                                    src={member.image.src}
                                    alt={member.image.alt || member.name}
                                    fill
                                    className="object-cover object-top"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    priority
                                />
                            </div>

                            <div className="p-6 text-center">
                                {/* Name and Role */}
                                <h3 className="text-2xl font-bold mb-1" style={{ color: PRIMARY_BLUE }}>
                                    {member.name}
                                </h3>
                                <p className="text-lg font-semibold mb-4 text-gray-600">
                                    {member.occupation}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            
            {/* CTA for Joining the Team / Contact */}
            <section className="py-12 px-4 md:px-8 text-center" style={{ backgroundColor: PRIMARY_BLUE }}>
                <div className="max-w-4xl mx-auto text-white">
                    <h3 className="text-3xl font-bold mb-4">
                        Do You Share Our Passion?
                    </h3>
                    <p className="text-lg text-gray-200 mb-6">
                        We are always looking for dedicated individuals to support our mission. Reach out to explore volunteering or career opportunities.
                    </p>
                    <a
                        href="/contact-us"
                        className="px-8 py-3 text-lg font-semibold text-white rounded-full transition duration-300 shadow-lg"
                        style={{ backgroundColor: LIGHT_GREY, color: PRIMARY_BLUE }} // Inverted colors for high contrast CTA
                    >
                        Contact Our HR Team
                    </a>
                </div>
            </section>
        </div>
    );
};

export default TeamPage;