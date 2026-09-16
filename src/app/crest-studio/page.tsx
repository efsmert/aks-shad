import Link from 'next/link';
import Crest3D from '@/components/home/Crest3D';

export const metadata = { title: 'Crest Studio | Alpha Kappa Sigma' };

export default function CrestStudio() {
    return <section className="crest-studio-page">
        <Link href="/">← Back to the website</Link>
        <p className="eyebrow">THE CHAPTER MARK / IN THREE DIMENSIONS</p>
        <h1>Cast in gold.</h1>
        <p className="crest-studio-intro">Our lion and letters, sculpted into a reflective metal relief.</p>
        <Crest3D studio />
    </section>;
}
