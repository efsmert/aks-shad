import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { Values } from '@/components/home/Values';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Values />
      <CTASection />
    </>
  );
}
