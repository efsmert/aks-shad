'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const pathways = [
    {
        title: 'Meet Our Brothers',
        description: 'Get to know the men who make Alpha Kappa Sigma exceptional. Diverse backgrounds, shared values.',
        href: '/brothers',
        label: 'View directory',
    },
    {
        title: 'Rush ΑΚΣ',
        description: 'Ready to start your journey? Join us for rush events this semester and see what brotherhood means.',
        href: '/rush',
        label: 'Learn about rush',
    },
    {
        title: 'Giving Back',
        description: 'See how we honor our brother Matt Fishman through Fish Fest and make a lasting community impact.',
        href: '/giving-back',
        label: 'Our philanthropy',
    },
];

export function CTASection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="py-24 lg:py-32 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate={isInView ? 'animate' : 'initial'}
                >
                    {/* Pathways — clean list with dividers, not cards */}
                    <div className="border-t border-stone-200">
                        {pathways.map((item) => (
                            <motion.div key={item.title} variants={fadeInUp}>
                                <Link
                                    href={item.href}
                                    className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 lg:py-10 border-b border-stone-200 transition-colors duration-200 hover:bg-stone-50 -mx-4 px-4 md:-mx-6 md:px-6"
                                >
                                    <h3 className="md:col-span-4 font-display text-xl lg:text-2xl font-bold text-heritage-900 group-hover:text-gold-700 transition-colors duration-200">
                                        {item.title}
                                    </h3>
                                    <p className="md:col-span-6 text-stone-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                    <span className="md:col-span-2 text-sm font-medium text-gold-600 flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                                        {item.label}
                                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
                                            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Final CTA — simple, typographic */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                        className="mt-20 lg:mt-28 max-w-3xl"
                    >
                        <h2 className="font-display text-section font-bold text-heritage-900 mb-6">
                            Ready to begin your journey?
                        </h2>
                        <p className="text-stone-600 text-lg leading-relaxed mb-8 max-w-xl">
                            Join a brotherhood that will shape your college experience and beyond.
                            Rush Alpha Kappa Sigma this semester.
                        </p>
                        <Link
                            href="/rush"
                            className="inline-block px-8 py-4 bg-heritage-900 text-white font-semibold rounded-sm transition-all duration-200 hover:bg-heritage-800 text-base"
                        >
                            Rush ΑΚΣ Today →
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
