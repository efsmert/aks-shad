'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
import { philanthropyEvents, upcomingEvents } from '@/data/philanthropy';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function EventsCarousel() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 400;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section ref={ref} className="py-24 px-4 relative">
            {/* Top gradient fade */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-green-dark-bg to-transparent pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto relative z-10">
                <SectionHeading
                    title="Service Events"
                    subtitle="From local volunteering to nationwide initiatives, see how we give back."
                />

                <Tabs defaultValue="past" className="mt-12">
                    <TabsList className="mx-auto flex w-fit bg-green-card border border-green-accent/20">
                        <TabsTrigger
                            value="past"
                            className="data-[state=active]:bg-green-accent data-[state=active]:text-white text-green-light/70 px-6"
                        >
                            Past Events
                        </TabsTrigger>
                        <TabsTrigger
                            value="upcoming"
                            className="data-[state=active]:bg-green-accent data-[state=active]:text-white text-green-light/70 px-6"
                        >
                            Upcoming
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="past" className="mt-8">
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            animate={isInView ? 'animate' : 'initial'}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-dark-bg to-transparent pointer-events-none z-0" />
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
        <div className="rounded-2xl bg-green-card border border-green-accent/10 overflow-hidden h-full">
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-card to-transparent" />
                {event.hoursVolunteered && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-accent/90 text-white text-xs font-medium">
                        <Clock className="w-3 h-3" />
                        {event.hoursVolunteered} hours
                    </div>
                )}
            </div>
            <div className="p-5">
                <div className="flex items-center gap-2 text-green-accent text-xs mb-2">
                    <Calendar className="w-3 h-3" />
                    {formattedDate}
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">
                    {event.title}
                </h3>
                <p className="text-green-light/60 text-sm leading-relaxed">
                    {event.description}
                </p>
            </div>
        </div>
    );
}
