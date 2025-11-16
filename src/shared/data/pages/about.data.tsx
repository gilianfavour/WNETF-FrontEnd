import { StaticImageData } from 'next/image';
import { TeamProps } from '../../types';

// --- Image Imports for Hero Carousel ---
import hero1 from '~/assets/images/hero1.jpg';
import hero2 from '~/assets/images/hero2.jpg';
import hero3 from '~/assets/images/hero3.jpg';
import teamImg1 from '~/assets/images/team1.png'; 
import teamImg2 from '~/assets/images/team2.jpg';
import partnerLogo1 from '~/assets/images/partnerLogo1.png'
import partnerLogo2 from '~/assets/images/partnerLogo2.png'
import partnerLogo3 from '~/assets/images/partnerLogo3.png'

// --- Icon Imports for Objectives/Stats ---
import {
    IconCheck,
    IconBulb,
    IconRocket,
    IconUsers,
    IconBrandLinkedin,
    IconMail,
} from '@tabler/icons-react';

/* ==================== HERO SLIDES DATA (New Export) ==================== */
export const heroSlides: StaticImageData[] = [hero1, hero2, hero3];

/* ==================== WNETF PAGE DATA ==================== */

// Core Objectives data
export const wnetfObjectives = [
    {
        title: 'Scholarship Programs',
        description:
            'Provide financial assistance and scholarships to vulnerable but brilliant students from the West Nile region for higher education.',
        icon: IconCheck,
    },
    {
        title: 'Teacher Empowerment',
        description:
            'Grant financial assistance to institutions and support continuous skill development for teachers and essential human resources.',
        icon: IconBulb,
    },
    {
        title: 'Infrastructure & Resources',
        description:
            'Construct and run educational institutions, and provide essential facilities like libraries, computer, and science laboratories.',
        icon: IconRocket,
    },
];

// Impact Statistics data
export const wnetfImpactStats = [
    { number: '26+', label: 'Students Sponsored', color: 'text-white', description: 'Since our establishment in 2013' },
    { number: '9', label: 'Full Graduates', color: 'text-white', description: 'In Medicine, Engineering, and Pharmacy' },
    { number: '6', label: 'Public Universities', color: 'text-white', description: 'Used for student placements' },
    { number: '2013', label: 'Established In', color: 'text-white', description: 'By West Nile Foundation' },
];

// WNETF Strategic Plan Areas (Condensed for display)
export const strategicAreas = [
    { title: '1: Mind Set Change', description: 'Bolstering community awareness and education advocacy to foster a conducive home learning environment.' },
    { title: '2: Leadership Development', description: 'Eliminating the grassroots deficiency in leadership championing educational progress in the region.' },
    { title: '3: Data Information Management', description: 'Generating precise and dependable data to inform comprehensive planning and policy advocacy.' },
    { title: '4: Strategic Communication', description: 'Disseminating tangible evidence of learning disparities to call government authorities and leaders to action.' },
    { title: '5: Policy Advocacy & Lobbying', description: 'Advocating for policy changes to influence government and ensure fairer learning outcomes across all regions.' },
    { title: '6: Partnership Development', description: 'Establishing meaningful partnerships and mobilizing stakeholders for educational transformation.' },
    { title: '7: Sponsorship and Support', description: 'Mobilizing resources and instituting sponsorship programs to unlock student potential.' },
    { title: '8: Strategic Areas of Support', description: 'Proactively facilitating the provision of vital educational support services and facilities.' },
];

export const socialProofHome = {
    // ... other properties
    images: [
        { 
            src: partnerLogo1, 
            alt: 'Master Card Foundation', 
            // FIX: Change this placeholder:
            link: 'https://mastercardfdn.org/', 
        },
        { 
            src: partnerLogo2, 
            alt: 'Muni University', 
            // FIX: Change this placeholder:
            link: 'http://muni.ac.ug/', 
        },
        { 
            src: partnerLogo3, 
            alt: 'RDM', 
            // FIX: Change this placeholder:
            link: '/', 
        },
        // ... more partners
    ],
};

/* ==================== TEAM SECTION ==================== */
export const teamHome: TeamProps = {
    id: 'team-on-home',
    hasBackground: false,
    header: {
        title: 'Meet Our Team',
        subtitle: 'Dedicated staff driving education impact',
    },
    teams: [
        {
            name: 'Charles Draecabo',
            occupation: 'Project Manager',
            image: {
                src: teamImg1, // Use the imported image variable
                alt: 'Charles Draecabo',
            },
            items: [
                { title: 'LinkedIn', icon: IconBrandLinkedin, href: '#' },
                { title: 'Email', icon: IconMail, href: '#' },
            ],
        },
        {
            name: 'Toby Foster',
            occupation: 'Program Coordinator',
            image: {
                src: teamImg2, // Use the imported image variable
                alt: 'Toby Foster',
            },
            items: [
                { title: 'LinkedIn', icon: IconBrandLinkedin, href: '#' },
                { title: 'Email', icon: IconMail, href: '#' },
            ],
        },
        // Add more team members here if necessary
    ],
};