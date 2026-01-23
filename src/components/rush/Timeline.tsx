'use client';

import { motion } from 'framer-motion';
import { RUSH_EVENTS } from '@/lib/constants';
import { Timeline as SharedTimeline } from '@/components/shared/Timeline';
import { SectionHeading } from '@/components/shared/SectionHeading';

// Convert RUSH_EVENTS to the shared Timeline format
const timelineEvents = RUSH_EVENTS.map(event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    time: event.time,
    location: event.location,
}));

export function Timeline() {
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

                <SharedTimeline
                    events={timelineEvents}
                    showProgress
                    dateFormat="date"
                    showMetadata
                    showCompletedStatus
                />
            </div>
        </section>
    );
}
