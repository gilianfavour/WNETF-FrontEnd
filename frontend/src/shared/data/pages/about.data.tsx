import { StaticImageData } from 'next/image';
import { TeamProps } from '../../types';

// --- Image Imports for Hero Carousel ---
import hero1 from '~/assets/images/hero1.jpg';
import hero2 from '~/assets/images/hero2.jpg';
import hero3 from '~/assets/images/hero3.jpg';
import teamImg1 from '~/assets/images/team1.png';
import teamImg2 from '~/assets/images/team2.jpg';
import partnerLogo1 from '~/assets/images/partnerLogo1.png';
import partnerLogo2 from '~/assets/images/partnerLogo2.png';
import partnerLogo3 from '~/assets/rdm.png';
import partnerLogo4 from '~/assets/images/wnf.png';
import partnerLogo5 from '~/assets/images/candia.jpg';
// --- Icon Imports for Objectives/Stats ---
import { IconCheck, IconBulb, IconRocket, IconUsers, IconBrandLinkedin, IconMail } from '@tabler/icons-react';

/* ==================== HERO SLIDES DATA (New Export) ==================== */
export const heroSlides: StaticImageData[] = [hero1, hero2, hero3];

/* ==================== WNETF PAGE DATA ==================== */

// Core Objectives data
export const wnetfObjectives = [
  {
    title: 'Scholarships & Financial Support',
    description:
      'Providing grants, scholarships, fellowships and other forms of financial assistance to vulnerable and underprivileged students from the West Nile region, including running a student loan scheme.',
    icon: IconCheck,
  },
  {
    title: 'Institutional Development',
    description:
      'Financial and development support to educational institutions: sponsorships, prizes, awards, distribution of textbooks, improving educational standards, and constructing/running schools and colleges.',
    icon: IconBulb,
  },
  {
    title: 'Research & Development',
    description: 'Providing or contributing to education and scientific research and development.',
    icon: IconRocket,
  },
];
// Impact Statistics data
export const wnetfImpactStats = [
  { number: 20, label: 'Students Supported', description: 'Beneficiaries across 7 public universities' },
  { number: 7, label: 'Universities', description: 'Gulu, Mak, MUST, Muni, KYU, Busitema, Kabale' },
  { number: 27, label: 'Tentative Beneficiaries', description: 'Total supported students to date' },
  { number: 100, label: 'Ongoing Programs', description: 'Continuous educational support initiatives' },
];

// WNETF Strategic Plan Areas (Condensed for display)
export const strategicAreas = [
  {
    title: 'Enhancing Mind Set Change',
    description:
      'Strengthening community awareness and sensitisation about education to enhance appreciation of the value of education, for mind-set change, and to help create a positive home learning environment.',
  },
  {
    title: 'Leadership Development',
    description:
      'Addressing barriers at the local level by building strong and supportive leadership to ensure all children, especially the marginalised, effectively participate in education and achieve learning outcomes.',
  },
  {
    title: 'Data & Information Management',
    description:
      'Generating accurate and reliable data and information on educational outcomes to inform policy advocacy, awareness, and planning for the West Nile region.',
  },
  {
    title: 'Strategic Communication',
    description:
      'Demonstrating educational outcomes through evidence-based communication to raise awareness, reduce inequalities, and inform policy decisions.',
  },
  {
    title: 'Policy Advocacy & Lobbying',
    description:
      'Engaging with policy actors to influence and promote equal implementation of educational policies across regions, improving learning outcomes.',
  },
  {
    title: 'Partnership Development',
    description:
      'Establishing strategic partnerships with organisations, government departments, agencies, and individuals for collaborative educational transformation.',
  },
  {
    title: 'Sponsorship & Support',
    description:
      'Mobilising resources to support disadvantaged students through scholarships, grants, and fellowships, enabling them to reach their full potential.',
  },
  {
    title: 'Strategic Areas of Support',
    description:
      'Providing critical educational support services such as libraries, computer labs, science labs, teaching and learning centres, and ongoing skills development for teachers and human resources.',
  },
];


export const socialProofHome = {
  id: 'partners-strip',
  title: 'Strategic Partners',
  images: [
    {
      src: partnerLogo1,
      alt: 'Master Card Foundation',
      link: 'https://mastercardfdn.org/',
    },
    {
      src: partnerLogo2,
      alt: 'Muni University',
      link: 'http://muni.ac.ug/',
    },
    {
      src: partnerLogo3,
      alt: 'RDM',
      link: 'https://rdmconsult.org/',
    },
    {
      src: partnerLogo4,
      alt: 'West Nile Foundation',
      link: '#',
    },
    {
      src: partnerLogo5,
      alt: 'Candia Advocates',
      link: 'https://candiaadvocates.co.ug/',
    },
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
      occupation: 'Chair Person Board Of Trustees',
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
      name: 'Badaru Carol',
      occupation: 'Member Of Trustees',
      image: {
        src: teamImg2, // Use the imported image variable
        alt: 'Badaru Carol',
      },
      items: [
        { title: 'LinkedIn', icon: IconBrandLinkedin, href: '#' },
        { title: 'Email', icon: IconMail, href: '#' },
      ],
    },
    // Add more team members here if necessary
  ],
};
