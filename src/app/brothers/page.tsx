import type { Metadata } from 'next';
import { brothers } from '@/data/brothers';
import { BrotherGrid } from '@/components/brothers/BrotherGrid';
import { BrothersHero } from '@/components/brothers/BrothersHero';
import { DirectoryFog } from '@/components/brothers/DirectoryFog';

export const metadata: Metadata = {
    title: 'Our Brothers | Alpha Kappa Sigma',
    description: 'Meet the brothers of Alpha Kappa Sigma at Northeastern University.',
};

export default function BrothersPage() {
    return (
        <div className="directory-page min-h-screen">
            <DirectoryFog />
            <BrothersHero />

            {/* Grid */}
            <section className="pb-24 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <BrotherGrid brothers={brothers} />
                </div>
            </section>
        </div>
    );
}
