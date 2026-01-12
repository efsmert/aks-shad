'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { letterStagger, letterAnimation, bounceAnimation } from '@/lib/animations';
import Link from 'next/link';

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

    const greekLetters = 'ΑΚΣ'.split('');

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Animated background particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-green-accent/30"
                        initial={{
                            x: Math.random() * 100 + '%',
                            y: Math.random() * 100 + '%',
                        }}
                        animate={{
                            y: [null, '-100%'],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: 'linear',
                        }}
                    />
                ))}
            </div>

            {/* Hero content */}
            <motion.div
                style={{ y, opacity, scale }}
                className="relative z-10 text-center px-4"
            >
                {/* Greek Letters */}
                <motion.div
                    variants={letterStagger}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-center gap-4 md:gap-8 mb-8 relative"
                >
                    {/* Subtle glow backdrop */}
                    <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-green-accent/10 via-green-secondary/15 to-green-accent/10 scale-125 opacity-60" />

                    {greekLetters.map((letter, index) => (
                        <motion.span
                            key={letter}
                            variants={letterAnimation}
                            animate={{
                                textShadow: [
                                    '0 0 20px rgba(46, 204, 113, 0.3), 0 0 40px rgba(46, 204, 113, 0.1)',
                                    '0 0 30px rgba(46, 204, 113, 0.4), 0 0 60px rgba(46, 204, 113, 0.15)',
                                    '0 0 20px rgba(46, 204, 113, 0.3), 0 0 40px rgba(46, 204, 113, 0.1)',
                                ],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: index * 0.3,
                            }}
                            className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-display font-black text-gradient leading-none relative"
                            style={{
                                filter: 'drop-shadow(0 0 8px rgba(46, 204, 113, 0.3))',
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
                    transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/rush">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(46, 204, 113, 0.3)' }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 bg-gradient-to-r from-green-secondary to-green-accent text-white font-semibold rounded-full text-lg transition-all duration-300"
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
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                variants={bounceAnimation}
                initial="initial"
                animate="animate"
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="flex flex-col items-center gap-2 text-green-light/50"
                >
                    <span className="text-sm">Scroll to explore</span>
                    <ChevronDown className="w-6 h-6 animate-bounce" />
                </motion.div>
            </motion.div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-dark-bg to-transparent" />
        </section>
    );
}
