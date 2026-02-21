'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { impactStats } from '@/data/philanthropy';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';

const stats = [
    { value: impactStats.totalHours, label: 'Volunteer Hours', suffix: '+' },
    { value: impactStats.eventsHosted, label: 'Events Hosted', suffix: '' },
    { value: impactStats.moneyRaised, label: 'Raised for Charity', prefix: '$', suffix: '+' },
    { value: impactStats.communitiesServed, label: 'Communities Served', suffix: '' },
    { value: impactStats.partnersWorkedWith, label: 'Partner Organizations', suffix: '' },
    { value: impactStats.studentsmentored, label: 'Students Mentored', suffix: '+' },
];

export function ImpactStats() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <section ref={ref} className="py-20 lg:py-24 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate={isInView ? 'animate' : 'initial'}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
                >
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.label}
                            variants={fadeInUp}
                            className="text-center"
                        >
                            <div className="text-2xl lg:text-3xl font-display font-bold text-heritage-900 mb-1 tabular-nums">
                                <AnimatedCounter
                                    end={stat.value}
                                    prefix={stat.prefix}
                                    suffix={stat.suffix}
                                />
                            </div>
                            <p className="text-stone-500 text-xs font-medium uppercase tracking-wide">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
