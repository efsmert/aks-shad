import { PhilanthropyEvent } from '@/types';

export const philanthropyEvents: PhilanthropyEvent[] = [
    {
        id: '1',
        title: 'Community Food Drive',
        date: '2025-11-15',
        description: 'Our annual food drive collected over 2,000 pounds of non-perishable items for local food banks.',
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop',
        hoursVolunteered: 120,
    },
    {
        id: '2',
        title: 'Habitat for Humanity Build',
        date: '2025-10-20',
        description: 'Brothers spent the weekend helping build homes for families in need in our local community.',
        image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop',
        hoursVolunteered: 200,
    },
    {
        id: '3',
        title: 'Youth Mentorship Program',
        date: '2025-09-01',
        description: 'Monthly mentorship sessions with local high school students, focusing on college preparation and leadership skills.',
        image: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&h=400&fit=crop',
        hoursVolunteered: 80,
    },
    {
        id: '4',
        title: 'Campus Cleanup Day',
        date: '2025-04-22',
        description: 'Earth Day initiative to beautify our campus and surrounding neighborhoods.',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop',
        hoursVolunteered: 60,
    },
    {
        id: '5',
        title: '5K Charity Run',
        date: '2025-03-15',
        description: 'Annual charity run supporting Children\'s Hope Foundation, raising over $15,000.',
        image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop',
        hoursVolunteered: 150,
    },
    {
        id: '6',
        title: 'Holiday Toy Drive',
        date: '2024-12-10',
        description: 'Collected and distributed toys to over 200 children in underprivileged communities.',
        image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&h=400&fit=crop',
        hoursVolunteered: 100,
    },
];

export const impactStats = {
    totalHours: 2500,
    eventsHosted: 24,
    moneyRaised: 50000,
    communitiesServed: 15,
    partnersWorkedWith: 12,
    studentsmentored: 75,
};

export const upcomingEvents: PhilanthropyEvent[] = [
    {
        id: '7',
        title: 'Spring Beach Cleanup',
        date: '2026-03-20',
        description: 'Join us for our annual beach cleanup at Ocean State Park. All supplies provided.',
        image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&h=400&fit=crop',
    },
    {
        id: '8',
        title: 'Children\'s Hospital Visit',
        date: '2026-02-14',
        description: 'Valentine\'s Day visit to the local children\'s hospital to spread joy and cheer.',
        image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&h=400&fit=crop',
    },
];
