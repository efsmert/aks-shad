import { Brother, BrotherStatus, CoopStatus, createSlug } from '@/types';

// Helper to create brother entries
function createBrother(
    id: number,
    name: string,
    coopStatus: CoopStatus,
    status: BrotherStatus,
    major: string,
    graduationYear: number | null,
    hometown: string | null,
    pledgeClass: string,
    positions?: string[],
    currentYear: string | null = null
): Brother {
    return {
        id: String(id),
        name,
        slug: createSlug(name),
        coopStatus,
        status,
        major,
        graduationYear,
        hometown,
        pledgeClass,
        positions,
        currentYear,
    };
}

export const brothers: Brother[] = [
    // F26 Brotherhood Mastersheet, main roster (page 1). Attendance tabs are historical.
    createBrother(1, "Adrian Patel", "Co-op", "Active", "Mechanical Engineering and Physics", 2029, "Boston, MA", "S25", ["Vice President"], "Third"),
    createBrother(2, "Aidan Gowadia", "Classes", "Active", "International Business and Finance", 2028, "Berwyn, PA", "F25", [], "Third"),
    createBrother(56, "Aidan Rivas", "Classes", "Active", "Mechanical Engineering", 2029, "Providence, RI", "S26", ["Grand Marshall"], "Second"),
    createBrother(47, "Aiden Benson-Armer", "Classes", "Active", "International Business", 2026, "New York City", "S23", [], "Fifth"),
    createBrother(57, "Akarsh Subramaniam", "Classes", "Active", "Finance", 2028, "Cupertino, CA", "S26", [], "Second"),
    createBrother(58, "Alexander Finch", "Classes", "Active", "Computer Science and Business Administration", 2029, "Tampa, FL", "S26", [], "Second"),
    createBrother(3, "Alexander Heyman", "Classes", "Active", "Business Administration (Finance Concentration)", 2028, "San Francisco, CA", "F25", [], "Third"),
    createBrother(48, "Andrew Murphy", "Classes", "Active", "Business Administration (Finance Concentration)", 2027, "Falls Church, VA", "S23", [], "Fifth"),
    createBrother(4, "Anthony Min", "Classes", "Active", "Economics", 2026, "Seoul", "S23", [], "Fifth"),
    createBrother(5, "Anukrit Sharma", "Co-op", "Active", "Computer Engineering and Computer Science", 2028, "Aldie, VA", "F25", [], "Third"),
    createBrother(59, "Arnav Deshpande", "Classes", "Active", "Computer Science and Business Administration", 2029, "Wisconsin", "S26", [], "Second"),
    createBrother(6, "Arya Venkat", "Not Sure", "Active", "Computer Science", 2028, null, "S25", [], "Third"),
    createBrother(7, "Blake Curl", "Classes", "Active", "Business Administration", 2029, "Boulder, CO", "F25", [], "Second"),
    createBrother(60, "Brian Miller", "Classes", "Active", "Business Administration", 2028, "Alexandria", "S26", [], "Third"),
    createBrother(61, "Caden Bell", "Classes", "Active", "International Business and Finance", 2029, "Boulder, CO", "S26", ["Alumni Outreach and Engagement"], "Third"),
    createBrother(62, "Cem Yilmaz", "Classes", "Active", "Business Administration", 2028, "Izmir, Turkey", "S26", [], "Third"),
    createBrother(54, "Charlie Rubin", "Co-op", "Active", "Computer Science and Business Administration (Finance and Entrepreneurial Startups Concentrations)", 2028, "Cedar Rapids, IA", "F24", [], "Third"),
    createBrother(9, "Chase Myers", "Classes", "Active", "Computer Engineering", 2029, "Broomfield, CO", "F25", ["Treasurer"], "Second"),
    createBrother(11, "Daschel Knuff", "Co-op", "Active", "Music Technology", 2027, null, "S25", [], "Fourth"),
    createBrother(13, "Diego Froehner", "Classes", "Active", "Health Science", 2028, "Potomac, MD", "F25", [], "Third"),
    createBrother(63, "Ethan Cin Chung", "Classes", "Active", "Cellular and Molecular Biology", 2029, "Manhattan, NY", "S26", ["Secretary"], "Second"),
    createBrother(64, "Ethan Liu", "Classes", "Active", "Cybersecurity", 2029, "Brooklyn, NY", "S26", [], "Second"),
    createBrother(50, "Étienne Griffon", "Classes", "Active", "Finance", 2027, "Upland, CA", "S24", ["Risk Manager", "SVP & Wellness (Head)"], "Fourth"),
    createBrother(14, "Finnian Groshek", "Classes", "Active", "Business Administration (Finance Concentration)", 2029, "Bethlehem, NH", "F25", ["Intramural (Head)"], "Second"),
    createBrother(15, "Gavin Sarno", "Not Sure", "Active", "Mechanical Engineering", 2027, "Whippany, NJ", "F24", [], "Fourth"),
    createBrother(17, "Griffin Fromm", "Co-op", "Active", "Business Administration and Psychology (Finance Concentration)", 2029, "Bethesda, MD", "F25", [], "Third"),
    createBrother(20, "Jaesuh Lee", "Co-op", "Active", "Mechanical Engineering", 2028, "Newton, MA", "F24", [], "Fourth"),
    createBrother(21, "Jake Wade", "Co-op", "Active", "Biology", 2027, "Glen Mills, PA", "F23", ["Pledgemaster"], "Fourth"),
    createBrother(22, "James Hughes", "Classes", "Active", "Civil Engineering", 2027, "Oradell, NJ", "F24", ["Dance Dad (Head)", "Philanthropy (Head)"], "Fourth"),
    createBrother(65, "Jason Rivilis", "Classes", "Active", "Mechanical Engineering", 2029, "Somers, Westchester", "S26", [], "Second"),
    createBrother(66, "Jory Leach", "Classes", "Active", "Economics and International Business", 2029, "Walnut Creek, CA", "S26", ["Dance Dad"], "Second"),
    createBrother(67, "Kai Mehlman", "Classes", "Active", "Environmental and Sustainability Sciences", 2028, "Northampton, MA", "S26", [], null),
    createBrother(24, "Karan Doshi", "Not Sure", "Active", "Economics and Business Administration", 2027, "Mumbai", "F24", [], "Fourth"),
    createBrother(25, "Kareem Fawaz", "Not Sure", "Active", "Computer Science (Artificial Intelligence)", 2027, "Agoura Hills, CA", "F25", ["Merch (Head)"], "Fourth"),
    createBrother(26, "Liam Collins", "Not Sure", "Active", "Biology", 2028, null, "S25", [], "Third"),
    createBrother(27, "Luca Bastide-Weissman", "Not Sure", "Active", "Business Administration", 2028, null, "S25", [], "Third"),
    createBrother(68, "Marcus Ashcraft", "Classes", "Active", "Mechanical Engineering", 2028, "Darien, CT", "S26", [], "Third"),
    createBrother(28, "Max Klayman", "Co-op", "Active", "International Business, Finance, and Journalism", 2027, "Mendham, NJ", "S24", ["President", "Social Media (Head)"], "Fourth"),
    createBrother(29, "Mohammad Yaseen", "Classes", "Active", "International Business Management", 2028, "New Hyde Park, NY / Bangladesh", "F25", ["Social Programming (Head)"], "Third"),
    createBrother(30, "Oscar Chen", "Classes", "Active", "Business Administration", 2027, "Winchester, MA", "F24", [], "Fourth"),
    createBrother(31, "Perry Yung", "Classes", "Active", "Finance and Accounting", 2027, "West Greenwich, RI", "F24", [], "Fourth"),
    createBrother(33, "Philippe Jansen-Kollerie", "Co-op", "Inactive", "Mechanical Engineering", 2028, "Coppet", "F24", [], "Third"),
    createBrother(34, "Ryan Marshall", "Classes", "Active", "Computer Science", 2029, "Scarborough, ME", "F25", ["Webmaster"], "Second"),
    createBrother(35, "Sami Areski", "Not Sure", "Active", "Computer Science", 2028, "Kingston, MA", "F24", ["Webmaster (Head)"], "Third"),
    createBrother(36, "Sawyer Carlson", "Classes", "Active", "Mechanical Engineering", 2028, "Monroe, CT", "F25", [], "Second"),
    createBrother(69, "Sebastian Bujarski", "Classes", "Active", "Mechanical Engineering", 2029, "Lyme, NH", "S26", [], "Second"),
    createBrother(38, "Sebastian Kalus", "Co-op", "Active", "Politics, Philosophy, and Economics", 2027, "Shanghai, China", "S24", ["Alumni Outreach and Engagement (Head)", "Ritual (Head)"], "Fourth"),
    createBrother(70, "Shawnuk Ballal", "Classes", "Active", "Marketing and Psychology", 2029, "San Jose, CA", "S26", [], "Second"),
    createBrother(39, "Simon Fleischer", "Classes", "Active", "Business Administration", 2027, "Ossining, NY", "F22", [], "Fifth"),
    createBrother(40, "Stephen Huang", "Classes", "Active", "Industrial Engineering and Business Administration", 2028, "Woodcliff Lake, NJ", "F24", ["Dance Dad"], "Third"),
    createBrother(71, "Tanay Das", "Classes", "Active", "Nursing", 2028, "Stoughton", "S26", [], "Third"),
    createBrother(41, "Thaddeus (Teddy) Curry", "Classes", "Active", "Explore", 2029, "San Francisco, CA", "F25", ["Brotherhood Engagement (Head)"], "Second"),
    createBrother(55, "Willis Donaghy", "Co-op", "Active", "Economics and Business Administration", 2027, "Lake Oswego, OR", "F24", [], "Fourth"),
    createBrother(44, "Zac Meyer", "Co-op", "Active", "Business Administration", 2026, "Seattle", "F23", [], "Fifth"),
    createBrother(46, "Zachary Cohen", "Co-op", "Active", "Business Administration and Political Science", 2027, "New York City", "S24", ["Formal (Head)"], "Fourth"),
    createBrother(10, "Conor Brennan", "Co-op", "Inactive", "Business Administration (Finance and Accounting Concentrations); Data Science Minor", 2027, "Winchester, MA", "S24", [], "Fourth"),
    createBrother(49, "Daniyal Khalid", "Not Sure", "Inactive", "", null, null, "S23", [], "Fifth"),
    createBrother(12, "David Fridman", "Classes", "Inactive", "Business Administration (Business Analytics Concentration)", 2028, "Weston, CT", "F25", ["Community Service (Head)"], "Third"),
    createBrother(19, "Jack Edwards", "Co-op", "Inactive", "Business Administration", 2027, null, "S25", [], "Fourth"),
    createBrother(32, "Peter Lin", "Classes", "Inactive", "Business Administration", 2028, "Los Angeles", "F24", [], "Fourth"),
    createBrother(37, "Sebastian de la Torre", "Co-op", "Inactive", "Economics and Business Administration", 2027, "Mexico City, Mexico", "S24", [], "Fourth"),
    createBrother(51, "TJ Kalapatapu", "Classes", "Inactive", "Data Science", 2027, "Fremont, CA", "S24", [], "Fourth"),
    createBrother(45, "Zachary Banin", "Co-op", "Inactive", "Business Administration (Marketing Concentration)", 2028, "Miami", "F24", [], "Third"),

    // Absent from the F26 roster; retained as graduated brothers.
    createBrother(8, 'Carter Horiye', 'Classes', 'Graduated', 'Business Administration', 2026, 'San Diego', 'F22'),
    createBrother(16, 'Gencay Padir', 'Classes', 'Graduated', 'Business Administration (Supply Chain Management Concentration)', 2026, 'Westborough, MA', 'F22'),
    createBrother(18, 'Henrik Zahl-Batlle', 'Classes', 'Graduated', 'Mechanical Engineering', 2026, 'Bethlehem', 'S22'),
    createBrother(23, 'John Rotondo', 'Classes', 'Graduated', 'Computer Science and Business Administration', 2026, 'Arlington, VA', 'F22'),
    createBrother(42, 'Walter Goodenough', 'Classes', 'Graduated', 'Mechanical Engineering', 2026, 'Southington, CT', 'F21'),
    createBrother(43, 'Xavier Galanes', 'Classes', 'Graduated', 'Computer Science', 2026, 'Kirkland', 'S23'),
    createBrother(52, 'Cameron Lee', 'Classes', 'Graduated', 'Economics', 2026, 'Larchmont', 'S23'),
    createBrother(53, 'Jason Lo', 'Co-op', 'Graduated', 'Undeclared', 2026, null, 'S23'),
];

// Get unique pledge classes for filtering
export const getPledgeClasses = (): string[] => {
    const classes = [...new Set(brothers.map(b => b.pledgeClass))];
    return classes.sort((a, b) => {
        // Sort by year then season (F before S in same year)
        const yearA = parseInt(a.slice(1));
        const yearB = parseInt(b.slice(1));
        if (yearA !== yearB) return yearA - yearB;
        return a.charAt(0) === 'F' ? -1 : 1;
    });
};

// Get active brothers only
export const getActiveBrothers = (): Brother[] => {
    return brothers.filter(b => b.status === 'Active');
};

// Get inactive brothers
export const getInactiveBrothers = (): Brother[] => {
    return brothers.filter(b => b.status === 'Inactive' || b.status === 'Maybe');
};

// Get brother by ID
export const getBrotherById = (id: string): Brother | undefined => {
    return brothers.find(b => b.id === id);
};

// Role priority map - lower number = higher priority
const ROLE_PRIORITY: Record<string, number> = {
    'President': 1,
    'Vice President': 2,
    'Secretary': 3,
    'Treasurer': 4,
    'New Member Educator': 5,
    'Pledgemaster': 5,
    'Ritual': 9,
    'Brotherhood Engagement': 10,
    'Philanthropy': 11,
    'Community Service': 12,
    'Alumni Outreach and Engagement': 15,
    'Formal': 17,
    'SVP & Wellness': 20,
    'Merch': 21,
    'Dance Dad': 22,
    'Risk Manager': 6,
    'Webmaster': 7,
    'Grand Marshall': 8,
    'Ritual Chair': 9,
    'Brotherhood Engagement Chair': 10,
    'Philanthropy Chair': 11,
    'Community Service Chair': 12,
    'Social Programming Chair': 13,
    'Social Programming': 14,
    'Alumni Outreach Chair': 15,
    'SEC Chair': 16,
    'Formal Chair': 17,
    'Social Media Chair': 18,
    'Social Media': 19,
    'SVP & Wellness Chair': 20,
    'Merch Chair': 21,
    'Dance': 22,
    'French Chair (Head of Heads)': 23,
    'Intramural': 24,
};

// Get the highest priority role for a brother (lowest number)
const getBrotherRolePriority = (brother: Brother): number => {
    if (!brother.positions || brother.positions.length === 0) {
        return 999; // No role = lowest priority
    }

    const priorities = brother.positions.map(pos => {
        const isHead = pos.endsWith(' (Head)');
        const rolePriority = ROLE_PRIORITY[pos.replace(/ \(Head\)$/, '')] ?? 100;
        // Preserve the role hierarchy, placing each chair's head before its members.
        return rolePriority * 2 + (isHead ? 0 : 1);
    });
    return Math.min(...priorities);
};

const normalizeSearch = (value: string): string =>
    value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

// Filter and sort brothers
export const filterBrothers = (
    searchQuery: string,
    pledgeClass: string,
    statusFilter: string
): Brother[] => {
    const query = normalizeSearch(searchQuery).trim();
    const filtered = brothers.filter(brother => {
        const matchesSearch = query === '' ||
            [brother.name, brother.major, brother.hometown ?? ''].some(value =>
                normalizeSearch(value).includes(query));

        const matchesPledgeClass = pledgeClass === 'all' || brother.pledgeClass === pledgeClass;

        const matchesStatus = (statusFilter === 'all' && brother.status !== 'Graduated') ||
            (statusFilter === 'graduated' && brother.status === 'Graduated') ||
            (statusFilter === 'active' && brother.status === 'Active') ||
            (statusFilter === 'inactive' && (brother.status === 'Inactive' || brother.status === 'Maybe')) ||
            (statusFilter === 'coop' && brother.status !== 'Graduated' && brother.coopStatus === 'Co-op');

        return matchesSearch && matchesPledgeClass && matchesStatus;
    });

    // Sort by: 1) Active status, 2) Role priority, 3) Alphabetical name
    return filtered.sort((a, b) => {
        // Inactive/Maybe members always come last
        const aInactive = a.status === 'Inactive' || a.status === 'Maybe';
        const bInactive = b.status === 'Inactive' || b.status === 'Maybe';

        if (aInactive && !bInactive) return 1;
        if (!aInactive && bInactive) return -1;

        // Sort by role priority
        const aPriority = getBrotherRolePriority(a);
        const bPriority = getBrotherRolePriority(b);

        if (aPriority !== bPriority) {
            return aPriority - bPriority;
        }

        // Same role priority, sort alphabetically by name
        return a.name.localeCompare(b.name);
    });
};

const brotherPhotoVersions: Record<string, string> = JSON.parse(
    process.env.NEXT_PUBLIC_BROTHER_PHOTO_VERSIONS || '{}'
);

// All portrait consumers share the same content version, including the modal.
export const getBrotherPhotoPath = (slug: string): string => {
    const version = brotherPhotoVersions[slug];
    return `/brothers/${slug}.png${version ? `?v=${version}` : ''}`;
};
