'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { RUSH_EVENTS } from '@/lib/constants';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function Timeline() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <section id="rush-events" ref={ref} className="py-24 lg:py-32 px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <SectionHeading
                    title="Rush Schedule"
                    subtitle="Mark your calendar for these events."
                />

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate={isInView ? 'animate' : 'initial'}
                    className="mt-12 border-t border-stone-200"
                >
                    {RUSH_EVENTS.map((event) => (
                        <motion.div
                            key={event.id}
                            variants={fadeInUp}
                            className="grid grid-cols-12 gap-4 py-6 border-b border-stone-200 group"
                        >
                            <div className="col-span-4 lg:col-span-3">
                                <p className="font-display font-semibold text-heritage-900 text-sm">
                                    {formatDate(event.date)}
                                </p>
                                <p className="text-stone-500 text-xs mt-1">
                                    {event.time}
                                </p>
                            </div>
                            <div className="col-span-8 lg:col-span-9">
                                <h3 className="font-display text-base font-bold text-heritage-900 mb-1 group-hover:text-gold-700 transition-colors duration-200">
                                    {event.title}
                                </h3>
                                <p className="text-stone-600 text-sm leading-relaxed mb-1">
                                    {event.description}
                                </p>
                                <p className="text-stone-400 text-xs">
                                    {event.location}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
