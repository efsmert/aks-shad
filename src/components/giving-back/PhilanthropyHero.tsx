'use client';

import { motion } from 'framer-motion';

export function PhilanthropyHero() {
    return (
        <section className="pt-32 lg:pt-40 pb-20 lg:pb-28 px-6 lg:px-8 bg-heritage-900">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-3xl">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                        className="text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase mb-6"
                    >
                        Philanthropy & Service
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                        className="font-display text-hero font-bold text-white mb-6"
                    >
                        Giving Back
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                        className="text-heritage-300 text-xl leading-relaxed mb-4 max-w-xl"
                    >
                        Through <span className="text-gold-400 font-semibold">Fish Fest</span>,
                        our Boiler Room-inspired charity concerts, we honor the memory of our
                        brother Matt Fishman.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                        className="text-heritage-400 text-lg"
                    >
                        $30,000+ raised for the Matt Fishman Scholarship
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
