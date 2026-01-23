export type BrotherStatus = 'Active' | 'Inactive' | 'Maybe';
export type CoopStatus = 'Classes' | 'Co-op';

export interface Brother {
    id: string;
    name: string;
    slug: string; // filename-friendly version of name for photo loading
    coopStatus: CoopStatus;
    status: BrotherStatus;
    major: string;
    graduationYear: number | null;
    hometown: string | null;
    pledgeClass: string; // e.g., "F24", "S25"
    positions?: string[]; // Executive/committee positions (e.g., "President", "SEC Chair")
}

export interface RushEvent {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
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

// Helper function to format pledge class
export function formatPledgeClass(pc: string): string {
    if (!pc) return '';
    const season = pc.charAt(0);
    const year = pc.slice(1);
    const fullYear = year.length === 2 ? `20${year}` : year;

    if (season === 'F') {
        return `Fall ${fullYear}`;
    } else if (season === 'S') {
        return `Spring ${fullYear}`;
    }
    return pc;
}

// Helper function to create slug from name (for photo filenames)
export function createSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[()]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
}
