'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { fadeInUp, staggerContainer, letterStagger, letterAnimation } from '@/lib/animations';

export function PhilanthropyHero() {
    const titleWords = 'Making a Difference'.split('');

    return (
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-32">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=1080&fit=crop)',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-green-dark-bg via-green-dark-bg/80 to-green-dark-bg" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-green-secondary to-green-accent flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-accent/30"
                >
                    <Heart className="w-10 h-10 text-white" />
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
                    className="text-green-light/80 text-xl md:text-2xl max-w-2xl mx-auto"
                >
                    Alpha Kappa Sigma is committed to serving our community and creating lasting positive impact.
                </motion.p>
            </div>
        </section>
    );
}
