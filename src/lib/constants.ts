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
    philanthropyHours: 1500,
    moneyRaised: 30000,
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
        title: 'Dye & Dogs',
        date: '2026-09-12',
        time: '3:00 PM',
        location: 'Meet at Centennial Flagpole',
        description: '',
        inviteOnly: false,
    },
    {
        id: '2',
        title: 'Casino Night',
        date: '2026-09-14',
        time: '7:00 PM',
        location: 'Meet at Centennial Flagpole',
        description: '',
        inviteOnly: false,
    },
    {
        id: '3',
        title: 'Hot Ones',
        date: '2026-09-16',
        time: '7:00 PM',
        location: 'Meet at Centennial Flagpole',
        description: '',
        inviteOnly: false,
    },
    {
        id: '4',
        title: 'Bonfire',
        date: '2026-09-19',
        time: '5:00 PM',
        location: 'Meet at Centennial Flagpole',
        description: '',
        inviteOnly: false,
    },
    {
        id: '5',
        title: 'Dinner',
        date: '2026-09-23',
        time: '7:00 PM',
        location: 'Meet at Centennial Flagpole',
        description: '',
        inviteOnly: true,
    },
    {
        id: '6',
        title: 'Cigars & Cider',
        date: '2026-09-25',
        time: '7:00 PM',
        location: 'Meet at Centennial Flagpole',
        description: '',
        inviteOnly: true,
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
        answer: 'Alpha Kappa Sigma is a local fraternity. Dues vary by semester and support chapter operations and activities. Contact our treasurer for current dues and to discuss payment options.',
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

export const MATT_FISHMAN_SCHOLARSHIP = {
    name: 'Matt Fishman Scholarship',
    subtitle: 'In Memory of Matt Fishman (2001-2024)',
    description: 'The Matt Fishman Scholarship supports high school students pursuing music—either as performers or composers—who have been impacted by cancer or another medical hardship, either personally or through a family member. Matt passed away in August 2024 at the age of 23 after a courageous 2-year battle with Glioblastoma.',
    about: 'Matt was a brother of Alpha Kappa Sigma who embodied the spirit of kindred sympathy. Through Fish Fest, our Boiler Room-inspired charity concerts, we continue to honor his memory and passion for music.',
    links: {
        scholarship: 'https://bold.org/scholarships/matt-fishman-scholarship/',
        raceCancer: 'https://racecancer.org/matt',
        neuArticle: 'https://news.northeastern.edu/2024/09/09/matt-fishman-scholarship/',
        memorial: 'https://yourmission.org/matt/',
    },
    impact: {
        totalRaised: 30000,
        scholarshipYears: 12,
        guestsReached: 1950,
    },
};

export const PHILANTHROPY_PARTNERS = [
    {
        name: 'RACE Cancer Foundation',
        description: 'A local charitable organization that administers the Matt Fishman Scholarship and supports cancer research and patient care.',
        website: 'https://racecancer.org',
    },
    {
        name: 'Community Servings',
        description: 'A nonprofit providing medically tailored meals to individuals and families living with critical and chronic illnesses.',
        website: 'https://communityservings.org',
    },
    {
        name: 'Little Sparks Project',
        description: 'An organization dedicated to inspiring creativity and providing educational opportunities for young people.',
        website: 'https://littlesparksproject.org',
    },
];

// Keep for backward compatibility
export const PHILANTHROPY_PARTNER = {
    name: 'Matt Fishman Scholarship',
    description: 'In memory of our brother Matt Fishman, we raise funds for a scholarship supporting high school students pursuing music who have been impacted by cancer or medical hardship.',
    logo: '/philanthropy-logo.png',
    website: 'https://bold.org/scholarships/matt-fishman-scholarship/',
    impact: {
        childrenHelped: 1950,
        scholarshipsAwarded: 12,
        mentorshipHours: 30000,
    },
};
