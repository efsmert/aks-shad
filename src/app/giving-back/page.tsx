import type { Metadata } from 'next';
import { PhilanthropyHero } from '@/components/giving-back/PhilanthropyHero';
import { ImpactStats } from '@/components/giving-back/ImpactStats';
import { PhilanthropyPartner } from '@/components/giving-back/PhilanthropyPartner';
import { EventsCarousel } from '@/components/giving-back/EventsCarousel';

export const metadata: Metadata = {
    title: 'Giving Back | Alpha Kappa Sigma',
    description: 'Discover how Alpha Kappa Sigma gives back through Fish Fest and community service.',
};

export default function GivingBackPage() {
    return (
        <div className="min-h-screen">
            <PhilanthropyHero />
            <ImpactStats />
            <PhilanthropyPartner />
            <EventsCarousel />
        </div>
    );
}
