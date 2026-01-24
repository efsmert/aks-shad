import { Metadata } from 'next';
import { RitualContent } from '@/components/ritual/RitualContent';

export const metadata: Metadata = {
    title: 'Ritual | Alpha Kappa Sigma',
    description: 'Brothers only section.',
};

export default function RitualPage() {
    return <RitualContent />;
}
