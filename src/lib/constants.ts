import { NavLink, ValueCard, FAQ, RushEvent } from '@/types';

export const NAV_LINKS: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'Rush', href: '/rush' },
    { label: 'Brothers', href: '/brothers' },
    { label: 'Giving Back', href: '/giving-back' },
    { label: 'History', href: '/history' },
];

export const CHAPTER_INFO = {
    name: 'Alpha Kappa Sigma',
    greekLetters: 'ΑΚΣ',
    tagline: 'Advancing Kindred Sympathy',
    foundingYear: 1919,
    university: 'Northeastern University',
    address: '360 Huntington Ave, Boston, MA 02115',
    email: 'contact@alphakappasigma.org',
    phone: '(555) 123-4567',
    socialMedia: {
        instagram: 'https://instagram.com/alphakappasigma',
        linkedin: 'https://www.linkedin.com/company/alpha-kappa-sigma/',
    },
};

export const CHAPTER_STATS = {
    activeBrothers: 46,
    totalChapters: 1,
    foundingYear: 1919,
    alumni: 500,
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
        title: 'Casino Rush Event',
        date: '2026-01-11',
        time: '5:00 PM',
        location: 'AKΣ Chapter House',
        description: 'Kick off rush with casino night! Games, food, and a chance to meet the brothers in a fun casino-themed atmosphere.',
        isPast: false,
    },
    {
        id: '2',
        title: 'Monday Night Football',
        date: '2026-01-13',
        time: '8:00 PM',
        location: 'AKΣ Chapter House',
        description: 'Watch the game with the brothers! Enjoy food, drinks, and great company while cheering on your team.',
        isPast: false,
    },
    {
        id: '3',
        title: 'Hot Ones Rush',
        date: '2026-01-16',
        time: '7:00 PM',
        location: 'AKΣ Chapter House',
        description: 'Think you can handle the heat? Take on the Hot Ones challenge with the brothers and test your spice tolerance!',
        isPast: false,
    },
    {
        id: '4',
        title: 'Football Tournament',
        date: '2026-01-18',
        time: '2:00 PM',
        location: 'TBD',
        description: 'Show off your football skills in our rush football tournament. Teams will be formed on-site.',
        isPast: false,
    },
    {
        id: '5',
        title: 'Rush Party',
        date: '2026-01-18',
        time: '9:30 PM',
        location: 'AKΣ Chapter House',
        description: 'End the day with the official rush party. Connect with brothers and potential new members.',
        isPast: false,
    },
    {
        id: '6',
        title: 'Dim Sum',
        date: '2026-01-21',
        time: '6:00 PM',
        location: 'TBD',
        description: 'Invite-only dim sum dinner. A more intimate setting to get to know the brotherhood.',
        isPast: false,
    },
    {
        id: '7',
        title: 'Cigars and Cider',
        date: '2026-01-22',
        time: '7:00 PM',
        location: 'TBD',
        description: 'A relaxed evening of conversation, apple cider, and good company with the brothers.',
        isPast: false,
    },
    {
        id: '8',
        title: 'Bid Acceptance',
        date: '2026-01-31',
        time: '6:00 PM',
        location: 'AKΣ Chapter House',
        description: 'The moment you\'ve been waiting for. Join us to officially accept your bid and become part of the ΑΚΣ family.',
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
