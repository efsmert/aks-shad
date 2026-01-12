import { Metadata } from 'next';
import { BrotherGrid } from '@/components/brothers/BrotherGrid';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { brothers } from '@/data/brothers';

export const metadata: Metadata = {
    title: 'Our Brothers | Alpha Kappa Sigma',
    description: 'Get to know the brothers of Alpha Kappa Sigma at Northeastern University. Our members come from diverse backgrounds, united by shared values and lifelong bonds.',
};

export default function BrothersPage() {
    return (
        <div className="pt-32 pb-24 px-4">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    title="Our Brothers"
                    subtitle="Get to know the brothers who make AKΣ what it is today. Our members come from diverse backgrounds, united by shared values and a commitment to excellence."
                />

                <div className="mt-12">
                    <BrotherGrid brothers={brothers} />
                </div>
            </div>
        </div>
    );
}
