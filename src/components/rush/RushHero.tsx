'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { fadeInUp, letterStagger, letterAnimation } from '@/lib/animations';

// Rush schedule configuration
// Spring: Starts Jan 8, lasts 30 days (ends Feb 7)
// Fall: Starts Sept 12, lasts 30 days (ends Oct 12)

type RushState =
    | 'spring-rush'      // During spring rush (Jan 8 - Feb 7)
    | 'post-spring'      // After spring rush, waiting for fall (Feb 8 - Sept 11)
    | 'fall-rush'        // During fall rush (Sept 12 - Oct 12)
    | 'post-fall';       // After fall rush, waiting for spring (Oct 13 - Jan 7)

interface RushPeriod {
    state: RushState;
    label: string;
    seasonLabel: string;
    countdownLabel: string;
    targetDate: Date;
    description: string;
    showCountdown: boolean;
    isActive: boolean;
}

function getRushPeriod(now: Date): RushPeriod {
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-indexed
    const day = now.getDate();

    // Define key dates for current and next year
    // Spring Rush: Jan 8 - Jan 30 (Bid Acceptance Day)
    // Fall Rush: Sept 12 - Oct 9 (approximate, adjust as needed)
    const springRushStart = new Date(year, 0, 8); // Jan 8
    const springRushEnd = new Date(year, 0, 30, 23, 59, 59); // Jan 30 end of day (Bid Acceptance)
    const fallRushStart = new Date(year, 8, 12); // Sept 12
    const fallRushEnd = new Date(year, 9, 9, 23, 59, 59); // Oct 9 end of day

    // Next year's spring rush
    const nextSpringRushStart = new Date(year + 1, 0, 8); // Jan 8 next year

    // Previous year's fall rush end (for early January check)
    const prevFallRushEnd = new Date(year - 1, 9, 12, 23, 59, 59);

    // Check current state based on date

    // Before spring rush starts this year (Jan 1 - Jan 7)
    if (now < springRushStart) {
        return {
            state: 'post-fall',
            label: 'Spring Rush Coming Soon',
            seasonLabel: `Spring ${year} Rush`,
            countdownLabel: 'Rush Begins In',
            targetDate: springRushStart,
            description: 'Get ready for spring rush! Register your interest to be notified when rush events are announced.',
            showCountdown: true,
            isActive: false,
        };
    }

    // During spring rush (Jan 8 - Feb 7)
    if (now >= springRushStart && now <= springRushEnd) {
        return {
            state: 'spring-rush',
            label: 'Rush Is Live!',
            seasonLabel: `Spring ${year} Rush`,
            countdownLabel: 'Rush Ends In',
            targetDate: springRushEnd,
            description: 'Rush is happening now! Come meet the brothers and learn what ΑΚΣ is all about.',
            showCountdown: true,
            isActive: true,
        };
    }

    // Post spring rush, waiting for fall (Feb 8 - Sept 11)
    if (now > springRushEnd && now < fallRushStart) {
        return {
            state: 'post-spring',
            label: 'Fall Rush Coming Soon',
            seasonLabel: `Fall ${year} Rush`,
            countdownLabel: 'Rush Begins In',
            targetDate: fallRushStart,
            description: 'Spring rush has concluded. Register your interest for fall rush to be notified when events are announced.',
            showCountdown: true,
            isActive: false,
        };
    }

    // During fall rush (Sept 12 - Oct 12)
    if (now >= fallRushStart && now <= fallRushEnd) {
        return {
            state: 'fall-rush',
            label: 'Rush Is Live!',
            seasonLabel: `Fall ${year} Rush`,
            countdownLabel: 'Rush Ends In',
            targetDate: fallRushEnd,
            description: 'Rush is happening now! Come meet the brothers and learn what ΑΚΣ is all about.',
            showCountdown: true,
            isActive: true,
        };
    }

    // Post fall rush, waiting for spring (Oct 13 - Dec 31)
    return {
        state: 'post-fall',
        label: 'Spring Rush Coming Soon',
        seasonLabel: `Spring ${year + 1} Rush`,
        countdownLabel: 'Rush Begins In',
        targetDate: nextSpringRushStart,
        description: 'Fall rush has concluded. Register your interest for spring rush to be the first to know about upcoming events.',
        showCountdown: true,
        isActive: false,
    };
}

function calculateTimeRemaining(targetDate: Date) {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        expired: false,
    };
}

export function RushHero() {
    const [rushPeriod, setRushPeriod] = useState<RushPeriod>(() => getRushPeriod(new Date()));
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeRemaining(rushPeriod.targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const currentPeriod = getRushPeriod(now);

            // Check if period changed
            if (currentPeriod.state !== rushPeriod.state) {
                setRushPeriod(currentPeriod);
            }

            setTimeLeft(calculateTimeRemaining(currentPeriod.targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [rushPeriod.state]);

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
                {/* Season badge with status indicator */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-8 ${rushPeriod.isActive
                        ? 'bg-green-accent/20 border-green-accent/50 text-green-accent'
                        : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        }`}
                >
                    {rushPeriod.isActive ? (
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <CheckCircle className="w-4 h-4" />
                        </motion.div>
                    ) : (
                        <Calendar className="w-4 h-4" />
                    )}
                    {rushPeriod.seasonLabel}
                    {rushPeriod.isActive && (
                        <span className="ml-2 px-2 py-0.5 bg-green-accent text-green-dark-bg text-xs font-bold rounded-full">
                            LIVE NOW
                        </span>
                    )}
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

                {/* Status Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mb-6"
                >
                    <h2 className={`text-2xl md:text-3xl font-bold ${rushPeriod.isActive ? 'text-green-accent' : 'text-white'
                        }`}>
                        {rushPeriod.label}
                    </h2>
                </motion.div>

                {/* Countdown */}
                {rushPeriod.showCountdown && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-12"
                    >
                        <p className="text-green-light/60 text-sm uppercase tracking-wider mb-4 flex items-center justify-center gap-2">
                            <Clock className="w-4 h-4" />
                            {rushPeriod.countdownLabel}
                        </p>
                        <div className="flex justify-center gap-4 md:gap-8">
                            {[
                                { value: timeLeft.days, label: 'Days' },
                                { value: timeLeft.hours, label: 'Hours' },
                                { value: timeLeft.minutes, label: 'Minutes' },
                                { value: timeLeft.seconds, label: 'Seconds' },
                            ].map((item) => (
                                <motion.div
                                    key={item.label}
                                    whileHover={{ y: -4, scale: 1.05 }}
                                    className="w-20 md:w-24"
                                >
                                    <div className={`p-4 rounded-xl border ${rushPeriod.isActive
                                        ? 'bg-green-accent/10 border-green-accent/30'
                                        : 'bg-green-card border-green-accent/20'
                                        }`}>
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
                )}

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="text-green-light/70 text-lg mb-6 max-w-2xl mx-auto">
                        {rushPeriod.description}
                    </p>
                    <a href={rushPeriod.isActive ? "#rush-events" : "#interest-form"}>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(46, 204, 113, 0.3)' }}
                            whileTap={{ scale: 0.98 }}
                            className={`px-10 py-5 font-bold rounded-full text-lg ${rushPeriod.isActive
                                ? 'bg-gradient-to-r from-green-accent to-green-secondary text-white animate-pulse'
                                : 'bg-gradient-to-r from-green-secondary to-green-accent text-white'
                                }`}
                        >
                            {rushPeriod.isActive ? 'View Rush Events' : 'Register Your Interest'}
                        </motion.button>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
