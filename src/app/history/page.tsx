'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { CHAPTER_INFO } from '@/lib/constants';

const timelineEvents = [
    {
        year: 1919,
        title: 'Foundation',
        description: 'Alpha Kappa Sigma was founded at Northeastern University by seven visionary students who believed in the power of brotherhood and the advancement of kindred sympathy.',
    },
    {
        year: 1925,
        title: 'First Chapter House',
        description: 'The fraternity acquired its first official chapter house near the Northeastern campus, providing a home for brothers and a center for fraternity activities.',
    },
    {
        year: 1945,
        title: 'Post-War Growth',
        description: 'Following World War II, Alpha Kappa Sigma experienced significant growth as returning veterans joined the brotherhood, bringing diverse experiences and perspectives.',
    },
    {
        year: 1969,
        title: '50th Anniversary',
        description: 'The fraternity celebrated its golden anniversary with a grand reunion, bringing together generations of brothers to honor our founding principles.',
    },
    {
        year: 1994,
        title: '75th Anniversary',
        description: 'Three-quarters of a century of brotherhood was commemorated with the establishment of the AKΣ Alumni Foundation to support current and future members.',
    },
    {
        year: 2019,
        title: 'Centennial Celebration',
        description: 'Alpha Kappa Sigma celebrated 100 years of brotherhood, service, and the advancement of kindred sympathy at Northeastern University.',
    },
];

const foundingValues = [
    {
        title: 'Advancement of Kindred Sympathy',
        description: 'Our core principle—fostering genuine understanding, empathy, and lasting bonds between brothers.',
    },
    {
        title: 'Academic Excellence',
        description: 'A commitment to scholarly achievement and intellectual growth that has defined our brotherhood since day one.',
    },
    {
        title: 'Service to Others',
        description: 'Giving back to our community and making a positive impact beyond our chapter walls.',
    },
    {
        title: 'Lifelong Brotherhood',
        description: 'Building connections that last far beyond graduation, creating a network of support for life.',
    },
];

export default function HistoryPage() {
    const timelineRef = useRef<HTMLDivElement>(null);
    const timelineInView = useInView(timelineRef, { once: true, margin: '-100px' });
    const foundingRef = useRef<HTMLDivElement>(null);
    const foundingInView = useInView(foundingRef, { once: true, margin: '-100px' });
    const statsRef = useRef<HTMLDivElement>(null);
    const statsInView = useInView(statsRef, { once: true, margin: '-50px' });

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="pt-32 lg:pt-40 pb-20 lg:pb-28 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl">
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                            className="text-gold-600 text-sm font-semibold tracking-[0.2em] uppercase mb-6"
                        >
                            Est. {CHAPTER_INFO.foundingYear}
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                            className="font-display text-hero font-bold text-heritage-900 mb-6"
                        >
                            Our History
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                            className="text-stone-600 text-xl leading-relaxed max-w-2xl"
                        >
                            For over a century, Alpha Kappa Sigma has been shaping leaders, fostering
                            brotherhood, and advancing kindred sympathy at Northeastern University.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Founding Story */}
            <section ref={foundingRef} className="py-20 lg:py-28 px-6 lg:px-8 bg-stone-50">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate={foundingInView ? 'animate' : 'initial'}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12"
                    >
                        <motion.div variants={fadeInUp} className="lg:col-span-6">
                            <div className="w-12 h-[2px] bg-gold-600 mb-6" />
                            <h2 className="font-display text-section font-bold text-heritage-900 mb-8">
                                Founded in 1919
                            </h2>
                            <div className="space-y-5 text-stone-600 text-lg leading-relaxed">
                                <p>
                                    In the aftermath of World War I, seven students at Northeastern University
                                    came together with a shared vision: to create a brotherhood built on
                                    mutual respect, academic excellence, and the advancement of kindred sympathy.
                                </p>
                                <p>
                                    These founding fathers believed that true brotherhood transcended social
                                    boundaries and that by supporting one another, they could achieve greatness.
                                </p>
                                <p>
                                    They chose the name Alpha Kappa Sigma—with ΑΚΣ representing &ldquo;Advancement
                                    of Kindred Sympathy&rdquo;—to embody their mission of fostering genuine
                                    connections and understanding among brothers.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="lg:col-span-6 lg:pt-12">
                            <h3 className="font-display text-xl font-bold text-heritage-900 mb-8">
                                Our Founding Values
                            </h3>
                            <div className="space-y-6">
                                {foundingValues.map((value, index) => (
                                    <motion.div
                                        key={value.title}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={foundingInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.2 + index * 0.1, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                                        className="flex gap-4"
                                    >
                                        <span className="w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="w-2 h-2 rounded-full bg-gold-600" />
                                        </span>
                                        <div>
                                            <h4 className="text-heritage-900 font-semibold mb-1">{value.title}</h4>
                                            <p className="text-stone-500 text-sm leading-relaxed">{value.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Timeline */}
            <section ref={timelineRef} className="py-20 lg:py-28 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                        className="mb-16"
                    >
                        <div className="w-12 h-[2px] bg-gold-600 mb-6" />
                        <h2 className="font-display text-section font-bold text-heritage-900 mb-4">
                            A Century of Brotherhood
                        </h2>
                        <p className="text-stone-600 text-lg max-w-xl">
                            Key moments that have shaped Alpha Kappa Sigma over the past 100+ years.
                        </p>
                    </motion.div>

                    {/* Editorial timeline — alternating, clean */}
                    <div className="space-y-0">
                        {timelineEvents.map((event, index) => (
                            <motion.div
                                key={event.year}
                                initial={{ opacity: 0, y: 16 }}
                                animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.1 + index * 0.08, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                                className="grid grid-cols-12 gap-4 lg:gap-8 py-8 border-b border-stone-200 group"
                            >
                                <div className="col-span-3 lg:col-span-2">
                                    <span className="font-display text-2xl lg:text-3xl font-bold text-heritage-800 tabular-nums">
                                        {event.year}
                                    </span>
                                </div>
                                <div className="col-span-9 lg:col-span-10">
                                    <h3 className="font-display text-lg lg:text-xl font-bold text-heritage-900 mb-2 group-hover:text-gold-700 transition-colors duration-200">
                                        {event.title}
                                    </h3>
                                    <p className="text-stone-600 leading-relaxed max-w-2xl">
                                        {event.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section ref={statsRef} className="py-16 lg:py-20 px-6 lg:px-8 bg-heritage-900">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate={statsInView ? 'animate' : 'initial'}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {[
                            { value: '100+', label: 'Years of Brotherhood' },
                            { value: '500+', label: 'Alumni Worldwide' },
                            { value: '7', label: 'Founding Fathers' },
                            { value: '1919', label: 'Year Founded' },
                        ].map((stat) => (
                            <motion.div
                                key={stat.label}
                                variants={fadeInUp}
                                className="text-center"
                            >
                                <div className="text-3xl lg:text-4xl font-display font-bold text-white mb-2 tabular-nums">
                                    {stat.value}
                                </div>
                                <div className="text-heritage-400 text-sm uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 lg:py-28 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                        className="max-w-2xl"
                    >
                        <h2 className="font-display text-section font-bold text-heritage-900 mb-6">
                            Become Part of Our Story
                        </h2>
                        <p className="text-stone-600 text-lg leading-relaxed mb-8">
                            For over a century, Alpha Kappa Sigma has been building leaders and
                            fostering lifelong connections. Join us and add your chapter to our history.
                        </p>
                        <Link
                            href="/rush"
                            className="inline-block px-8 py-4 bg-heritage-900 text-white font-semibold rounded-sm transition-colors duration-200 hover:bg-heritage-800"
                        >
                            Rush ΑΚΣ Today →
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
