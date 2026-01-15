'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Calendar, DollarSign, Users, Handshake, GraduationCap } from 'lucide-react';
import { impactStats } from '@/data/philanthropy';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const stats = [
    {
        icon: Clock,
        value: impactStats.totalHours,
        label: 'Volunteer Hours',
        suffix: '+',
    },
    {
        icon: Calendar,
        value: impactStats.eventsHosted,
        label: 'Events Hosted',
        suffix: '',
    },
    {
        icon: DollarSign,
        value: impactStats.moneyRaised,
        label: 'Raised for Charity',
        prefix: '$',
        suffix: '+',
    },
    {
        icon: Users,
        value: impactStats.communitiesServed,
        label: 'Communities Served',
        suffix: '',
    },
    {
        icon: Handshake,
        value: impactStats.partnersWorkedWith,
        label: 'Partner Organizations',
        suffix: '',
    },
    {
        icon: GraduationCap,
        value: impactStats.studentsmentored,
        label: 'Students Mentored',
        suffix: '+',
    },
];

export function ImpactStats() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="py-24 px-4 relative">
            {/* Top gradient fade */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-green-dark-bg to-transparent pointer-events-none z-0" />

            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-primary/5 via-transparent to-green-primary/5" />

            <div className="max-w-7xl mx-auto relative z-10 pt-8">
                <SectionHeading
                    title="Our Impact"
                    subtitle="The numbers that represent our commitment to service and community."
                />

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate={isInView ? 'animate' : 'initial'}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-16"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            variants={fadeInUp}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="p-6 rounded-2xl bg-green-card border border-green-accent/10 text-center transition-all duration-300 hover:border-green-accent/30 hover:shadow-lg hover:shadow-green-accent/10"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-secondary to-green-accent flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-accent/20">
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">
                                <AnimatedCounter
                                    end={stat.value}
                                    prefix={stat.prefix}
                                    suffix={stat.suffix}
                                />
                            </div>
                            <p className="text-green-light/60 text-xs font-medium uppercase tracking-wide">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-dark-bg to-transparent pointer-events-none z-0" />
        </section>
    );
}
