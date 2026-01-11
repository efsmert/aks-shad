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
        { value: CHAPTER_STATS.foundingYear, label: 'Year Founded', prefix: '' },
        { value: CHAPTER_STATS.activeBrothers, label: 'Active Brothers', suffix: '+' },
        { value: CHAPTER_STATS.totalChapters, label: 'Chapters Nationwide', suffix: '+' },
        { value: CHAPTER_STATS.alumni, label: 'Alumni Worldwide', suffix: '+' },
    ];

    return (
        <section ref={ref} className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    title="Our Legacy"
                    subtitle="For over a century, Alpha Kappa Sigma has been shaping leaders, building lifelong friendships, and making a difference in our communities."
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
                            Since our founding in 1892, Alpha Kappa Sigma has stood as a beacon of excellence in fraternal life.
                            Our brotherhood is built on the pillars of leadership, scholarship, and service - values that have
                            guided generations of brothers to success.
                        </p>
                        <p className="text-green-light/80 text-lg leading-relaxed">
                            Today, we continue to uphold these traditions while embracing the challenges of the modern world.
                            Our diverse membership represents the best and brightest, united by a common bond and a shared
                            commitment to making a positive impact.
                        </p>
                        <p className="text-green-light/80 text-lg leading-relaxed">
                            When you join Alpha Kappa Sigma, you&apos;re not just joining a fraternity - you&apos;re becoming part of a
                            legacy that spans continents and generations.
                        </p>
                    </motion.div>

                    {/* Stats grid */}
                    <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-6">
                        {stats.map((stat, index) => (
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
                                    />
                                </div>
                                <p className="text-green-light/70 text-sm">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
