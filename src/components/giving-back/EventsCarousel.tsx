'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { philanthropyEvents, upcomingEvents } from '@/data/philanthropy';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function EventsCarousel() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="py-24 lg:py-32 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    title="Service Events"
                    subtitle="From local volunteering to community-wide initiatives, see how we give back."
                />

                <Tabs defaultValue="past" className="mt-12">
                    <TabsList className="flex w-fit bg-stone-100 rounded-sm">
                        <TabsTrigger
                            value="past"
                            className="data-[state=active]:bg-heritage-900 data-[state=active]:text-white text-stone-600 px-6 py-2 text-sm font-medium rounded-sm transition-colors"
                        >
                            Past Events
                        </TabsTrigger>
                        <TabsTrigger
                            value="upcoming"
                            className="data-[state=active]:bg-heritage-900 data-[state=active]:text-white text-stone-600 px-6 py-2 text-sm font-medium rounded-sm transition-colors"
                        >
                            Upcoming
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="past" className="mt-8">
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            animate={isInView ? 'animate' : 'initial'}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {philanthropyEvents.map((event) => (
                                <motion.div key={event.id} variants={fadeInUp}>
                                    <EventCard event={event} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="upcoming" className="mt-8">
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {upcomingEvents.map((event) => (
                                <motion.div key={event.id} variants={fadeInUp}>
                                    <EventCard event={event} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}

interface EventCardProps {
    event: {
        id: string;
        title: string;
        date: string;
        description: string;
        image: string;
        hoursVolunteered?: number;
    };
}

function EventCard({ event }: EventCardProps) {
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className="group">
            <div className="relative aspect-[3/2] overflow-hidden rounded-sm mb-4">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out-quart group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </div>
            <p className="text-stone-500 text-xs uppercase tracking-wider mb-2">
                {formattedDate}
                {event.hoursVolunteered && (
                    <span className="ml-3 text-gold-600">{event.hoursVolunteered}h volunteered</span>
                )}
            </p>
            <h3 className="font-display text-lg font-bold text-heritage-900 mb-2 group-hover:text-gold-700 transition-colors duration-200">
                {event.title}
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
                {event.description}
            </p>
        </div>
    );
}
