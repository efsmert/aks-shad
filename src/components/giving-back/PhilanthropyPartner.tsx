'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { PHILANTHROPY_PARTNER } from '@/lib/constants';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Button } from '@/components/ui/button';

export function PhilanthropyPartner() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const impactItems = [
        { value: PHILANTHROPY_PARTNER.impact.childrenHelped, label: 'Children Helped' },
        { value: PHILANTHROPY_PARTNER.impact.scholarshipsAwarded, label: 'Scholarships Awarded' },
        { value: PHILANTHROPY_PARTNER.impact.mentorshipHours, label: 'Mentorship Hours' },
    ];

    return (
        <section ref={ref} className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    title="Our Philanthropy Partner"
                    subtitle="Together, we're making a lasting impact in the lives of children across the nation."
                />

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate={isInView ? 'animate' : 'initial'}
                    className="mt-16"
                >
                    <motion.div
                        variants={fadeInUp}
                        className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-green-card to-green-dark-bg border border-green-accent/10 relative overflow-hidden"
                    >
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-green-accent/5 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-green-primary/10 blur-3xl" />

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Content */}
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                                        <span className="text-3xl">❤️</span>
                                    </div>
                                    <div>
                                        <h3 className="font-display text-2xl font-bold text-white">
                                            {PHILANTHROPY_PARTNER.name}
                                        </h3>
                                        <p className="text-green-light/60 text-sm">National Philanthropy Partner</p>
                                    </div>
                                </div>

                                <p className="text-green-light/80 text-lg leading-relaxed mb-8">
                                    {PHILANTHROPY_PARTNER.description}
                                </p>

                                <motion.a
                                    href={PHILANTHROPY_PARTNER.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button className="bg-gradient-to-r from-green-secondary to-green-accent hover:shadow-lg hover:shadow-green-accent/30 transition-all duration-300">
                                        Learn More
                                        <ExternalLink className="w-4 h-4 ml-2" />
                                    </Button>
                                </motion.a>
                            </div>

                            {/* Impact stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {impactItems.map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        whileHover={{ y: -4 }}
                                        className="p-6 rounded-2xl bg-green-dark-bg/50 border border-green-accent/10 text-center"
                                    >
                                        <div className="text-3xl font-display font-bold text-gradient mb-2">
                                            <AnimatedCounter end={item.value} suffix="+" />
                                        </div>
                                        <p className="text-green-light/60 text-xs font-medium uppercase tracking-wide">
                                            {item.label}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
