export type BrotherRole =
    | 'president'
    | 'vice_president'
    | 'treasurer'
    | 'secretary'
    | 'rush_chair'
    | 'social_chair'
    | 'philanthropy_chair'
    | 'member'
    | 'alumni';

export interface Brother {
    id: string;
    firstName: string;
    lastName: string;
    compositePhoto: string;
    role: BrotherRole;
    pledgeClass: string;
    initiationYear: number;
    graduationYear?: number;
    major?: string;
    hometown?: string;
    quote?: string;
    linkedIn?: string;
    instagram?: string;
    isAlumni: boolean;
    isExecutiveBoard: boolean;
}

export interface RushEvent {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    isPast: boolean;
}

export interface PhilanthropyEvent {
    id: string;
    title: string;
    date: string;
    description: string;
    image: string;
    hoursVolunteered?: number;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
}

export interface NavLink {
    label: string;
    href: string;
}

export interface ValueCard {
    icon: string;
    title: string;
    description: string;
}
