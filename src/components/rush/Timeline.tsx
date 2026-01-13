'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Calendar, Clock, MapPin } from 'lucide-react';
import { RUSH_EVENTS } from '@/lib/constants';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { timelineNode } from '@/lib/animations';

export function Timeline() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="rush-events" ref={ref} className="py-24 px-4 relative">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-primary/5 to-transparent" />

            <div className="max-w-4xl mx-auto relative z-10">
                <SectionHeading
                    title="Rush Schedule"
                    subtitle="Mark your calendar for these can't-miss events."
                />

                <div className="mt-16 relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-green-accent via-green-secondary to-green-primary" />

                    {/* Events */}
                    <div className="space-y-12">
                        {RUSH_EVENTS.map((event, index) => {
                            const isLeft = index % 2 === 0;
                            const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                            });

                            return (
                                <motion.div
                                    key={event.id}
                                    custom={index}
                                    variants={timelineNode}
                                    initial="hidden"
                                    animate={isInView ? 'visible' : 'hidden'}
                                    className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Timeline node */}
                                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                                        <motion.div
                                            whileHover={{ scale: 1.2 }}
                                            className={`w-4 h-4 rounded-full border-4 ${event.isPast
                                                ? 'bg-green-accent border-green-accent'
                                                : 'bg-green-dark-bg border-green-accent'
                                                }`}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div
                                        className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-12' : 'md:pl-12'
                                            }`}
                                    >
                                        <motion.div
                                            whileHover={{ y: -4 }}
                                            className="p-6 rounded-2xl bg-green-card border border-green-accent/10 transition-all duration-300 hover:border-green-accent/30 hover:shadow-lg hover:shadow-green-accent/10"
                                        >
                                            {/* Date badge */}
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-accent/10 text-green-accent text-sm font-medium mb-4">
                                                <Calendar className="w-3 h-3" />
                                                {formattedDate}
                                            </div>

                                            <h3 className="font-display text-xl font-bold text-white mb-2">
                                                {event.title}
                                            </h3>

                                            <p className="text-green-light/70 text-sm mb-4">
                                                {event.description}
                                            </p>

                                            <div className="flex flex-wrap gap-4 text-sm">
                                                <div className="flex items-center gap-1.5 text-green-light/60">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {event.time}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-green-light/60">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    {event.location}
                                                </div>
                                            </div>

                                            {event.isPast && (
                                                <div className="mt-4 flex items-center gap-1.5 text-green-accent text-sm">
                                                    <Check className="w-4 h-4" />
                                                    Completed
                                                </div>
                                            )}
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
