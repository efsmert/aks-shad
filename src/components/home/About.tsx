'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CHAPTER_STATS } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function About() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const stats = [
        { value: CHAPTER_STATS.foundingYear, label: 'Year Founded', prefix: '', formatNumber: false },
        { value: CHAPTER_STATS.activeBrothers, label: 'Active Brothers', suffix: '+' },
        { value: CHAPTER_STATS.totalChapters, label: 'Chapters Nationwide', suffix: '+' },
        { value: CHAPTER_STATS.alumni, label: 'Alumni', suffix: '+' },
    ];

    return (
        <section ref={ref} className="py-24 px-4 relative">
            {/* Top gradient fade for seamless transition from previous section */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-green-dark-bg to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <SectionHeading
                    title="Our Legacy"
                    subtitle="Founded in 1919 at Northeastern University, Alpha Kappa Sigma has been building brotherhood, developing leaders, and creating lifelong connections for over a century."
                />

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate={isInView ? 'animate' : 'initial'}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16"
                >
                    {/* Text content */}
                    <motion.div variants={fadeInUp} className="space-y-6">
                        <p className="text-green-light/80 text-lg leading-relaxed">
                            Since our founding in 1919 at Northeastern University, Alpha Kappa Sigma has been more than just
                            a fraternity—we&apos;re a brotherhood built on camaraderie, leadership, and lifelong connections.
                        </p>
                        <p className="text-green-light/80 text-lg leading-relaxed">
                            Our members come from diverse backgrounds, united by shared values and a commitment to excellence
                            in academics, service, personal growth, as well as the advancement of kindred sympathy.
                        </p>
                        <p className="text-green-light/80 text-lg leading-relaxed">
                            Whether we&apos;re organizing campus events, giving back to the community, or just enjoying time
                            together, the bonds we forge here last a lifetime. Get to know the brothers who make AKΣ what it is today.
                        </p>
                    </motion.div>

                    {/* Stats grid */}
                    <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-6">
                        {stats.map((stat) => (
                            <motion.div
                                key={stat.label}
                                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(46, 204, 113, 0.2)' }}
                                className="p-6 rounded-2xl bg-green-card border border-green-accent/10 text-center transition-all duration-300"
                            >
                                <div className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">
                                    <AnimatedCounter
                                        end={stat.value}
                                        prefix={stat.prefix}
                                        suffix={stat.suffix}
                                        formatNumber={stat.formatNumber}
                                    />
                                </div>
                                <p className="text-green-light/70 text-sm">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom gradient fade for seamless transition to next section */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-dark-bg to-transparent pointer-events-none" />
        </section>
    );
}
