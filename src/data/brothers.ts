import { Brother, createSlug } from '@/types';

// Helper to create brother entries
function createBrother(
    id: number,
    name: string,
    coopStatus: 'Classes' | 'Co-op',
    status: 'Active' | 'Inactive' | 'Maybe',
    major: string,
    graduationYear: number | null,
    hometown: string | null,
    pledgeClass: string,
    positions?: string[]
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
    };
}

export const brothers: Brother[] = [
    // Active Brothers
    createBrother(1, 'Adrian Patel', 'Classes', 'Active', 'Mechanical Engineering and Physics', 2029, 'Boston, MA', 'S25', ['Vice President']),
    createBrother(2, 'Aidan Gowadia', 'Co-op', 'Active', 'International Business and Finance', 2028, 'Berwyn, PA', 'F25'),
    createBrother(3, 'Alexander Heyman', 'Classes', 'Active', 'Data Science and Business: SCM', 2028, 'San Francisco, CA', 'F25'),
    createBrother(4, 'Anthony Min', 'Classes', 'Active', 'Economics', 2026, 'Seoul', 'S23'),
    createBrother(5, 'Anukrit Sharma', 'Classes', 'Active', 'Computer Engineering and Computer Science', 2028, 'Aldie, VA', 'F25', ['Secretary', 'Dance']),
    createBrother(6, 'Arya Venkat', 'Classes', 'Active', 'Computer Science', 2028, null, 'S25'),
    createBrother(7, 'Blake Curl', 'Classes', 'Active', 'Business Administration', 2029, 'Boulder, CO', 'F25'),
    createBrother(8, 'Carter Horiye', 'Classes', 'Active', 'Business Administration', 2026, 'San Diego', 'F22'),
    createBrother(9, 'Chase Myers', 'Classes', 'Active', 'Computer Engineering', 2029, 'Broomfield, CO', 'F25'),
    createBrother(10, 'Conor Brennan', 'Classes', 'Active', 'BA: Finance and Accounting with DS Minor', 2027, 'Winchester, MA', 'S24', ['Philanthropy Chair', 'Social Media', 'Social Programming']),
    createBrother(11, 'Daschel Knuff', 'Classes', 'Active', 'Music Technology', 2027, null, 'S25', ['Grand Marshall']),
    createBrother(12, 'David Fridman', 'Classes', 'Active', 'Business Administration: BAC', 2028, 'Weston, CT', 'F25', ['Community Service Chair']),
    createBrother(13, 'Diego Froehner', 'Classes', 'Active', 'Health Science', 2028, 'Potomac, MD', 'F25', ['Dance']),
    createBrother(14, 'Finnian Groshek', 'Classes', 'Active', 'Business Administration (Finance)', 2029, 'Bethlehem, NH', 'F25'),
    createBrother(15, 'Gavin Sarno', 'Classes', 'Active', 'Mechanical Engineering', 2027, 'Whippany, NJ', 'F24'),
    createBrother(16, 'Gencay Padir', 'Classes', 'Active', 'Business Administration, Supply Chain Management', 2026, 'Westborough, MA', 'F22', ['SEC Chair', 'Formal Chair']),
    createBrother(17, 'Griffin Fromm', 'Classes', 'Active', 'Business Administration (Finance) and Psychology', 2029, 'Bethesda, MD', 'F25'),
    createBrother(18, 'Henrik Zahl-Batlle', 'Classes', 'Active', 'Mechanical Engineering', 2026, 'Bethlehem', 'S22', ['Brotherhood Engagement Chair']),
    createBrother(19, 'Jack Edwards', 'Classes', 'Active', 'Business', 2027, null, 'S25'),
    createBrother(20, 'Jaesuh Lee', 'Classes', 'Active', 'Mechanical Engineering', 2028, 'Newton, MA', 'F24', ['Social Programming Chair']),
    createBrother(21, 'Jake Wade', 'Classes', 'Active', 'Biology', 2027, 'Glen Mills, PA', 'F23', ['Alumni Outreach Chair']),
    createBrother(22, 'James Hughes', 'Co-op', 'Active', 'Civil Engineering', 2027, 'Oradell, NJ', 'F24', ['Risk Manager']),
    createBrother(23, 'John Rotondo', 'Classes', 'Active', 'Computer Science and Business', 2026, 'Arlington, VA', 'F22'),
    createBrother(24, 'Karan Doshi', 'Classes', 'Active', 'Economics and Business', 2027, 'Mumbai', 'F24'),
    createBrother(25, 'Kareem Fawaz', 'Classes', 'Active', 'Computer Science (AI)', 2027, 'Agoura Hills, CA', 'F25'),
    createBrother(26, 'Liam Collins', 'Classes', 'Active', 'Biology', 2028, null, 'S25'),
    createBrother(27, 'Luca Bastide-Weissman', 'Classes', 'Active', 'Business Administration', 2028, null, 'S25'),
    createBrother(28, 'Max Klayman', 'Classes', 'Active', 'International Business, Finance, Journalism', 2027, 'Mendham, NJ', 'S24', ['President', 'Ritual Chair']),
    createBrother(29, 'Mohammad Yaseen', 'Classes', 'Active', 'International Business Management', 2028, 'New Hyde Park, NY', 'F25'),
    createBrother(30, 'Oscar Chen', 'Classes', 'Active', 'Business Administration', 2027, 'Winchester, MA', 'F24', ['Brotherhood Engagement Chair']),
    createBrother(31, 'Perry Yung', 'Co-op', 'Active', 'Finance and Accounting', 2027, 'West Greenwich, RI', 'F24', ['Social Media Chair']),
    createBrother(32, 'Peter Lin', 'Classes', 'Active', 'Business Administration', 2028, 'Los Angeles', 'F24'),
    createBrother(33, 'Philippe Jansen-Kollerie', 'Classes', 'Active', 'Mechanical Engineering', 2028, 'Coppet', 'F24', ['Pledgemaster']),
    createBrother(34, 'Ryan Marshall', 'Classes', 'Active', 'Computer Science', 2029, 'Scarborough, ME', 'F25', ['Webmaster']),
    createBrother(35, 'Sami Areski', 'Classes', 'Active', 'Computer Science', 2028, 'Kingston, MA', 'F24', ['Webmaster']),
    createBrother(36, 'Sawyer Carlson', 'Co-op', 'Active', 'Mechanical Engineering', 2028, 'Monroe, CT', 'F25', ['SVP & Wellness Chair']),
    createBrother(37, 'Sebastian de la Torre', 'Classes', 'Active', 'Economics and Business Administration', 2027, 'Mexico City, Mexico', 'S24'),
    createBrother(38, 'Sebastian Kalus', 'Classes', 'Active', 'Politics, Philosophy & Economics', 2027, 'Shanghai, China', 'S24', ['Treasurer']),
    createBrother(39, 'Simon Fleischer', 'Co-op', 'Active', 'Business Administration', 2027, 'Ossining, NY', 'F22', ['Ritual Chair']),
    createBrother(40, 'Stephen Huang', 'Co-op', 'Active', 'Industrial Engineering and Business Administration', 2028, 'Woodcliff Lake, NJ', 'F24', ['Merch Chair', 'Dance']),
    createBrother(41, 'Thaddeus (Teddy) Curry', 'Classes', 'Active', 'Explore', 2029, 'San Francisco, CA', 'F25'),
    createBrother(42, 'Walter Goodenough', 'Classes', 'Active', 'Mechanical Engineering', 2026, 'Southington, CT', 'F21'),
    createBrother(43, 'Xavier Galanes', 'Classes', 'Active', 'Computer Science', 2026, 'Kirkland', 'S23'),
    createBrother(44, 'Zac Meyer', 'Classes', 'Active', 'Business', 2026, 'Seattle', 'F23'),
    createBrother(45, 'Zachary Banin', 'Classes', 'Active', 'Business Administration: Marketing', 2028, 'Miami', 'F24'),
    createBrother(46, 'Zachary Cohen', 'Classes', 'Active', 'Business Administration & Political Science', 2027, 'New York City', 'S24'),

    // Inactive Brothers
    createBrother(47, 'Aiden Benson-Armer', 'Co-op', 'Inactive', 'International Business', 2026, 'New York City', 'S23'),
    createBrother(48, 'Andrew Murphy', 'Co-op', 'Inactive', 'Business Admin: Finance', 2027, 'Falls Church, VA', 'S23'),
    createBrother(49, 'Daniyal Khalid', 'Classes', 'Inactive', 'Undeclared', null, null, 'S23'),
    createBrother(50, 'Étienne Griffon', 'Co-op', 'Inactive', 'Finance', 2027, 'Upland, CA', 'S24', ['French Chair (Head of Heads)']),
    createBrother(51, 'Tj Kalapatapu', 'Classes', 'Inactive', 'Data Science', 2027, 'Fremont, CA', 'S24'),
    createBrother(52, 'Cameron Lee', 'Classes', 'Inactive', 'Economics', 2026, 'Larchmont', 'S23'),
    createBrother(53, 'Jason Lo', 'Co-op', 'Inactive', 'Undeclared', 2026, null, 'S23'),

    // Maybe Status
    createBrother(54, 'Charlie Rubin', 'Classes', 'Maybe', 'Computer Science and Business Administration', 2028, 'Cedar Rapids, IA', 'F24'),
    createBrother(55, 'Willis Donaghy', 'Classes', 'Maybe', 'Business and Economics', 2027, 'Lake Oswego, OR', 'F24'),
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
    'SVP & Wellness Chair': 3,
    'Secretary': 4,
    'Treasurer': 5,
    'Pledgemaster': 6,
    'Risk Manager': 7,
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
    'Webmaster': 20,
    'Merch Chair': 21,
    'Dance': 22,
    'French Chair (Head of Heads)': 23,
};

// Get the highest priority role for a brother (lowest number)
const getBrotherRolePriority = (brother: Brother): number => {
    if (!brother.positions || brother.positions.length === 0) {
        return 999; // No role = lowest priority
    }

    const priorities = brother.positions.map(pos => ROLE_PRIORITY[pos] ?? 100);
    return Math.min(...priorities);
};

// Filter and sort brothers
export const filterBrothers = (
    searchQuery: string,
    pledgeClass: string,
    statusFilter: string
): Brother[] => {
    const filtered = brothers.filter(brother => {
        const matchesSearch = searchQuery === '' ||
            brother.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            brother.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (brother.hometown?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

        const matchesPledgeClass = pledgeClass === 'all' || brother.pledgeClass === pledgeClass;

        const matchesStatus = statusFilter === 'all' ||
            (statusFilter === 'active' && brother.status === 'Active') ||
            (statusFilter === 'inactive' && (brother.status === 'Inactive' || brother.status === 'Maybe')) ||
            (statusFilter === 'coop' && brother.coopStatus === 'Co-op');

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

// Get photo path for a brother (returns placeholder if not found)
export const getBrotherPhotoPath = (slug: string): string => {
    return `/brothers/${slug}.png`;
};
