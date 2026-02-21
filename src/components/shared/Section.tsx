'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { SectionHeading } from './SectionHeading';
import { staggerContainer } from '@/lib/animations';

interface SectionProps {
    id?: string;
    title?: string;
    subtitle?: string;
    background?: 'default' | 'muted' | 'dark';
    className?: string;
    contentClassName?: string;
    stagger?: boolean;
    children: ReactNode;
}

export function Section({
    id,
    title,
    subtitle,
    background = 'default',
    className = '',
    contentClassName = '',
    stagger = false,
    children,
}: SectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const bgClasses = {
        default: '',
        muted: 'bg-stone-50',
        dark: 'bg-heritage-900 text-white',
    };

    const content = stagger ? (
        <motion.div
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? 'animate' : 'initial'}
            className={contentClassName}
        >
            {children}
        </motion.div>
    ) : (
        <div className={contentClassName}>{children}</div>
    );

    return (
        <section
            ref={ref}
            id={id}
            className={`py-24 lg:py-32 px-6 lg:px-8 ${bgClasses[background]} ${className}`}
        >
            <div className="max-w-7xl mx-auto">
                {(title || subtitle) && (
                    <SectionHeading title={title || ''} subtitle={subtitle} />
                )}
                {content}
            </div>
        </section>
    );
}
