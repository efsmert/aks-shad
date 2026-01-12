'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, GraduationCap, Heart, Trophy } from 'lucide-react';
import { VALUES } from '@/lib/constants';
import { fadeInUp, staggerContainer, cardHover } from '@/lib/animations';
import { SectionHeading } from '@/components/shared/SectionHeading';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Users,
    GraduationCap,
    Heart,
    Trophy,
};

export function Values() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="py-24 px-4 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-primary/5 to-transparent" />

            <div className="max-w-7xl mx-auto relative z-10">
                <SectionHeading
                    title="Our Values"
                    subtitle="The four pillars that define our brotherhood and commitment to excellence."
                />

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate={isInView ? 'animate' : 'initial'}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
                >
                    {VALUES.map((value, index) => {
                        const Icon = iconMap[value.icon] || Users;

                        return (
                            <motion.div
                                key={value.title}
                                variants={fadeInUp}
                                initial="rest"
                                whileHover="hover"
                                className="group relative"
                            >
                                <motion.div
                                    variants={cardHover}
                                    className="p-8 rounded-2xl bg-green-card border border-green-accent/10 h-full flex flex-col items-center text-center transition-colors duration-300 hover:border-green-accent/30"
                                >
                                    {/* Icon container */}
                                    <motion.div
                                        whileHover={{ rotate: 5, scale: 1.1 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-secondary to-green-accent flex items-center justify-center mb-6 shadow-lg shadow-green-accent/20"
                                    >
                                        <Icon className="w-8 h-8 text-white" />
                                    </motion.div>

                                    {/* Title */}
                                    <h3 className="font-display text-xl font-bold text-white mb-4">
                                        {value.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-green-light/70 text-sm leading-relaxed">
                                        {value.description}
                                    </p>

                                    {/* Hover glow effect */}
                                    <div className="absolute inset-0 rounded-2xl bg-green-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
