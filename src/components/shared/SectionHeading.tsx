'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    className?: string;
}

export function SectionHeading({
    title,
    subtitle,
    centered = false,
    className = '',
}: SectionHeadingProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <div
            ref={ref}
            className={`mb-12 lg:mb-16 ${centered ? 'text-center' : ''} ${className}`}
        >
            {/* Gold accent rule */}
            <motion.div
                initial={{ scaleX: 0, originX: centered ? 0.5 : 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className={`w-12 h-[2px] bg-gold-600 mb-6 ${centered ? 'mx-auto' : ''}`}
            />
            <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="font-display text-section font-bold text-heritage-900 mb-4"
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    className={`text-stone-600 text-lg leading-relaxed ${centered ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}
