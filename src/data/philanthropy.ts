import { PhilanthropyEvent } from '@/types';

// Fish Fest events - our signature philanthropy in memory of Matt Fishman
export const fishFestEvents = [
    {
        id: 'ff1',
        name: 'Fish Fest I (Boiler Room)',
        season: 'Spring 2024',
        date: '2024-04-15',
        amountRaised: 3018,
        guests: 350,
        description: 'Our inaugural charity concert in memory of Matt Fishman, featuring local DJs and electronic music.',
    },
    {
        id: 'ff2',
        name: 'Fish Fest II (Boiler Room)',
        season: 'Fall 2024',
        date: '2024-10-20',
        amountRaised: 22174,
        guests: 900,
        description: 'The second iteration exceeded all expectations, bringing the Boston music community together for a cause.',
    },
    {
        id: 'ff3',
        name: 'Fish Fest III (Boiler Room)',
        season: 'Fall 2025',
        date: '2025-10-18',
        amountRaised: 5000,
        guests: 700,
        description: 'Continuing the tradition with another incredible night of music and community support.',
    },
];

export const philanthropyEvents: PhilanthropyEvent[] = [
    {
        id: '1',
        title: 'Fish Fest III',
        date: '2025-10-18',
        description: 'Our third annual charity concert featuring local DJs, raising funds for the Matt Fishman Scholarship.',
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop',
        hoursVolunteered: 200,
    },
    {
        id: '2',
        title: 'Fish Fest II',
        date: '2024-10-20',
        description: 'Record-breaking event with 900 guests, raising over $22,000 for the Matt Fishman Scholarship.',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop',
        hoursVolunteered: 250,
    },
    {
        id: '3',
        title: 'Community Servings Volunteer Day',
        date: '2025-09-15',
        description: 'Brothers volunteered at Community Servings, preparing meals for those in need across the Boston area.',
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop',
        hoursVolunteered: 80,
    },
    {
        id: '4',
        title: 'Fish Fest I',
        date: '2024-04-15',
        description: 'The inaugural Fish Fest charity concert, starting a tradition of honoring Matt through music.',
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop',
        hoursVolunteered: 150,
    },
    {
        id: '5',
        title: 'RACE Cancer Foundation Event',
        date: '2025-05-10',
        description: 'Partnered with RACE Cancer Foundation for awareness and fundraising activities.',
        image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
        hoursVolunteered: 60,
    },
    {
        id: '6',
        title: 'Little Sparks Project Workshop',
        date: '2025-03-22',
        description: 'Hosted a creative workshop with Little Sparks Project, inspiring young minds through art and music.',
        image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&h=400&fit=crop',
        hoursVolunteered: 40,
    },
];

export const impactStats = {
    totalHours: 1500,
    eventsHosted: 12,
    moneyRaised: 30000,
    communitiesServed: 8,
    partnersWorkedWith: 4,
    studentsmentored: 25,
};

// Fish Fest specific stats
export const fishFestStats = {
    totalRaised: 30192, // $3,018 + $22,174 + $5,000
    totalGuests: 1950, // 350 + 900 + 700
    eventsHosted: 3,
    scholarshipYearsFunded: 12,
};

export const upcomingEvents: PhilanthropyEvent[] = [
    {
        id: '7',
        title: 'Fish Fest IV',
        date: '2026-04-25',
        description: 'Our spring charity concert continuing the Fish Fest tradition. Stay tuned for lineup announcements!',
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop',
    },
    {
        id: '8',
        title: 'Community Servings Spring Event',
        date: '2026-03-15',
        description: 'Join us for our spring volunteer day with Community Servings, preparing meals for those in need.',
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop',
    },
];
