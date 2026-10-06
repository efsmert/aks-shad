'use client';

import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { fishman5K } from '@/data/philanthropy';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function Fishman5K() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const reduceMotion = useReducedMotion();

    return (
        <section id="fishman-5k" ref={ref} aria-label="Fishman 5K" className="scroll-mt-28 py-24 lg:py-32 px-6 lg:px-8 border-b border-stone-200">
            <div className="max-w-7xl mx-auto">
                <p className="text-gold-600 text-xs font-semibold uppercase tracking-wider mb-4">Run, walk, or cheer</p>
                <SectionHeading
                    title={fishman5K.title}
                    subtitle="A day along the Charles. A lasting difference in Matt’s memory."
                />
                <motion.div
                    variants={staggerContainer}
                    initial={reduceMotion ? false : 'initial'}
                    animate={isInView || reduceMotion ? 'animate' : 'initial'}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
                >
                    <motion.div variants={fadeInUp} className="lg:col-span-7">
                        <p className="text-stone-600 text-lg leading-relaxed mb-6">
                            Join Alpha Kappa Sigma and RACE Cancer Foundation for a scenic 5K
                            run/walk through Herter Park. Bring friends and family for a flat
                            route along the Charles River, surrounded by fall foliage.
                        </p>
                        <p className="text-stone-600 leading-relaxed mb-8">
                            All proceeds support the Matt Fishman Scholarship, helping aspiring
                            young musicians whose lives have been affected by cancer or other
                            medical hardships.
                        </p>
                        <dl className="border-y border-stone-200 mb-8">
                            <div className="grid sm:grid-cols-[7rem_1fr] gap-2 py-5">
                                <dt className="text-stone-500 text-xs uppercase tracking-wider sm:pt-1">When</dt>
                                <dd className="text-heritage-900 font-medium">
                                    <time dateTime="2026-10-25T14:30:00-04:00">Sunday, October 25, 2026 · 2:30 p.m.</time>
                                </dd>
                            </div>
                            <div className="grid sm:grid-cols-[7rem_1fr] gap-2 py-5 border-t border-stone-200">
                                <dt className="text-stone-500 text-xs uppercase tracking-wider sm:pt-1">Where</dt>
                                <dd>
                                    <p className="text-heritage-900 font-medium">Herter Park / Artesani Playground</p>
                                    <p className="text-stone-500 text-sm mt-1">1275 Soldiers Field Road, Boston, MA</p>
                                </dd>
                            </div>
                            <div className="grid sm:grid-cols-[7rem_1fr] gap-2 py-5 border-t border-stone-200">
                                <dt className="text-stone-500 text-xs uppercase tracking-wider sm:pt-1">Race day</dt>
                                <dd className="text-stone-600 text-sm leading-relaxed">
                                    Number pick-up: 1:30–2:15 p.m.<br />
                                    Run: 2:30 p.m. · Walk: 2:32 p.m.
                                </dd>
                            </div>
                        </dl>
                        <div className="flex flex-wrap items-center gap-4">
                            <a
                                href={fishman5K.registrationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-heritage-900 text-white text-sm font-semibold rounded-sm transition-colors duration-200 hover:bg-heritage-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-600"
                            >
                                Register for the 5K
                                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <path d="M5 3h8v8M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <p className="text-stone-500 text-xs leading-relaxed max-w-56">Free commemorative T-shirts for the first 100 entrants.</p>
                        </div>
                    </motion.div>
                    <motion.figure variants={fadeInUp} className="lg:col-span-5 w-full max-w-sm mx-auto lg:mr-0">
                        <a href={fishman5K.image} target="_blank" rel="noopener noreferrer" className="block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-600">
                            <Image
                                src={fishman5K.image}
                                alt="Official Matt Fishman 5K flyer from Alpha Kappa Sigma and RACE Cancer Foundation. October 25 at 2:30 p.m., 1275 Soldiers Field Road, Boston."
                                width={1169}
                                height={1732}
                                sizes="(max-width: 432px) calc(100vw - 48px), 384px"
                                className="w-full h-auto rounded-sm border border-stone-200"
                            />
                        </a>
                        <figcaption className="text-stone-500 text-xs leading-relaxed mt-4">
                            The official event flyer. <a href={fishman5K.image} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-gold-700">View full size</a>.
                        </figcaption>
                    </motion.figure>
                </motion.div>
            </div>
        </section>
    );
}
