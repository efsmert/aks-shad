'use client';

import { motion } from 'framer-motion';

export function BrothersHero() {
    return (
        <section className="pt-32 lg:pt-40 pb-20 lg:pb-28 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-3xl">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                        className="text-gold-600 text-sm font-semibold tracking-[0.2em] uppercase mb-6"
                    >
                        Brotherhood
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                        className="font-display text-hero font-bold text-heritage-900 mb-6"
                    >
                        Our Brothers
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                        className="text-stone-600 text-xl leading-relaxed max-w-xl"
                    >
                        The men who make Alpha Kappa Sigma exceptional — diverse backgrounds,
                        shared values, lifelong bonds.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
