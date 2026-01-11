import { Metadata } from 'next';
import { PhilanthropyHero } from '@/components/giving-back/PhilanthropyHero';
import { ImpactStats } from '@/components/giving-back/ImpactStats';
import { PhilanthropyPartner } from '@/components/giving-back/PhilanthropyPartner';
import { EventsCarousel } from '@/components/giving-back/EventsCarousel';

export const metadata: Metadata = {
    title: 'Giving Back | Alpha Kappa Sigma',
    description: 'Alpha Kappa Sigma is committed to serving our community. Learn about our philanthropy efforts, volunteer work, and the impact we make.',
};

export default function GivingBackPage() {
    return (
        <>
            <PhilanthropyHero />
            <ImpactStats />
            <PhilanthropyPartner />
            <EventsCarousel />
        </>
    );
}
