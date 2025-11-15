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
import partnerLogo1 from '~/assets/images/partnerLogo1.png';
import partnerLogo2 from '~/assets/images/partnerLogo2.png';
import partnerLogo3 from '~/assets/images/partnerLogo3.png';


/* ==================== ABOUT SNAPSHOT ==================== */
export const contentHomeOne: ContentProps = {
  id: 'about-snapshot',
  hasBackground: true,
  header: {
    title: 'Who We Are',
    subtitle: 'Building Opportunities for Students Across West Nile',
  },
  content:
    'Our goal is to empower students with higher academic levels and standards through quality formal and informal education to improve living conditions of the West Nile Region and Uganda at large.',
  image: {
    src: programImg1,
    alt: 'Students in class',
  },
  isReversed: false,
  items: [
    {
      title: 'Our Mission',
      description:
        'To ensure every child in West Nile has access to quality education and the resources they need to succeed.',
    },
    {
      title: 'Our Vision',
      description:
        "To attain well educated and empowered people of the West Nile Region in Uganda.",
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
    subtitle: 'Supporting Students, Teachers, and Schools',
  },
  items: [
    {
      title: 'Scholarship Program',
      description:
        'Providing financial support to outstanding students to pursue secondary and tertiary education.',
      icon: IconCheck,
    },
    {
      title: 'Teacher Training',
      description:
        'Empowering teachers with modern teaching methods and resources to improve classroom learning.',
      icon: IconBulb,
    },
    {
      title: 'School Infrastructure',
      description:
        'Building classrooms, libraries, and providing essential learning materials to underserved schools.',
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
      title: '1500+ Students Supported',
      description: 'Through scholarships and learning resources',
      icon: IconCheck,
    },
    {
      title: '200+ Teachers Trained',
      description: 'Improving teaching quality across the region',
      icon: IconCheck,
    },
    {
      title: '50 Schools Equipped',
      description: 'Providing libraries, classrooms, and essential resources',
      icon: IconCheck,
    },
    {
      title: 'Ongoing Programs',
      description: 'Continuous support for sustainable education growth',
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
    subtitle:
      'Hear from students and teachers whose lives have been transformed by WNETF initiatives.',
  },
  testimonials: [
    {
      name: 'Grace Akello',
      job: 'Student, Secondary School',
      testimonial:
        'Thanks to WNETF, I was able to complete my secondary education with all the necessary resources. I now dream of becoming a teacher myself.',
      image: {
        src: beneficiaryImg,
        alt: 'Grace Akello',
      },
    },
    {
      name: 'Samuel Obote',
      job: 'Teacher',
      testimonial:
        'The teacher training programs provided by WNETF have helped me improve my lessons and engage students better. The impact is visible in their performance.',
      image: {
        src: beneficiaryImg1,
        alt: 'Samuel Obote',
      },
    },
  ],
};

/* ==================== FINAL DONATE BANNER ==================== */
export const callToAction2Home: CallToActionProps = {
  title: 'Support Education in West Nile Today',
  subtitle:
    'Your contribution helps us reach more students, provide better learning resources, and empower the next generation.',
  callToAction: {
    text: 'Donate Now',
    href: '/donate',
  },
};

/* ==================== PARTNERS / SPONSORS STRIP ==================== */
export const socialProofHome: SocialProofProps = {
  id: 'partners-strip',
  hasBackground: false,
  images: [
    { link: '#', src: partnerLogo1, alt: 'Partner 1' },
    { link: '#', src: partnerLogo2, alt: 'Partner 2' },
    { link: '#', src: partnerLogo3, alt: 'Partner 3' },
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
