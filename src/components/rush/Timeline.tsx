'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Check, Calendar, Clock, MapPin } from 'lucide-react';
import { RUSH_EVENTS } from '@/lib/constants';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function Timeline() {
    // Calculate timeline progress based on current date
    const progressPercentage = useMemo(() => {
        const now = new Date();
        const eventDates = RUSH_EVENTS.map(e => new Date(e.date));
        const firstEventDate = eventDates[0];
        const lastEventDate = eventDates[eventDates.length - 1];

        // Before first event
        if (now < firstEventDate) {
            return 0;
        }

        // After last event
        if (now > lastEventDate) {
            return 100;
        }

        // Find which events have passed and calculate position
        let passedEvents = 0;
        for (let i = 0; i < eventDates.length; i++) {
            if (now >= eventDates[i]) {
                passedEvents = i + 1;
            }
        }

        // Calculate percentage based on events passed
        // Each event represents a segment of the timeline
        const totalEvents = RUSH_EVENTS.length;
        const baseProgress = (passedEvents / totalEvents) * 100;

        // Add partial progress to next event if we're between events
        if (passedEvents < totalEvents) {
            const currentEventDate = eventDates[passedEvents - 1];
            const nextEventDate = eventDates[passedEvents];
            const timeBetweenEvents = nextEventDate.getTime() - currentEventDate.getTime();
            const timeSinceCurrentEvent = now.getTime() - currentEventDate.getTime();
            const partialProgress = (timeSinceCurrentEvent / timeBetweenEvents) * (100 / totalEvents);
            return Math.min(baseProgress + partialProgress, 100);
        }

        return baseProgress;
    }, []);

    return (
        <section id="rush-events" className="py-24 bg-green-card/30">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <SectionHeading
                        title="Rush Schedule"
                        subtitle="Mark your calendar for these can't-miss events."
                    />
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Timeline line - background (unfilled) */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-green-accent/20 transform md:-translate-x-1/2" />

                    {/* Timeline line - progress (filled) */}
                    <motion.div
                        className="absolute left-8 md:left-1/2 top-0 w-1 bg-gradient-to-b from-green-accent via-green-accent to-green-secondary transform md:-translate-x-1/2 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${progressPercentage}%` }}
                        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                        viewport={{ once: true }}
                    />

                    {RUSH_EVENTS.map((event, index) => {
                        const isEven = index % 2 === 0;
                        const eventDate = new Date(event.date);
                        const isPast = new Date() >= eventDate;
                        const formattedDate = eventDate.toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                        });

                        return (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`relative flex items-center gap-8 mb-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Timeline dot */}
                                <div className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 z-10 transition-all duration-300 ${isPast
                                    ? 'bg-green-accent shadow-[0_0_8px_rgba(45,212,191,0.6)]'
                                    : 'bg-green-accent/30 border border-green-accent/50'
                                    }`} />

                                {/* Content */}
                                <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                    <div className={`bg-green-card border border-green-accent/20 rounded-xl p-6 ${isEven ? 'md:ml-auto' : ''
                                        } max-w-md`}>
                                        <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                            <div className="w-10 h-10 rounded-lg bg-green-accent/10 flex items-center justify-center">
                                                <Calendar className="w-5 h-5 text-green-accent" />
                                            </div>
                                            <span className="text-green-accent font-display font-bold text-lg">
                                                {formattedDate}
                                            </span>
                                        </div>
                                        <h3 className="text-white font-semibold text-lg mb-2">{event.title}</h3>
                                        <p className="text-green-light/60 text-sm leading-relaxed mb-3">{event.description}</p>
                                        
                                        <div className={`flex flex-wrap gap-4 text-sm ${isEven ? 'md:justify-end' : ''}`}>
                                            <div className="flex items-center gap-1.5 text-green-light/60">
                                                <Clock className="w-3.5 h-3.5" />
                                                {event.time}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-green-light/60">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {event.location}
                                            </div>
                                        </div>

                                        {isPast && (
                                            <div className={`mt-3 flex items-center gap-1.5 text-green-accent text-sm ${isEven ? 'md:justify-end' : ''}`}>
                                                <Check className="w-4 h-4" />
                                                Completed
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
