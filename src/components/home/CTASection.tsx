'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Calendar, Heart } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const ctaCards = [
    {
        icon: Users,
        title: 'Meet Our Brothers',
        description: 'Get to know the men who make Alpha Kappa Sigma exceptional.',
        href: '/brothers',
        gradient: 'from-green-secondary to-green-primary',
    },
    {
        icon: Calendar,
        title: 'Rush ΑΚΣ',
        description: 'Ready to start your journey? Join us for rush events this semester.',
        href: '/rush',
        gradient: 'from-green-accent to-green-secondary',
    },
    {
        icon: Heart,
        title: 'Giving Back',
        description: 'See how we make a difference in our community and beyond.',
        href: '/giving-back',
        gradient: 'from-emerald-500 to-green-accent',
    },
];

export function CTASection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate={isInView ? 'animate' : 'initial'}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {ctaCards.map((card, index) => (
                        <motion.div key={card.title} variants={fadeInUp}>
                            <Link href={card.href} className="block group">
                                <motion.div
                                    whileHover={{ y: -8 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                    className="relative p-8 rounded-2xl bg-green-card border border-green-accent/10 overflow-hidden h-full"
                                >
                                    {/* Background gradient on hover */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                                    />

                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                                        <card.icon className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-green-light transition-colors duration-300">
                                        {card.title}
                                    </h3>
                                    <p className="text-green-light/70 text-sm leading-relaxed mb-6">
                                        {card.description}
                                    </p>

                                    {/* Arrow link */}
                                    <div className="flex items-center gap-2 text-green-accent font-medium text-sm">
                                        <span>Learn more</span>
                                        <motion.div
                                            initial={{ x: 0 }}
                                            whileHover={{ x: 5 }}
                                            className="transition-transform duration-300"
                                        >
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </motion.div>
                                    </div>

                                    {/* Corner decoration */}
                                    <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-green-accent/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-16 text-center"
                >
                    <div className="p-12 rounded-3xl bg-gradient-to-br from-green-card to-green-dark-bg border border-green-accent/20 relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute inset-0 bg-gradient-to-br from-green-primary/10 to-transparent" />
                        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-green-accent/10 blur-3xl" />

                        <div className="relative z-10">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                                Ready to Begin Your Journey?
                            </h2>
                            <p className="text-green-light/70 text-lg max-w-2xl mx-auto mb-8">
                                Join a brotherhood that will shape your college experience and beyond.
                                Rush Alpha Kappa Sigma this semester.
                            </p>
                            <Link href="/rush">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(46, 204, 113, 0.3)' }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-10 py-5 bg-gradient-to-r from-green-secondary to-green-accent text-white font-bold rounded-full text-lg inline-flex items-center gap-3"
                                >
                                    Rush ΑΚΣ Today
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
