'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { letterStagger, letterAnimation } from '@/lib/animations';
import Link from 'next/link';

export function Hero() {
    const greekLetters = 'ΑΚΣ'.split('');

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Hero content */}
            <div className="relative z-10 text-center px-4">
                {/* Greek Letters */}
                <motion.div
                    variants={letterStagger}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-center gap-4 md:gap-8 mb-8 relative"
                >
                    {greekLetters.map((letter) => (
                        <motion.span
                            key={letter}
                            variants={letterAnimation}
                            className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-display font-black text-gradient leading-none relative"
                            style={{
                                textShadow: '0 0 25px rgba(46, 204, 113, 0.35), 0 0 50px rgba(46, 204, 113, 0.12)',
                            }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/rush">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 bg-gradient-to-r from-green-secondary to-green-accent text-white font-semibold rounded-full text-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-green-accent/30"
                        >
                            Rush ΑΚΣ
                        </motion.button>
                    </Link>
                    <Link href="/brothers">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 border-2 border-green-accent/50 text-green-light font-semibold rounded-full text-lg hover:bg-green-accent/10 transition-all duration-300"
                        >
                            Meet Our Brothers
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            {/* Scroll indicator - using CSS animation instead of Framer Motion */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-green-light/50"
            >
                <span className="text-sm">Scroll to explore</span>
                <ChevronDown className="w-6 h-6 animate-bounce" />
            </motion.div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-dark-bg to-transparent" />
        </section>
    );
}
