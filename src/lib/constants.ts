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
    tagline: 'Brotherhood. Leadership. Excellence.',
    foundingYear: 1892,
    university: 'State University',
    address: '123 Greek Row, University City, ST 12345',
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
    activeBrothers: 85,
    totalChapters: 150,
    foundingYear: 1892,
    alumni: 5000,
    philanthropyHours: 2500,
    moneyRaised: 50000,
};

export const VALUES: ValueCard[] = [
    {
        icon: 'Users',
        title: 'Brotherhood',
        description: 'Forge lifelong bonds with brothers who will support you through every challenge and celebrate every success.',
    },
    {
        icon: 'GraduationCap',
        title: 'Scholarship',
        description: 'Excel academically with peer tutoring, study groups, and a chapter GPA that consistently ranks among the top.',
    },
    {
        icon: 'Heart',
        title: 'Service',
        description: 'Give back to our community through meaningful philanthropy and volunteer work that makes a lasting impact.',
    },
    {
        icon: 'Trophy',
        title: 'Leadership',
        description: 'Develop essential leadership skills through chapter positions, campus involvement, and professional development.',
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

export const PLEDGE_CLASSES = [
    'Alpha',
    'Beta',
    'Gamma',
    'Delta',
    'Epsilon',
    'Zeta',
    'Eta',
    'Theta',
    'Iota',
    'Kappa',
];

export const ROLE_LABELS: Record<string, string> = {
    president: 'President',
    vice_president: 'Vice President',
    treasurer: 'Treasurer',
    secretary: 'Secretary',
    rush_chair: 'Rush Chair',
    social_chair: 'Social Chair',
    philanthropy_chair: 'Philanthropy Chair',
    member: 'Member',
    alumni: 'Alumni',
};

export const ROLE_COLORS: Record<string, string> = {
    president: 'bg-gradient-to-r from-amber-500 to-yellow-500',
    vice_president: 'bg-gradient-to-r from-purple-500 to-violet-500',
    treasurer: 'bg-gradient-to-r from-emerald-500 to-green-500',
    secretary: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    rush_chair: 'bg-gradient-to-r from-rose-500 to-pink-500',
    social_chair: 'bg-gradient-to-r from-orange-500 to-amber-500',
    philanthropy_chair: 'bg-gradient-to-r from-teal-500 to-emerald-500',
    member: 'bg-gradient-to-r from-slate-500 to-gray-500',
    alumni: 'bg-gradient-to-r from-indigo-500 to-purple-500',
};
