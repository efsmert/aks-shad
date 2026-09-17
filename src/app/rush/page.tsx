import type { Metadata } from 'next';
import { RushHero } from '@/components/rush/RushHero';
import { WhyJoin } from '@/components/rush/WhyJoin';
import { Timeline } from '@/components/rush/Timeline';
import { RushFAQ } from '@/components/rush/RushFAQ';
import { RushContact } from '@/components/rush/RushContact';

export const metadata: Metadata = {
    title: 'Rush ΑΚΣ | Alpha Kappa Sigma',
    description: 'Rush Alpha Kappa Sigma at Northeastern University. Join events, meet brothers, and start your journey.',
};

export default function RushPage() {
    return (
        <div className="min-h-screen">
            <RushHero />
            <WhyJoin />
            <Timeline />
            <RushFAQ />
            <RushContact />
        </div>
    );
}
