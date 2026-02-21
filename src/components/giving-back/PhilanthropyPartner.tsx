'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MATT_FISHMAN_SCHOLARSHIP, PHILANTHROPY_PARTNERS } from '@/lib/constants';
import { fishFestEvents } from '@/data/philanthropy';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function PhilanthropyPartner() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const impactItems = [
        { value: MATT_FISHMAN_SCHOLARSHIP.impact.totalRaised, label: 'Raised', prefix: '$', suffix: '+' },
        { value: MATT_FISHMAN_SCHOLARSHIP.impact.scholarshipYears, label: 'Years Funded', suffix: '+' },
        { value: MATT_FISHMAN_SCHOLARSHIP.impact.guestsReached, label: 'Guests Reached', suffix: '' },
    ];

    return (
        <section ref={ref} className="py-24 lg:py-32 px-6 lg:px-8 bg-stone-50">
            <div className="max-w-7xl mx-auto">
                <SectionHeading
                    title="The Matt Fishman Scholarship"
                    subtitle="Honoring our brother's memory through music and supporting students impacted by cancer."
                />

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate={isInView ? 'animate' : 'initial'}
                    className="mt-12 space-y-12"
                >
                    {/* Main content */}
                    <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-7">
                            <h3 className="font-display text-xl font-bold text-heritage-900 mb-2">
                                {MATT_FISHMAN_SCHOLARSHIP.name}
                            </h3>
                            <p className="text-stone-500 text-sm mb-6">
                                {MATT_FISHMAN_SCHOLARSHIP.subtitle}
                            </p>

                            <p className="text-stone-600 text-lg leading-relaxed mb-6">
                                {MATT_FISHMAN_SCHOLARSHIP.description}
                            </p>

                            <p className="text-stone-600 leading-relaxed mb-8">
                                {MATT_FISHMAN_SCHOLARSHIP.about}
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={MATT_FISHMAN_SCHOLARSHIP.links.scholarship}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-heritage-900 text-white text-sm font-semibold rounded-sm transition-colors duration-200 hover:bg-heritage-800"
                                >
                                    View Scholarship
                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                        <path d="M5 3h8v8M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                                <a
                                    href={MATT_FISHMAN_SCHOLARSHIP.links.neuArticle}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-stone-300 text-heritage-900 text-sm font-semibold rounded-sm transition-colors duration-200 hover:bg-stone-100"
                                >
                                    Read NEU Article
                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                        <path d="M5 3h8v8M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Impact & Fish Fest */}
                        <div className="lg:col-span-5 space-y-8">
                            {/* Impact stats */}
                            <div className="grid grid-cols-3 gap-4">
                                {impactItems.map((item) => (
                                    <div key={item.label} className="text-center">
                                        <div className="text-2xl font-display font-bold text-heritage-900 mb-1 tabular-nums">
                                            <AnimatedCounter end={item.value} prefix={item.prefix} suffix={item.suffix} />
                                        </div>
                                        <p className="text-stone-500 text-xs font-medium uppercase tracking-wide">
                                            {item.label}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Fish Fest history */}
                            <div>
                                <h4 className="font-display text-base font-semibold text-heritage-900 mb-4">
                                    Fish Fest History
                                </h4>
                                <div className="border-t border-stone-200">
                                    {fishFestEvents.map((event) => (
                                        <div key={event.id} className="flex items-center justify-between py-3 border-b border-stone-200 text-sm">
                                            <span className="text-stone-600">{event.season}</span>
                                            <div className="flex items-center gap-6">
                                                <span className="font-semibold text-heritage-900 tabular-nums">
                                                    ${event.amountRaised.toLocaleString()}
                                                </span>
                                                <span className="text-stone-400 text-xs tabular-nums">
                                                    {event.guests} guests
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Partner organizations */}
                    <motion.div variants={fadeInUp}>
                        <h3 className="font-display text-lg font-semibold text-heritage-900 mb-6">
                            Community Partners
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {PHILANTHROPY_PARTNERS.map((partner) => (
                                <a
                                    key={partner.name}
                                    href={partner.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group py-5 border-b border-stone-200 md:border-b-0 md:pr-6"
                                >
                                    <h4 className="font-semibold text-heritage-900 mb-2 group-hover:text-gold-700 transition-colors duration-200">
                                        {partner.name}
                                    </h4>
                                    <p className="text-stone-500 text-sm leading-relaxed">
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
