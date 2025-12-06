import {
  IconArrowDown,
  IconBulb,
  IconCheck,
  IconClock,
  IconMapPin,
  IconPhoneCall,
  IconRocket,
  IconBrandLinkedin,
  IconMail,
} from '@tabler/icons-react';

import {
  CallToActionProps,
  ContactProps,
  ContentProps,
  FeaturesProps,
  HeroProps,
  SocialProofProps,
  StepsProps,
  TestimonialsProps,
  TeamProps,
} from '../../types';

import heroImg from '~/assets/images/hero.jpg';
import programImg1 from '~/assets/images/hero.jpg';
import programImg2 from '~/assets/images/hero.jpg';
import programImg3 from '~/assets/images/hero.jpg';
import impactImg from '~/assets/images/hero.jpg';
import beneficiaryImg from '~/assets/images/beneficiary1.jpg';
import beneficiaryImg1 from '~/assets/images/beneficiary2.jpeg';
import teamImg1 from '~/assets/images/team1.png';
import teamImg2 from '~/assets/images/team2.jpg';
import hero1 from '~/assets/images/hero1.jpg';
import hero2 from '~/assets/images/hero2.jpg';
import hero3 from '~/assets/images/hero3.jpg';
import partnerLogo1 from '~/assets/images/partnerLogo1.png'
import partnerLogo2 from '~/assets/images/partnerLogo2.png'
import partnerLogo3 from '~/assets/rdm.png'
import partnerLogo4 from '~/assets/images/wnf.png'
import partnerLogo5 from '~/assets/images/candia.jpg'


/* ==================== HERO SLIDES DATA ==================== */
// Define and EXPORT the slides data array
export const heroSlides = [hero1, hero2, hero3];

/* ==================== ABOUT SNAPSHOT ==================== */
export const contentHomeOne: ContentProps = {
  id: 'about-snapshot',
  hasBackground: true,
  header: {
    title: 'Who We Are',
    subtitle: 'Building Opportunities for Students Across West Nile',
  },
  content:
   'The West Nile Education Trust Fund (WNETF) provides scholarships, financial support, and educational development initiatives to empower students and schools across the West Nile Region.',
  image: {
    src: programImg1,
    alt: 'Students in class',
  },
  isReversed: false,
  items: [
    {
      title: 'Our Mission',
      description:
         'To provide scholarships, grants, and financial support to students and educational institutions to improve learning outcomes across West Nile.',
    },
    {
      title: 'Our Vision',
      description:
       'Empowered and well-educated communities in the West Nile Region through accessible quality education.',
    },
  ],
};

/* ==================== PROGRAMS / PROJECTS ==================== */
export const featuresHome: FeaturesProps = {
  id: 'programs-showcase',
  hasBackground: false,
  columns: 3,
  header: {
    title: 'Our Key Programs',
    subtitle: 'Supporting Students Financially',
  },
  items: [
    {
       title: 'Scholarships & Financial Support',
      description:
        'Providing financial assistance to university and vocational students from West Nile to pursue education and skills development.',
      icon: IconCheck,
    },
    {
      title: 'Institutional Development',
      description:
        'Supporting schools and educational institutions with resources, infrastructure, and programs to enhance learning outcomes.',
      icon: IconBulb,
    },
    {
      title: 'Research & Development',
      description:
        'Contributing to education and scientific research to improve educational standards in the region.',
      icon: IconRocket,
    },
  ],
};

/* ==================== IMPACT / STATS ==================== */
export const stepsHome: StepsProps = {
  id: 'impact-stats',
  hasBackground: true,
  isReversed: false,
  isImageDisplayed: true,
  image: {
    src: impactImg,
    alt: 'Impact Statistics',
  },
  header: {
    title: 'Our Impact in Numbers',
  },
  items: [
    {
     title: '27 Students Supported',
      description: 'Beneficiaries of scholarships and grants (as of now).',
      icon: IconCheck,
    },
    {
      title: '7 Public Universities',
      description: 'Supported students studying at Gulu, Makerere, MUST, Muni, KYU, Busitema, and Kabale.',
      icon: IconCheck,
    },
    {
      title: 'Areas of Strategic Focus',
      description: 'Mindset change, leadership development, data and information, strategic communication, policy advocacy, partnerships, sponsorship & support.',
      icon: IconCheck,
    },
    {
       title: 'Ongoing Programs',
      description: 'Continuous support for sustainable education growth in West Nile.',
      icon: IconCheck,
    },
  ],
};

/* ==================== BENEFICIARY STORIES / TESTIMONIALS ==================== */
export const testimonialsHome: TestimonialsProps = {
  id: 'beneficiary-stories',
  hasBackground: false,
  header: {
    title: 'Voices of Our Beneficiaries',
    subtitle: 'Hear from students whose lives have been transformed by WNETF initiatives.',
  },
  testimonials: [
    {
      name: 'Ayikoru Salama',
      job: 'Student, University',
      testimonial:
        'Thanks to WNETF, I received a scholarship that allowed me to pursue my degree. It has truly changed my life.',
      image: {
        src: beneficiaryImg,
        alt: 'Salama',
      },
    },
    {
      name: 'Feni Nobert',
      job: 'Teacher',
      testimonial:
        'The teacher training programs from WNETF have empowered me to improve my teaching and positively impact my students.',
      image: {
        src: beneficiaryImg1,
        alt: 'Norbert',
      },
    },
  ],
};



/* ==================== FINAL DONATE BANNER ==================== */
export const callToAction2Home: CallToActionProps = {
  title: 'WNETF Arua Marathon 2025',
  subtitle: 'Join us on Saturday, December 27, 2025 at Arua Hill Open Ground to support education in West Nile.',
  kitInfo: 'Running kits available at UGX 35,000 — get yours at designated locations!',
  callToAction: {
    text: 'View Details',
    href: '/about/marathon',
  },
};

/* ==================== PARTNERS / SPONSORS STRIP ==================== */
export const socialProofHome: SocialProofProps = {
  id: 'partners-strip',
  title: 'Strategic Partners',
  images: [
    { link: '#', src: partnerLogo1, alt: 'Partner 1' },
    { link: '#', src: partnerLogo2, alt: 'Partner 2' },
    { link: '#', src: partnerLogo3, alt: 'Partner 3' },
    { link: '#', src: partnerLogo4, alt: 'Partner 4' },
    { link: '#', src: partnerLogo5, alt: 'Partner 5' },
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
        src: teamImg1,
        alt: 'Samuel Obote'},
      items: [
        { title: 'LinkedIn', icon: IconBrandLinkedin, href: '#' },
        { title: 'Email', icon: IconMail, href: '#' },
      ],
    },
    {
      name: 'Toby Foster',
      occupation: 'Program Coordinator',
       image: {
        src: teamImg2,
        alt: 'Samuel Obote'},
      items: [
        { title: 'LinkedIn', icon: IconBrandLinkedin, href: '#' },
        { title: 'Email', icon: IconMail, href: '#' },
      ],
    },
  ],
};
