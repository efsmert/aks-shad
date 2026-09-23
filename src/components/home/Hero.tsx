'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { preload } from 'react-dom';
import { brothers } from '@/data/brothers';
import Crest3D from './Crest3D';

const reveal = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] as const },
};

export function Hero() {
    // Start fetching with the page, rather than waiting for the 3D effect to mount.
    preload('/models/aks-lion-relief-gold-smooth.glb', { as: 'fetch', crossOrigin: 'anonymous' });
    for (const beam of ['feed', 'key', 'teal', 'violet']) preload(`/effects/beam-${beam}.png`, { as: 'image' });
    const activeCount = brothers.filter(brother => brother.status === 'Active').length;

    return (
        <section className="home-hero">
            <div className="hero-light-beams" aria-hidden="true">
                <div className="hero-day-caustics" />
                <div className="hero-light-feed"><div className="hero-light-feed-texture" /></div>
                <div className="hero-light-fan">
                    <div className="crest-ray crest-ray--key" />
                    <div className="crest-ray crest-ray--teal" />
                    <div className="crest-ray crest-ray--violet" />
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="hero-composition">
                    <div className="hero-monogram" aria-hidden="true"><span>ΑΚΣ</span></div>
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
                    <div className="hero-emblem">
                        <div className="crest-stage">
                            <Crest3D />
                        </div>
                    </div>
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
