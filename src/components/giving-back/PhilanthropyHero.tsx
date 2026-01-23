'use client';

import { motion } from 'framer-motion';
import { Heart, Music } from 'lucide-react';
import { letterStagger, letterAnimation } from '@/lib/animations';

export function PhilanthropyHero() {
    const titleWords = 'Giving Back'.split('');

    return (
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-32">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&h=1080&fit=crop)',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-green-dark-bg via-green-dark-bg/90 to-green-dark-bg" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-green-secondary to-green-accent flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-accent/30"
                >
                    <Music className="w-10 h-10 text-white" />
                </motion.div>

                <motion.h1
                    variants={letterStagger}
                    initial="hidden"
                    animate="visible"
                    className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                >
                    {titleWords.map((letter, index) => (
                        <motion.span
                            key={index}
                            variants={letterAnimation}
                            className="inline-block"
                            style={{ marginRight: letter === ' ' ? '0.5rem' : '0' }}
                        >
                            {letter === ' ' ? '\u00A0' : letter}
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-green-light/80 text-xl md:text-2xl max-w-3xl mx-auto mb-4"
                >
                    Through <span className="text-green-accent font-semibold">Fish Fest</span>, our Boiler Room-inspired charity concerts, we honor the memory of our brother Matt Fishman.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-green-light/60 text-lg max-w-2xl mx-auto flex items-center justify-center gap-2"
                >
                    <Heart className="w-4 h-4 text-green-accent" />
                    $30,000+ raised for the Matt Fishman Scholarship
                </motion.p>
            </div>
        </section>
    );
}
