import { Metadata } from 'next';
import { BrotherGrid } from '@/components/brothers/BrotherGrid';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { brothers } from '@/data/brothers';

export const metadata: Metadata = {
    title: 'Our Brothers | Alpha Kappa Sigma',
    description: 'Meet the brothers of Alpha Kappa Sigma. Our diverse membership represents the best and brightest, united by brotherhood.',
};

export default function BrothersPage() {
    return (
        <div className="pt-32 pb-24 px-4">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    title="Our Brothers"
                    subtitle="Meet the men who make Alpha Kappa Sigma exceptional. From leaders to scholars, each brother brings something unique to our chapter."
                />

                <div className="mt-12">
                    <BrotherGrid brothers={brothers} />
                </div>
            </div>
        </div>
    );
}
