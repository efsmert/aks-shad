import Link from 'next/link';
import { CrestStudio as Studio } from '@/components/home/CrestStudio';

export const metadata = { title: 'Crest Studio | Alpha Kappa Sigma' };

export default function CrestStudio() {
    return <section className="crest-studio-page">
        <Link href="/">← Back to the website</Link>
        <p className="eyebrow">THE CHAPTER MARK / IN THREE DIMENSIONS</p>
        <h1>Cast in gold.</h1>
        <p className="crest-studio-intro">Explore the chapter mark and experiment with light and material.</p>
        <Studio />
    </section>;
}
