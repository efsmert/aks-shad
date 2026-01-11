'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Award, Heart, PartyPopper } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const benefits = [
    {
        icon: Users,
        title: 'Brotherhood',
        description: 'Form lifelong friendships with men who share your values and aspirations. Your brothers will be there through every challenge and celebration.',
    },
    {
        icon: Award,
        title: 'Leadership',
        description: 'Develop essential skills through chapter positions, campus involvement, and professional development opportunities.',
    },
    {
        icon: Heart,
        title: 'Service',
        description: 'Make a real difference in your community through meaningful volunteer work and philanthropy events.',
    },
    {
        icon: PartyPopper,
        title: 'Social Life',
        description: 'Enjoy an active social calendar including formals, mixers, philanthropy events, and brotherhood activities.',
    },
];

export function WhyJoin() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    title="Why Join ΑΚΣ?"
                    subtitle="Being part of Alpha Kappa Sigma means gaining experiences and connections that last a lifetime."
                />

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate={isInView ? 'animate' : 'initial'}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16"
                >
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={benefit.title}
                            variants={fadeInUp}
                            whileHover={{ y: -8 }}
                            className="group relative p-8 rounded-2xl bg-green-card border border-green-accent/10 overflow-hidden transition-all duration-300 hover:border-green-accent/30"
                        >
                            {/* Background glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-green-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex gap-6">
                                <motion.div
                                    whileHover={{ rotate: 5, scale: 1.1 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-secondary to-green-accent flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-accent/20"
                                >
                                    <benefit.icon className="w-7 h-7 text-white" />
                                </motion.div>

                                <div>
                                    <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-green-light transition-colors duration-300">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-green-light/70 leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
