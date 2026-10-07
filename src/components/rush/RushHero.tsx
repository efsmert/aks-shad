'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function RushHero() {
    return (
        <section className="page-hero pt-32 lg:pt-40 pb-20 lg:pb-28 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-3xl">
                    {/* Overline — matches other pages */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                        className="text-gold-600 text-sm font-semibold tracking-[0.2em] uppercase mb-6"
                    >
                        Fall 2026 · Rush has concluded
                    </motion.p>

                    {/* Title + Status */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                        className="mb-6"
                    >
                        <h1 className="font-display text-hero font-bold text-heritage-900 inline">
                            Rush ΑΚΣ
                        </h1>

                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                        className="text-stone-600 text-xl leading-relaxed mb-10 max-w-xl"
                    >
                        Thank you to everyone who came out, met the brothers, and made this rush season one to remember. Fall rush has wrapped up, but getting to know ΑΚΣ doesn’t have to stop here.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="mb-10 border-l border-gold-600/40 pl-5"
                    >
                        <p className="text-gold-600 text-xs font-semibold uppercase tracking-[0.16em] mb-2">
                            Until next time
                        </p>
                        <p className="text-stone-600 text-base leading-relaxed max-w-lg">
                            Future rush dates will be announced here and on Instagram.
                            In the meantime, meet the chapter and stay in touch.
                        </p>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                        className="flex flex-wrap items-center gap-6"
                    >
                        <a
                            href="#rush-contact"
                            className="action-primary inline-block px-7 py-3.5 bg-heritage-900 text-white font-semibold text-sm rounded-sm transition-colors duration-200 hover:bg-heritage-800"
                        >
                            Stay in touch
                        </a>
                        <Link href="/brothers" className="text-sm font-semibold text-heritage-900 hover:text-gold-600 transition-colors">
                            Meet the brothers <span aria-hidden="true">↗</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
