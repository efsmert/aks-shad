'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { SectionHeading } from './SectionHeading';
import { staggerContainer } from '@/lib/animations';

interface SectionProps {
    /** Section id for anchor links */
    id?: string;
    /** Section title (passed to SectionHeading) */
    title?: string;
    /** Section subtitle (passed to SectionHeading) */
    subtitle?: string;
    /** Show top gradient fade (default: true) */
    gradientTop?: boolean;
    /** Show bottom gradient fade (default: true) */
    gradientBottom?: boolean;
    /** Background color/style variant */
    background?: 'default' | 'card' | 'transparent';
    /** Additional background decoration */
    backgroundDecoration?: ReactNode;
    /** Additional className for the section */
    className?: string;
    /** Content wrapper className */
    contentClassName?: string;
    /** Use stagger animation container */
    stagger?: boolean;
    /** Section content */
    children: ReactNode;
}

export function Section({
    id,
    title,
    subtitle,
    gradientTop = true,
    gradientBottom = true,
    background = 'default',
    backgroundDecoration,
    className = '',
    contentClassName = '',
    stagger = false,
    children,
}: SectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const bgClasses = {
        default: '',
        card: 'bg-green-card/30',
        transparent: 'bg-transparent',
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
            className={`py-24 px-4 relative ${bgClasses[background]} ${className}`}
        >
            {/* Top gradient fade */}
            {gradientTop && (
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-green-dark-bg to-transparent pointer-events-none z-0" />
            )}

            {/* Background decoration */}
            {backgroundDecoration}

            <div className="max-w-7xl mx-auto relative z-10 pt-8">
                {(title || subtitle) && (
                    <SectionHeading title={title || ''} subtitle={subtitle} />
                )}
                {content}
            </div>

            {/* Bottom gradient fade */}
            {gradientBottom && (
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-dark-bg to-transparent pointer-events-none z-0" />
            )}
        </section>
    );
}
