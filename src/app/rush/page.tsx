import { Metadata } from 'next';
import { RushHero } from '@/components/rush/RushHero';
import { WhyJoin } from '@/components/rush/WhyJoin';
import { Timeline } from '@/components/rush/Timeline';
import { RushFAQ } from '@/components/rush/RushFAQ';
import { InterestForm } from '@/components/rush/InterestForm';

export const metadata: Metadata = {
    title: 'Rush ΑΚΣ | Alpha Kappa Sigma',
    description: 'Ready to join Alpha Kappa Sigma? Learn about our rush process, upcoming events, and register your interest to become part of our brotherhood.',
};

export default function RushPage() {
    return (
        <>
            <RushHero />
            <WhyJoin />
            <Timeline />
            <RushFAQ />
            <InterestForm />
        </>
    );
}
