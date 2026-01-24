'use client';

import { motion } from 'framer-motion';
import { History, Calendar, Users, Award, BookOpen, MapPin } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { CHAPTER_INFO } from '@/lib/constants';
import { Timeline } from '@/components/shared/Timeline';

const timelineEvents = [
    {
        id: '1',
        year: 1919,
        title: 'Foundation',
        description: 'Alpha Kappa Sigma was founded at Northeastern University by a group of seven visionary students who believed in the power of brotherhood and the advancement of kindred sympathy.',
        icon: BookOpen,
    },
    {
        id: '2',
        year: 1925,
        title: 'First Chapter House',
        description: 'The fraternity acquired its first official chapter house near the Northeastern campus, providing a home for brothers and a center for fraternity activities.',
        icon: MapPin,
    },
    {
        id: '3',
        year: 1945,
        title: 'Post-War Growth',
        description: 'Following World War II, Alpha Kappa Sigma experienced significant growth as returning veterans joined the brotherhood, bringing diverse experiences and perspectives.',
        icon: Users,
    },
    {
        id: '4',
        year: 1969,
        title: '50th Anniversary',
        description: 'The fraternity celebrated its golden anniversary with a grand reunion, bringing together generations of brothers to honor our founding principles.',
        icon: Award,
    },
    {
        id: '5',
        year: 1994,
        title: '75th Anniversary',
        description: 'Three-quarters of a century of brotherhood was commemorated with the establishment of the AKΣ Alumni Foundation to support current and future members.',
        icon: Calendar,
    },
    {
        id: '6',
        year: 2019,
        title: 'Centennial Celebration',
        description: 'Alpha Kappa Sigma celebrated 100 years of brotherhood, service, and the advancement of kindred sympathy at Northeastern University.',
        icon: History,
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
    return (
        <div className="min-h-screen pt-24">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-green-primary/20 to-transparent" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-accent/10 border border-green-accent/30 text-green-accent text-sm font-medium mb-6"
                        >
                            <History className="w-4 h-4" />
                            Est. {CHAPTER_INFO.foundingYear}
                        </motion.div>

                        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                            Our <span className="text-gradient">History</span>
                        </h1>

                        <p className="text-xl text-green-light/70 leading-relaxed">
                            For over a century, Alpha Kappa Sigma has been shaping leaders, fostering brotherhood,
                            and advancing kindred sympathy at Northeastern University.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Founding Story */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        <motion.div variants={fadeInUp}>
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                                Founded in <span className="text-gradient">1919</span>
                            </h2>
                            <div className="space-y-4 text-green-light/70 text-lg leading-relaxed">
                                <p>
                                    In the aftermath of World War I, seven students at Northeastern University came together
                                    with a shared vision: to create a brotherhood built on mutual respect, academic excellence,
                                    and the advancement of kindred sympathy.
                                </p>
                                <p>
                                    These founding fathers believed that true brotherhood transcended social boundaries and
                                    that by supporting one another, they could achieve greatness both individually and collectively.
                                </p>
                                <p>
                                    They chose the name Alpha Kappa Sigma—with ΑΚΣ representing &quot;Advancement of Kindred Sympathy&quot;—to
                                    embody their mission of fostering genuine connections and understanding among brothers.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="relative"
                        >
                            <div className="bg-green-card border border-green-accent/20 rounded-2xl p-8">
                                <h3 className="font-display text-2xl font-bold text-white mb-6">
                                    Our Founding Values
                                </h3>
                                <div className="space-y-4">
                                    {foundingValues.map((value, index) => (
                                        <motion.div
                                            key={value.title}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="flex gap-4"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-green-accent mt-2 flex-shrink-0" />
                                            <div>
                                                <h4 className="text-white font-semibold mb-1">{value.title}</h4>
                                                <p className="text-green-light/60 text-sm">{value.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-card/30 to-transparent pointer-events-none z-0" />
            </section>

            {/* Timeline */}
            <section className="py-20 bg-green-card/30 relative">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                            A Century of <span className="text-gradient">Brotherhood</span>
                        </h2>
                        <p className="text-green-light/70 text-lg max-w-2xl mx-auto">
                            Key moments that have shaped Alpha Kappa Sigma over the past 100+ years.
                        </p>
                    </motion.div>

                    <Timeline
                        events={timelineEvents}
                        dateFormat="year"
                    />
                </div>

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-dark-bg to-transparent pointer-events-none z-0" />
            </section>

            {/* Stats Section */}
            <section className="py-20 relative">
                {/* Top gradient fade */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-green-card/30 to-transparent pointer-events-none z-0" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
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
                                <div className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-green-light/60 text-sm uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-dark-bg to-transparent pointer-events-none z-0" />
            </section>

            {/* Legacy CTA */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-green-primary/40 to-green-secondary/40 rounded-3xl p-8 md:p-12 text-center"
                    >
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            Become Part of Our Story
                        </h2>
                        <p className="text-green-light/70 text-lg max-w-2xl mx-auto mb-8">
                            For over a century, Alpha Kappa Sigma has been building leaders and fostering lifelong connections.
                            Join us and add your chapter to our history.
                        </p>
                        <motion.a
                            href="/rush"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-block px-8 py-4 bg-gradient-to-r from-green-secondary to-green-accent text-white font-bold rounded-full text-lg"
                        >
                            Rush ΑΚΣ Today
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
