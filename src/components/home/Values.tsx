'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { VALUES } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function Values() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="py-24 lg:py-32 bg-heritage-900 text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate={isInView ? 'animate' : 'initial'}
                >
                    {/* Section header */}
                    <motion.div variants={fadeInUp} className="mb-16 lg:mb-20">
                        <div className="w-12 h-[2px] bg-gold-600 mb-6" />
                        <h2 className="font-display text-section font-bold text-white mb-4">
                            Our Values
                        </h2>
                        <p className="text-heritage-300 text-lg max-w-xl">
                            The four pillars that define our brotherhood and shape every member&apos;s
                            journey through Alpha Kappa Sigma.
                        </p>
                    </motion.div>

                    {/* Values — stacked, not identical cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 lg:gap-y-16">
                        {VALUES.map((value, index) => (
                            <motion.div
                                key={value.title}
                                variants={fadeInUp}
                                className="group"
                            >
                                <div className="flex items-start gap-5">
                                    {/* Number — editorial index */}
                                    <span className="font-display text-5xl lg:text-6xl font-black text-heritage-800 tabular-nums select-none leading-none shrink-0">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <div className="pt-2">
                                        <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors duration-200">
                                            {value.title}
                                        </h3>
                                        <p className="text-heritage-300 leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
