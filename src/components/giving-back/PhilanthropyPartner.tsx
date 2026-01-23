'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Heart, Music, Calendar, Users } from 'lucide-react';
import { MATT_FISHMAN_SCHOLARSHIP, PHILANTHROPY_PARTNERS } from '@/lib/constants';
import { fishFestEvents } from '@/data/philanthropy';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { Button } from '@/components/ui/button';

export function PhilanthropyPartner() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const impactItems = [
        { value: MATT_FISHMAN_SCHOLARSHIP.impact.totalRaised, label: 'Raised', prefix: '$', suffix: '+' },
        { value: MATT_FISHMAN_SCHOLARSHIP.impact.scholarshipYears, label: 'Years Funded', suffix: '+' },
        { value: MATT_FISHMAN_SCHOLARSHIP.impact.guestsReached, label: 'Guests Reached', suffix: '' },
    ];

    return (
        <section ref={ref} className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    title="The Matt Fishman Scholarship"
                    subtitle="Honoring our brother's memory through music and supporting students impacted by cancer."
                />

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate={isInView ? 'animate' : 'initial'}
                    className="mt-16 space-y-8"
                >
                    {/* Main scholarship card */}
                    <motion.div
                        variants={fadeInUp}
                        className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-green-card to-green-dark-bg border border-green-accent/10 relative overflow-hidden"
                    >
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-green-accent/5 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-green-primary/10 blur-3xl" />

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            {/* Content */}
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-secondary to-green-accent flex items-center justify-center shadow-lg shadow-green-accent/20">
                                        <Heart className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-2xl font-bold text-white">
                                            {MATT_FISHMAN_SCHOLARSHIP.name}
                                        </h3>
                                        <p className="text-green-light/60 text-sm">{MATT_FISHMAN_SCHOLARSHIP.subtitle}</p>
                                    </div>
                                </div>

                                <p className="text-green-light/80 text-lg leading-relaxed mb-6">
                                    {MATT_FISHMAN_SCHOLARSHIP.description}
                                </p>

                                <p className="text-green-light/70 leading-relaxed mb-8">
                                    {MATT_FISHMAN_SCHOLARSHIP.about}
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href={MATT_FISHMAN_SCHOLARSHIP.links.scholarship}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button className="bg-gradient-to-r from-green-secondary to-green-accent hover:shadow-lg hover:shadow-green-accent/30 transition-all duration-300">
                                            View Scholarship
                                            <ExternalLink className="w-4 h-4 ml-2" />
                                        </Button>
                                    </a>
                                    <a
                                        href={MATT_FISHMAN_SCHOLARSHIP.links.neuArticle}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button variant="outline" className="border-green-accent/30 text-green-light hover:bg-green-accent/10">
                                            Read NEU Article
                                            <ExternalLink className="w-4 h-4 ml-2" />
                                        </Button>
                                    </a>
                                </div>
                            </div>

                            {/* Impact stats */}
                            <div className="space-y-6">
                                <div className="grid grid-cols-3 gap-4">
                                    {impactItems.map((item) => (
                                        <div
                                            key={item.label}
                                            className="p-4 rounded-2xl bg-green-dark-bg/50 border border-green-accent/10 text-center"
                                        >
                                            <div className="text-2xl md:text-3xl font-display font-bold text-gradient mb-1">
                                                <AnimatedCounter end={item.value} prefix={item.prefix} suffix={item.suffix} />
                                            </div>
                                            <p className="text-green-light/60 text-xs font-medium uppercase tracking-wide">
                                                {item.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Fish Fest history */}
                                <div className="p-6 rounded-2xl bg-green-dark-bg/30 border border-green-accent/10">
                                    <h4 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Music className="w-5 h-5 text-green-accent" />
                                        Fish Fest History
                                    </h4>
                                    <div className="space-y-3">
                                        {fishFestEvents.map((event) => (
                                            <div key={event.id} className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-3.5 h-3.5 text-green-accent/70" />
                                                    <span className="text-green-light/70">{event.season}</span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-green-accent font-semibold">
                                                        ${event.amountRaised.toLocaleString()}
                                                    </span>
                                                    <span className="text-green-light/50 flex items-center gap-1">
                                                        <Users className="w-3 h-3" />
                                                        {event.guests}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Partner organizations */}
                    <motion.div variants={fadeInUp}>
                        <h3 className="font-display text-xl font-semibold text-white mb-6 text-center">
                            Our Community Partners
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {PHILANTHROPY_PARTNERS.map((partner) => (
                                <a
                                    key={partner.name}
                                    href={partner.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group p-6 rounded-2xl bg-green-card border border-green-accent/10 hover:border-green-accent/30 transition-all duration-300"
                                >
                                    <h4 className="font-semibold text-white mb-2 group-hover:text-green-accent transition-colors">
                                        {partner.name}
                                    </h4>
                                    <p className="text-green-light/60 text-sm leading-relaxed">
                                        {partner.description}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
