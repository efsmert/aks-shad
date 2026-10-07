import type { Metadata } from 'next';
import { RushHero } from '@/components/rush/RushHero';
import { WhyJoin } from '@/components/rush/WhyJoin';
import { RushFAQ } from '@/components/rush/RushFAQ';
import { RushContact } from '@/components/rush/RushContact';

export const metadata: Metadata = {
    title: 'Rush ΑΚΣ | Alpha Kappa Sigma',
    description: 'Fall 2026 rush has concluded. Meet Alpha Kappa Sigma at Northeastern University and stay in touch for future rush announcements.',
};

export default function RushPage() {
    return (
        <div className="min-h-screen">
            <RushHero />
            <WhyJoin />
            <RushFAQ />
            <RushContact />
        </div>
    );
}
