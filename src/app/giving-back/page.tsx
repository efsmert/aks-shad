import type { Metadata } from 'next';
import { PhilanthropyHero } from '@/components/giving-back/PhilanthropyHero';
import { ImpactStats } from '@/components/giving-back/ImpactStats';
import { PhilanthropyPartner } from '@/components/giving-back/PhilanthropyPartner';
import { EventsCarousel } from '@/components/giving-back/EventsCarousel';
import { Fishman5K } from '@/components/giving-back/Fishman5K';

export const metadata: Metadata = {
    title: 'Giving Back | Alpha Kappa Sigma',
    description: 'Join Alpha Kappa Sigma for the Fishman 5K on October 25, 2026, and discover how we give back through Fish Fest and community service.',
};

export default function GivingBackPage() {
    return (
        <div className="min-h-screen">
            <PhilanthropyHero />
            <Fishman5K />
            <ImpactStats />
            <PhilanthropyPartner />
            <EventsCarousel />
        </div>
    );
}
