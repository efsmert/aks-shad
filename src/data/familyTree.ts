/**
 * Family Tree Data for AKΣ
 * 
 * Each entry represents a brother and their "big" (mentor).
 * To add a new person:
 * 1. Add their name to a FamilyMember entry
 * 2. Set their bigName to their big's name (or null if unknown)
 * 3. Set brotherId to match their ID in brothers.ts (or null if not in system)
 * 
 * The tree will automatically build the hierarchy based on big/little relationships.
 */

export interface FamilyMember {
    /** Display name */
    name: string;
    /** Name of their big (null if unknown or founder) */
    bigName: string | null;
    /** Brother ID from brothers.ts (null if alumni/unknown) */
    brotherId: string | null;
    /** Pledge class (for display) */
    pledgeClass?: string;
    /** Graduation year */
    graduationYear?: number | null;
}

/**
 * FAMILY TREE DATA
 * 
 * Edit this array to update the family tree.
 * Format: { name, bigName, brotherId, pledgeClass?, graduationYear? }
 * 
 * brotherId should match the ID in brothers.ts for active/known brothers.
 * Set brotherId to null for alumni or people not in the brothers list.
 */
export const familyTreeData: FamilyMember[] = [
    // ═══════════════════════════════════════════════════════════════
    // FOUNDERS / UNKNOWN LINEAGE (bigName = null)
    // ═══════════════════════════════════════════════════════════════
    { name: 'Unknown Founder', bigName: null, brotherId: null, pledgeClass: 'Founders' },
    
    // ═══════════════════════════════════════════════════════════════
    // SAMPLE LINEAGE - Replace with actual data
    // ═══════════════════════════════════════════════════════════════
    
    // Generation 1 (from Unknown Founder)
    { name: 'Alumni Big 1', bigName: 'Unknown Founder', brotherId: null, pledgeClass: 'F19', graduationYear: 2023 },
    { name: 'Alumni Big 2', bigName: 'Unknown Founder', brotherId: null, pledgeClass: 'F19', graduationYear: 2023 },
    
    // Generation 2
    { name: 'Alumni Middle 1', bigName: 'Alumni Big 1', brotherId: null, pledgeClass: 'F20', graduationYear: 2024 },
    { name: 'Alumni Middle 2', bigName: 'Alumni Big 2', brotherId: null, pledgeClass: 'F20', graduationYear: 2024 },
    
    // ═══════════════════════════════════════════════════════════════
    // CURRENT BROTHERS - Link to brothers.ts via brotherId
    // ═══════════════════════════════════════════════════════════════
    
    // F21 - Oldest active class
    { name: 'Walter Goodenough', bigName: 'Alumni Middle 1', brotherId: '42', pledgeClass: 'F21', graduationYear: 2026 },
    
    // S22
    { name: 'Henrik Zahl-Batlle', bigName: 'Walter Goodenough', brotherId: '18', pledgeClass: 'S22', graduationYear: 2026 },
    
    // F22
    { name: 'Carter Horiye', bigName: 'Henrik Zahl-Batlle', brotherId: '8', pledgeClass: 'F22', graduationYear: 2026 },
    { name: 'Gencay Padir', bigName: 'Alumni Middle 2', brotherId: '16', pledgeClass: 'F22', graduationYear: 2026 },
    { name: 'John Rotondo', bigName: 'Walter Goodenough', brotherId: '23', pledgeClass: 'F22', graduationYear: 2026 },
    { name: 'Simon Fleischer', bigName: 'Henrik Zahl-Batlle', brotherId: '39', pledgeClass: 'F22', graduationYear: 2027 },
    
    // S23
    { name: 'Anthony Min', bigName: 'Simon Fleischer', brotherId: '4', pledgeClass: 'S23', graduationYear: 2026 },
    { name: 'Xavier Galanes', bigName: 'John Rotondo', brotherId: '43', pledgeClass: 'S23', graduationYear: 2026 },
    { name: 'Aiden Benson-Armer', bigName: 'Carter Horiye', brotherId: '47', pledgeClass: 'S23', graduationYear: 2026 },
    { name: 'Andrew Murphy', bigName: 'Gencay Padir', brotherId: '48', pledgeClass: 'S23', graduationYear: 2027 },
    { name: 'Cameron Lee', bigName: 'Simon Fleischer', brotherId: '52', pledgeClass: 'S23', graduationYear: 2026 },
    { name: 'Jason Lo', bigName: 'John Rotondo', brotherId: '53', pledgeClass: 'S23', graduationYear: 2026 },
    
    // F23
    { name: 'Jake Wade', bigName: 'Anthony Min', brotherId: '21', pledgeClass: 'F23', graduationYear: 2027 },
    { name: 'Zac Meyer', bigName: 'Xavier Galanes', brotherId: '44', pledgeClass: 'F23', graduationYear: 2026 },
    
    // S24
    { name: 'Conor Brennan', bigName: 'Jake Wade', brotherId: '10', pledgeClass: 'S24', graduationYear: 2027 },
    { name: 'Max Klayman', bigName: 'Simon Fleischer', brotherId: '28', pledgeClass: 'S24', graduationYear: 2027 },
    { name: 'Sebastian de la Torre', bigName: 'Anthony Min', brotherId: '37', pledgeClass: 'S24', graduationYear: 2027 },
    { name: 'Sebastian Kalus', bigName: 'Zac Meyer', brotherId: '38', pledgeClass: 'S24', graduationYear: 2027 },
    { name: 'Zachary Cohen', bigName: 'Jake Wade', brotherId: '46', pledgeClass: 'S24', graduationYear: 2027 },
    { name: 'Etienne Griffon', bigName: 'Andrew Murphy', brotherId: '50', pledgeClass: 'S24', graduationYear: 2027 },
    { name: 'Tj Kalapatapu', bigName: 'Gencay Padir', brotherId: '51', pledgeClass: 'S24', graduationYear: 2027 },
    
    // F24
    { name: 'Gavin Sarno', bigName: 'Conor Brennan', brotherId: '15', pledgeClass: 'F24', graduationYear: 2027 },
    { name: 'Jaesuh Lee', bigName: 'Max Klayman', brotherId: '20', pledgeClass: 'F24', graduationYear: 2028 },
    { name: 'James Hughes', bigName: 'Sebastian de la Torre', brotherId: '22', pledgeClass: 'F24', graduationYear: 2027 },
    { name: 'Karan Doshi', bigName: 'Sebastian Kalus', brotherId: '24', pledgeClass: 'F24', graduationYear: 2027 },
    { name: 'Oscar Chen', bigName: 'Zachary Cohen', brotherId: '30', pledgeClass: 'F24', graduationYear: 2027 },
    { name: 'Perry Yung', bigName: 'Conor Brennan', brotherId: '31', pledgeClass: 'F24', graduationYear: 2027 },
    { name: 'Peter Lin', bigName: 'Max Klayman', brotherId: '32', pledgeClass: 'F24', graduationYear: 2028 },
    { name: 'Philippe Jansen-Kollerie', bigName: 'James Hughes', brotherId: '33', pledgeClass: 'F24', graduationYear: 2028 },
    { name: 'Sami Areski', bigName: 'Jaesuh Lee', brotherId: '35', pledgeClass: 'F24', graduationYear: 2028 },
    { name: 'Stephen Huang', bigName: 'Oscar Chen', brotherId: '40', pledgeClass: 'F24', graduationYear: 2028 },
    { name: 'Zachary Banin', bigName: 'Perry Yung', brotherId: '45', pledgeClass: 'F24', graduationYear: 2028 },
    { name: 'Charlie Rubin', bigName: 'Karan Doshi', brotherId: '54', pledgeClass: 'F24', graduationYear: 2028 },
    { name: 'Willis Donaghy', bigName: 'Gavin Sarno', brotherId: '55', pledgeClass: 'F24', graduationYear: 2027 },
    
    // S25
    { name: 'Adrian Patel', bigName: 'Philippe Jansen-Kollerie', brotherId: '1', pledgeClass: 'S25', graduationYear: 2029 },
    { name: 'Arya Venkat', bigName: 'Sami Areski', brotherId: '6', pledgeClass: 'S25', graduationYear: 2028 },
    { name: 'Daschel Knuff', bigName: 'Stephen Huang', brotherId: '11', pledgeClass: 'S25', graduationYear: 2027 },
    { name: 'Jack Edwards', bigName: 'Zachary Banin', brotherId: '19', pledgeClass: 'S25', graduationYear: 2027 },
    { name: 'Liam Collins', bigName: 'Charlie Rubin', brotherId: '26', pledgeClass: 'S25', graduationYear: 2028 },
    { name: 'Luca Bastide-Weissman', bigName: 'Willis Donaghy', brotherId: '27', pledgeClass: 'S25', graduationYear: 2028 },
    
    // F25
    { name: 'Aidan Gowadia', bigName: 'Adrian Patel', brotherId: '2', pledgeClass: 'F25', graduationYear: 2028 },
    { name: 'Alexander Heyman', bigName: 'Arya Venkat', brotherId: '3', pledgeClass: 'F25', graduationYear: 2028 },
    { name: 'Anukrit Sharma', bigName: 'Daschel Knuff', brotherId: '5', pledgeClass: 'F25', graduationYear: 2028 },
    { name: 'Blake Curl', bigName: 'Jack Edwards', brotherId: '7', pledgeClass: 'F25', graduationYear: 2029 },
    { name: 'Chase Myers', bigName: 'Liam Collins', brotherId: '9', pledgeClass: 'F25', graduationYear: 2029 },
    { name: 'David Fridman', bigName: 'Luca Bastide-Weissman', brotherId: '12', pledgeClass: 'F25', graduationYear: 2028 },
    { name: 'Diego Froehner', bigName: 'Adrian Patel', brotherId: '13', pledgeClass: 'F25', graduationYear: 2028 },
    { name: 'Finnian Groshek', bigName: 'Arya Venkat', brotherId: '14', pledgeClass: 'F25', graduationYear: 2029 },
    { name: 'Griffin Fromm', bigName: 'Anukrit Sharma', brotherId: '17', pledgeClass: 'F25', graduationYear: 2029 },
    { name: 'Kareem Fawaz', bigName: 'Blake Curl', brotherId: '25', pledgeClass: 'F25', graduationYear: 2027 },
    { name: 'Mohammad Yaseen', bigName: 'Chase Myers', brotherId: '29', pledgeClass: 'F25', graduationYear: 2028 },
    { name: 'Ryan Marshall', bigName: 'David Fridman', brotherId: '34', pledgeClass: 'F25', graduationYear: 2029 },
    { name: 'Sawyer Carlson', bigName: 'Diego Froehner', brotherId: '36', pledgeClass: 'F25', graduationYear: 2028 },
    { name: 'Thaddeus (Teddy) Curry', bigName: 'Finnian Groshek', brotherId: '41', pledgeClass: 'F25', graduationYear: 2029 },
];

/**
 * Build a tree structure from the flat family data
 */
export interface TreeNode {
    member: FamilyMember;
    children: TreeNode[];
}

export function buildFamilyTree(data: FamilyMember[]): TreeNode[] {
    const membersByName = new Map<string, FamilyMember>();
    const childrenByBig = new Map<string, FamilyMember[]>();
    
    // Index all members
    data.forEach(member => {
        membersByName.set(member.name, member);
        
        if (member.bigName) {
            const siblings = childrenByBig.get(member.bigName) || [];
            siblings.push(member);
            childrenByBig.set(member.bigName, siblings);
        }
    });
    
    // Build tree recursively
    function buildNode(member: FamilyMember): TreeNode {
        const children = childrenByBig.get(member.name) || [];
        return {
            member,
            children: children
                .sort((a, b) => {
                    // Sort by pledge class, then alphabetically
                    if (a.pledgeClass && b.pledgeClass && a.pledgeClass !== b.pledgeClass) {
                        return a.pledgeClass.localeCompare(b.pledgeClass);
                    }
                    return a.name.localeCompare(b.name);
                })
                .map(child => buildNode(child)),
        };
    }
    
    // Find root nodes (members with no big or unknown big)
    const roots = data.filter(m => !m.bigName);
    
    return roots.map(root => buildNode(root));
}

/**
 * Get all descendants of a member (for highlighting lineages)
 */
export function getDescendants(tree: TreeNode[], memberName: string): string[] {
    const descendants: string[] = [];
    
    function findAndCollect(nodes: TreeNode[], found: boolean): boolean {
        for (const node of nodes) {
            const isTarget = node.member.name === memberName;
            const inPath = found || isTarget;
            
            if (inPath && !isTarget) {
                descendants.push(node.member.name);
            }
            
            if (isTarget) {
                // Collect all children
                collectAll(node.children);
                return true;
            }
            
            if (findAndCollect(node.children, false)) {
                return true;
            }
        }
        return false;
    }
    
    function collectAll(nodes: TreeNode[]) {
        for (const node of nodes) {
            descendants.push(node.member.name);
            collectAll(node.children);
        }
    }
    
    findAndCollect(tree, false);
    return descendants;
}

/**
 * Get the lineage path from root to a member
 */
export function getLineagePath(data: FamilyMember[], memberName: string): string[] {
    const path: string[] = [];
    const membersByName = new Map<string, FamilyMember>();
    
    data.forEach(m => membersByName.set(m.name, m));
    
    let current = membersByName.get(memberName);
    while (current) {
        path.unshift(current.name);
        current = current.bigName ? membersByName.get(current.bigName) : undefined;
    }
    
    return path;
}
