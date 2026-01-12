'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { fadeInUp, letterStagger, letterAnimation } from '@/lib/animations';

export function RushHero() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // Countdown to rush week (January 20, 2026)
    const rushDate = new Date('2026-01-20T17:00:00');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = rushDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / (1000 * 60)) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const titleLetters = 'RUSH ΑΚΣ'.split('');

    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-32">
            {/* Animated background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-green-dark-bg" />
                {/* Animated gradient orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-green-primary/30 blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-green-accent/20 blur-3xl"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                {/* Season badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-accent/10 border border-green-accent/30 text-green-accent text-sm font-medium mb-8"
                >
                    <Calendar className="w-4 h-4" />
                    Spring 2026 Rush
                </motion.div>

                {/* Title */}
                <motion.h1
                    variants={letterStagger}
                    initial="hidden"
                    animate="visible"
                    className="font-display text-6xl md:text-8xl lg:text-9xl font-black mb-8"
                >
                    {titleLetters.map((letter, index) => (
                        <motion.span
                            key={index}
                            variants={letterAnimation}
                            className={`inline-block ${letter === ' ' ? 'mx-2' : ''} ${letter === 'Α' || letter === 'Κ' || letter === 'Σ'
                                ? 'text-gradient'
                                : 'text-white'
                                }`}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Countdown */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-12"
                >
                    <p className="text-green-light/60 text-sm uppercase tracking-wider mb-4 flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4" />
                        Rush Starts In
                    </p>
                    <div className="flex justify-center gap-4 md:gap-8">
                        {[
                            { value: timeLeft.days, label: 'Days' },
                            { value: timeLeft.hours, label: 'Hours' },
                            { value: timeLeft.minutes, label: 'Minutes' },
                            { value: timeLeft.seconds, label: 'Seconds' },
                        ].map((item, index) => (
                            <motion.div
                                key={item.label}
                                whileHover={{ y: -4, scale: 1.05 }}
                                className="w-20 md:w-24"
                            >
                                <div className="p-4 rounded-xl bg-green-card border border-green-accent/20">
                                    <motion.span
                                        key={item.value}
                                        initial={{ scale: 1.2, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="block text-3xl md:text-4xl font-display font-bold text-gradient"
                                    >
                                        {String(item.value).padStart(2, '0')}
                                    </motion.span>
                                </div>
                                <p className="text-green-light/50 text-xs uppercase tracking-wider mt-2">
                                    {item.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="text-green-light/70 text-lg mb-6">
                        Join the brotherhood that will define your college experience.
                    </p>
                    <a href="#interest-form">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(46, 204, 113, 0.3)' }}
                            whileTap={{ scale: 0.98 }}
                            className="px-10 py-5 bg-gradient-to-r from-green-secondary to-green-accent text-white font-bold rounded-full text-lg"
                        >
                            Register Your Interest
                        </motion.button>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
