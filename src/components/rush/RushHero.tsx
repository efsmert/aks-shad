'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

type RushState = 'spring-rush' | 'post-spring' | 'fall-rush' | 'post-fall';

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
    const springRushStart = new Date(year, 0, 8);
    const springRushEnd = new Date(year, 0, 30, 23, 59, 59);
    const fallRushStart = new Date(year, 8, 12);
    const fallRushEnd = new Date(year, 9, 9, 23, 59, 59);
    const nextSpringRushStart = new Date(year + 1, 0, 8);

    if (now < springRushStart) {
        return { state: 'post-fall', label: 'Spring Rush Coming Soon', seasonLabel: `Spring ${year} Rush`, countdownLabel: 'Rush begins in', targetDate: springRushStart, description: 'Get ready for spring rush. Register your interest to be notified when events are announced.', showCountdown: true, isActive: false };
    }
    if (now >= springRushStart && now <= springRushEnd) {
        return { state: 'spring-rush', label: 'Rush Is Live', seasonLabel: `Spring ${year} Rush`, countdownLabel: 'Rush ends in', targetDate: springRushEnd, description: 'Rush is happening now. Come meet the brothers and learn what ΑΚΣ is all about.', showCountdown: true, isActive: true };
    }
    if (now > springRushEnd && now < fallRushStart) {
        return { state: 'post-spring', label: 'Fall Rush Coming Soon', seasonLabel: `Fall ${year} Rush`, countdownLabel: 'Rush begins in', targetDate: fallRushStart, description: 'Spring rush has concluded. Register your interest for fall rush.', showCountdown: true, isActive: false };
    }
    if (now >= fallRushStart && now <= fallRushEnd) {
        return { state: 'fall-rush', label: 'Rush Is Live', seasonLabel: `Fall ${year} Rush`, countdownLabel: 'Rush ends in', targetDate: fallRushEnd, description: 'Rush is happening now. Come meet the brothers and learn what ΑΚΣ is all about.', showCountdown: true, isActive: true };
    }
    return { state: 'post-fall', label: 'Spring Rush Coming Soon', seasonLabel: `Spring ${year + 1} Rush`, countdownLabel: 'Rush begins in', targetDate: nextSpringRushStart, description: 'Fall rush has concluded. Register your interest for spring rush.', showCountdown: true, isActive: false };
}

function calculateTimeRemaining(targetDate: Date) {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        expired: false,
    };
}

export function RushHero() {
    const [rushPeriod, setRushPeriod] = useState<RushPeriod>(() => getRushPeriod(new Date()));
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeRemaining(rushPeriod.targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const current = getRushPeriod(now);
            if (current.state !== rushPeriod.state) setRushPeriod(current);
            setTimeLeft(calculateTimeRemaining(current.targetDate));
        }, 1000);
        return () => clearInterval(timer);
    }, [rushPeriod.state]);

    return (
        <section className="pt-32 lg:pt-40 pb-20 lg:pb-28 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-3xl">
                    {/* Overline — matches other pages */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                        className="text-gold-600 text-sm font-semibold tracking-[0.2em] uppercase mb-6"
                    >
                        {rushPeriod.seasonLabel}
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
                        {rushPeriod.isActive && (
                            <span className="inline-flex items-center gap-2 ml-4 px-3 py-1 bg-heritage-900 text-white text-xs font-semibold uppercase tracking-wider rounded-sm align-middle">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                                Live
                            </span>
                        )}
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                        className="text-stone-600 text-xl leading-relaxed mb-10 max-w-xl"
                    >
                        {rushPeriod.description}
                    </motion.p>

                    {/* Countdown */}
                    {rushPeriod.showCountdown && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                            className="mb-10"
                        >
                            <p className="text-stone-500 text-xs uppercase tracking-wider mb-4 font-medium">
                                {rushPeriod.countdownLabel}
                            </p>
                            <div className="flex gap-4 lg:gap-6">
                                {[
                                    { value: timeLeft.days, label: 'Days' },
                                    { value: timeLeft.hours, label: 'Hours' },
                                    { value: timeLeft.minutes, label: 'Min' },
                                    { value: timeLeft.seconds, label: 'Sec' },
                                ].map((item) => (
                                    <div key={item.label} className="text-center">
                                        <span className="block font-display text-3xl lg:text-4xl font-bold text-heritage-900 tabular-nums">
                                            {String(item.value).padStart(2, '0')}
                                        </span>
                                        <span className="text-stone-500 text-xs uppercase tracking-wider mt-1">
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    >
                        <a
                            href={rushPeriod.isActive ? '#rush-events' : '#interest-form'}
                            className="inline-block px-7 py-3.5 bg-heritage-900 text-white font-semibold text-sm rounded-sm transition-colors duration-200 hover:bg-heritage-800"
                        >
                            {rushPeriod.isActive ? 'View Rush Events' : 'Register Your Interest'}
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
