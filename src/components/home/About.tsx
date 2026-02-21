'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function About() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="py-24 lg:py-32 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate={isInView ? 'animate' : 'initial'}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12"
                >
                    {/* Left column — editorial heading */}
                    <motion.div variants={fadeInUp} className="lg:col-span-5">
                        <div className="section-divider mb-6" />
                        <h2 className="font-display text-section font-bold text-heritage-900 mb-6">
                            Our Legacy
                        </h2>
                        <p className="text-stone-500 text-lg leading-relaxed">
                            Founded in 1919 at Northeastern University, Alpha Kappa Sigma has been
                            building brotherhood, developing leaders, and creating lifelong
                            connections for over a century.
                        </p>
                    </motion.div>

                    {/* Right column — body text, asymmetric */}
                    <motion.div variants={fadeInUp} className="lg:col-span-7 lg:pt-4">
                        <div className="space-y-6">
                            <p className="text-stone-600 text-lg leading-relaxed">
                                Since our founding in 1919 at Northeastern University, Alpha Kappa Sigma
                                has been more than just a fraternity—we&apos;re a brotherhood built on
                                camaraderie, leadership, and lifelong connections.
                            </p>
                            <p className="text-stone-600 text-lg leading-relaxed">
                                Our members come from diverse backgrounds, united by shared values and a
                                commitment to excellence in academics, service, personal growth, as well
                                as the advancement of kindred sympathy.
                            </p>
                            <p className="text-stone-600 text-lg leading-relaxed">
                                Whether we&apos;re organizing campus events, giving back to the community,
                                or simply enjoying time together, the bonds we forge here last a lifetime.
                                Get to know the brothers who make AKΣ what it is today.
                            </p>
                        </div>

                        {/* Inline quote */}
                        <motion.blockquote
                            initial={{ opacity: 0, y: 12 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                            className="mt-10 pl-6 border-l-2 border-gold-600"
                        >
                            <p className="text-heritage-800 text-xl font-display italic leading-relaxed">
                                &ldquo;The advancement of kindred sympathy—genuine care and understanding
                                that strengthens our lifelong connections.&rdquo;
                            </p>
                            <cite className="block text-stone-500 text-sm mt-3 not-italic">
                                — Founding principle, 1919
                            </cite>
                        </motion.blockquote>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
