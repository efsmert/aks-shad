'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
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
        <section ref={ref} className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
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
                        <div className="relative">
                            {/* Scroll buttons */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => scroll('left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-green-card border border-green-accent/20 flex items-center justify-center text-white hover:bg-green-accent/20 transition-colors duration-300 shadow-lg hidden md:flex"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => scroll('right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-green-card border border-green-accent/20 flex items-center justify-center text-white hover:bg-green-accent/20 transition-colors duration-300 shadow-lg hidden md:flex"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </motion.button>

                            {/* Events scroll container */}
                            <div
                                ref={scrollRef}
                                className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {philanthropyEvents.map((event, index) => (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                        className="flex-shrink-0 w-80 snap-center"
                                    >
                                        <EventCard event={event} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="upcoming" className="mt-8">
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {upcomingEvents.map((event, index) => (
                                <motion.div key={event.id} variants={fadeInUp}>
                                    <UpcomingEventCard event={event} />
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
        <motion.div
            whileHover={{ y: -8 }}
            className="rounded-2xl bg-green-card border border-green-accent/10 overflow-hidden h-full transition-all duration-300 hover:border-green-accent/30 hover:shadow-lg hover:shadow-green-accent/10"
        >
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="320px"
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
                <p className="text-green-light/60 text-sm line-clamp-2">
                    {event.description}
                </p>
            </div>
        </motion.div>
    );
}

function UpcomingEventCard({ event }: EventCardProps) {
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="flex gap-6 p-6 rounded-2xl bg-green-card border border-green-accent/10 overflow-hidden transition-all duration-300 hover:border-green-accent/30"
        >
            <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="128px"
                />
            </div>
            <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 text-green-accent text-xs mb-2">
                    <Calendar className="w-3 h-3" />
                    {formattedDate}
                </div>
                <h3 className="font-display text-xl font-semibold text-white mb-2">
                    {event.title}
                </h3>
                <p className="text-green-light/60 text-sm">
                    {event.description}
                </p>
            </div>
        </motion.div>
    );
}
