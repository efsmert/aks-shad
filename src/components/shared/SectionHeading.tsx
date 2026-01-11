'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { textReveal } from '@/lib/animations';

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    className?: string;
}

export function SectionHeading({
    title,
    subtitle,
    centered = true,
    className = '',
}: SectionHeadingProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <div
            ref={ref}
            className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}
        >
            <motion.h2
                variants={textReveal}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="font-display text-4xl md:text-5xl font-bold text-white mb-4"
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-green-light/70 text-lg max-w-2xl mx-auto"
                >
                    {subtitle}
                </motion.p>
            )}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`h-1 w-24 bg-gradient-to-r from-green-accent to-green-secondary rounded-full mt-6 ${centered ? 'mx-auto' : ''
                    }`}
            />
        </div>
    );
}
