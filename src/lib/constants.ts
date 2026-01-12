import { NavLink, ValueCard, FAQ, RushEvent } from '@/types';

export const NAV_LINKS: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'Brothers', href: '/brothers' },
    { label: 'Giving Back', href: '/giving-back' },
    { label: 'Rush', href: '/rush' },
];

export const CHAPTER_INFO = {
    name: 'Alpha Kappa Sigma',
    greekLetters: 'ΑΚΣ',
    tagline: 'Camaraderie. Leadership. Lifelong Connections.',
    foundingYear: 1919,
    university: 'Northeastern University',
    address: '360 Huntington Ave, Boston, MA 02115',
    email: 'contact@alphakappasigma.org',
    phone: '(555) 123-4567',
    socialMedia: {
        instagram: 'https://instagram.com/alphakappasigma',
        twitter: 'https://twitter.com/alphakappasigma',
        linkedin: 'https://linkedin.com/company/alphakappasigma',
        facebook: 'https://facebook.com/alphakappasigma',
    },
};

export const CHAPTER_STATS = {
    activeBrothers: 46,
    totalChapters: 150,
    foundingYear: 1919,
    alumni: 5000,
    philanthropyHours: 2500,
    moneyRaised: 50000,
};

export const VALUES: ValueCard[] = [
    {
        icon: 'Users',
        title: 'Camaraderie',
        description: 'Build lasting friendships with brothers from diverse backgrounds who share your values and commitment to excellence.',
    },
    {
        icon: 'Trophy',
        title: 'Leadership',
        description: 'Develop essential leadership skills through chapter positions, campus involvement, and professional development.',
    },
    {
        icon: 'GraduationCap',
        title: 'Excellence',
        description: 'Strive for excellence in academics, service, and personal growth while supporting each other along the way.',
    },
    {
        icon: 'Heart',
        title: 'Kindred Sympathy',
        description: 'Embrace the advancement of kindred sympathy—genuine care and understanding that strengthens our lifelong connections.',
    },
];

export const RUSH_EVENTS: RushEvent[] = [
    {
        id: '1',
        title: 'Meet the Brothers BBQ',
        date: '2026-01-20',
        time: '5:00 PM - 8:00 PM',
        location: 'AKΣ Chapter House',
        description: 'Join us for a casual barbecue to meet the brothers and learn about fraternity life. Food and drinks provided!',
        isPast: false,
    },
    {
        id: '2',
        title: 'Game Night',
        date: '2026-01-22',
        time: '7:00 PM - 10:00 PM',
        location: 'AKΣ Chapter House',
        description: 'Board games, video games, and friendly competition. Show us your skills!',
        isPast: false,
    },
    {
        id: '3',
        title: 'Professional Development Workshop',
        date: '2026-01-24',
        time: '6:00 PM - 8:00 PM',
        location: 'Business Building, Room 101',
        description: 'Resume building, interview tips, and networking strategies from our alumni mentors.',
        isPast: false,
    },
    {
        id: '4',
        title: 'Philanthropy Day',
        date: '2026-01-25',
        time: '10:00 AM - 2:00 PM',
        location: 'Community Center',
        description: 'Experience our commitment to service firsthand as we volunteer together.',
        isPast: false,
    },
    {
        id: '5',
        title: 'Formal Dinner',
        date: '2026-01-27',
        time: '6:00 PM - 9:00 PM',
        location: 'University Club',
        description: 'Invite-only formal dinner. Dress code: business casual.',
        isPast: false,
    },
];

export const RUSH_FAQS: FAQ[] = [
    {
        id: '1',
        question: 'What is rush and how does it work?',
        answer: 'Rush is a recruitment period where you can meet the brothers, attend events, and learn about our fraternity. It\'s a mutual selection process where you get to know us and we get to know you. There\'s no obligation to join after attending rush events.',
    },
    {
        id: '2',
        question: 'What is the time commitment?',
        answer: 'New members typically spend 5-8 hours per week on chapter activities during their first semester. This includes weekly meetings, study hours, and events. After initiation, the time commitment is more flexible.',
    },
    {
        id: '3',
        question: 'What are the costs associated with membership?',
        answer: 'Dues vary by semester and cover social events, chapter operations, and national fees. We offer payment plans and financial assistance to ensure cost is never a barrier to membership. Contact our treasurer for specific details.',
    },
    {
        id: '4',
        question: 'Do I need to live in the chapter house?',
        answer: 'Living in the house is optional but encouraged. Many brothers live in the house during their sophomore and junior years. It\'s a great way to build stronger bonds and make the most of your fraternity experience.',
    },
    {
        id: '5',
        question: 'What is the GPA requirement?',
        answer: 'We require a minimum 2.5 GPA for membership and maintain a 2.7 requirement for members in good standing. Our chapter consistently maintains one of the highest GPAs among fraternities on campus.',
    },
    {
        id: '6',
        question: 'Is there hazing?',
        answer: 'Absolutely not. Alpha Kappa Sigma has a strict zero-tolerance policy for hazing. Our new member education program focuses on brotherhood, leadership development, and learning our history and values.',
    },
];

export const PHILANTHROPY_PARTNER = {
    name: 'Children\'s Hope Foundation',
    description: 'Our national philanthropy partner, Children\'s Hope Foundation, provides educational resources and mentorship programs for underprivileged youth across the country.',
    logo: '/philanthropy-logo.png',
    website: 'https://childrenshope.org',
    impact: {
        childrenHelped: 10000,
        scholarshipsAwarded: 500,
        mentorshipHours: 25000,
    },
};
