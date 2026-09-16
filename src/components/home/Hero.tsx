'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { brothers } from '@/data/brothers';

const Crest3D = dynamic(() => import('./Crest3D'), { ssr: false });

const reveal = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] as const },
};

export function Hero() {
    const activeCount = brothers.filter(brother => brother.status === 'Active').length;

    return (
        <section className="home-hero">
            <div className="hero-light-beams" aria-hidden="true">
                <svg className="hero-light-fan" viewBox="0 0 1200 400" fill="none">
                    <defs>
                        <linearGradient id="crest-ray-gold"><stop stopColor="var(--beam-key, #f4d699)" /><stop offset=".3" stopColor="var(--beam-violet, #e5a69a)" stopOpacity=".6" /><stop offset=".7" stopColor="var(--beam-teal, #32dc9b)" stopOpacity=".2" /><stop offset="1" stopColor="var(--beam-key, #f4d699)" stopOpacity="0" /></linearGradient>
                        <linearGradient id="crest-ray-teal"><stop stopColor="var(--beam-teal, #32dc9b)" /><stop offset=".35" stopColor="var(--beam-key, #f4d699)" stopOpacity=".55" /><stop offset=".75" stopColor="var(--beam-violet, #e5a69a)" stopOpacity=".15" /><stop offset="1" stopColor="var(--beam-teal, #32dc9b)" stopOpacity="0" /></linearGradient>
                        <linearGradient id="crest-ray-violet"><stop stopColor="var(--beam-violet, #e5a69a)" /><stop offset=".3" stopColor="var(--beam-teal, #32dc9b)" stopOpacity=".5" /><stop offset=".7" stopColor="var(--beam-key, #f4d699)" stopOpacity=".18" /><stop offset="1" stopColor="var(--beam-violet, #e5a69a)" stopOpacity="0" /></linearGradient>
                        <filter id="crest-ray-soften" x="-10%" y="-50%" width="120%" height="200%"><feGaussianBlur stdDeviation="5" /></filter>
                    </defs>
                    <g filter="url(#crest-ray-soften)">
                        <path className="crest-ray crest-ray--key" d="M0 200 L1200 55 L1200 105 Z" fill="url(#crest-ray-gold)" />
                        <path className="crest-ray crest-ray--teal" d="M0 200 L1200 160 L1200 215 Z" fill="url(#crest-ray-teal)" />
                        <path className="crest-ray crest-ray--violet" d="M0 200 L1200 290 L1200 350 Z" fill="url(#crest-ray-violet)" />
                    </g>
                </svg>
            </div>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="hero-composition">
                    <motion.div {...reveal} className="hero-copy">
                        <p className="eyebrow"><span /> Northeastern University · Est. 1919</p>
                        <h1 className="hero-title">Alpha Kappa<br /><em>Sigma.</em></h1>
                        <p className="hero-principle">Advancement of Kindred Sympathy</p>
                        <p className="hero-description">A century of shared history. A lifetime of belonging.
                            Building lifelong bonds, developing leaders, and finding our place—together.</p>
                        <div className="flex flex-wrap gap-3 mt-8">
                            <Link href="/rush" className="action-primary">Explore rush <ArrowUpRight size={17} /></Link>
                            <Link href="/brothers" className="action-secondary">Meet the brothers <ArrowUpRight size={17} /></Link>
                        </div>
                    </motion.div>
                    <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.15 }} className="heritage-panel">
                        <div className="heritage-panel-top"><span>ALPHA KAPPA SIGMA</span><span>BOSTON, MA</span></div>
                        <div className="crest-stage">
                            <Crest3D />
                        </div>
                        <div className="heritage-panel-bottom"><span className="font-display">ΑΚΣ</span><p>Rooted in tradition.<br />Defined by our brothers.</p></div>
                    </motion.div>
                </div>
                <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.3 }} className="hero-stats">
                    {[
                        { value: '1919', label: 'Our founding year' },
                        { value: String(activeCount), label: 'Active brothers' },
                        { value: '500+', label: 'Alumni connections' },
                    ].map(stat => <div key={stat.label}><span>{stat.value}</span><p>{stat.label}</p></div>)}
                    <a href="#our-legacy" className="hero-scroll">Discover our story <ArrowDown size={16} /></a>
                </motion.div>
            </div>
        </section>
    );
}
