'use client';

import { motion } from 'framer-motion';
import { type ReactNode, type ComponentType } from 'react';
import { fadeInUp, cardHover } from '@/lib/animations';
import { AnimatedCounter } from './AnimatedCounter';

interface IconCardProps {
    /** Icon component to display */
    icon: ComponentType<{ className?: string }>;
    /** Card title */
    title?: string;
    /** Card description */
    description?: string;
    /** Numeric value (for stat cards) */
    value?: number;
    /** Label text (for stat cards) */
    label?: string;
    /** Value prefix (e.g., '$') */
    prefix?: string;
    /** Value suffix (e.g., '+', '%') */
    suffix?: string;
    /** Layout variant */
    layout?: 'vertical' | 'horizontal' | 'stat';
    /** Additional className */
    className?: string;
    /** Use card hover animation */
    animate?: boolean;
}

export function IconCard({
    icon: Icon,
    title,
    description,
    value,
    label,
    prefix,
    suffix,
    layout = 'vertical',
    className = '',
    animate = true,
}: IconCardProps) {
    const Wrapper = animate ? motion.div : 'div';
    const wrapperProps = animate
        ? {
            variants: fadeInUp,
            initial: 'rest',
            whileHover: 'hover',
        }
        : {};

    // Stat card layout
    if (layout === 'stat') {
        return (
            <Wrapper {...wrapperProps} className={`group relative ${className}`}>
                <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="p-6 rounded-2xl bg-green-card border border-green-accent/10 text-center transition-all duration-300 hover:border-green-accent/30 hover:shadow-lg hover:shadow-green-accent/10 h-full"
                >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-secondary to-green-accent flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-accent/20">
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    {value !== undefined && (
                        <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">
                            <AnimatedCounter end={value} prefix={prefix} suffix={suffix} />
                        </div>
                    )}
                    {label && (
                        <p className="text-green-light/60 text-xs font-medium uppercase tracking-wide">
                            {label}
                        </p>
                    )}
                </motion.div>
            </Wrapper>
        );
    }

    // Horizontal layout
    if (layout === 'horizontal') {
        return (
            <Wrapper {...wrapperProps} className={`group relative ${className}`}>
                <motion.div
                    whileHover={{ y: -8 }}
                    className="relative p-8 rounded-2xl bg-green-card border border-green-accent/10 overflow-hidden transition-all duration-300 hover:border-green-accent/30 h-full"
                >
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex gap-6">
                        <motion.div
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-secondary to-green-accent flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-accent/20"
                        >
                            <Icon className="w-7 h-7 text-white" />
                        </motion.div>

                        <div>
                            {title && (
                                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-green-light transition-colors duration-300">
                                    {title}
                                </h3>
                            )}
                            {description && (
                                <p className="text-green-light/70 leading-relaxed">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>
            </Wrapper>
        );
    }

    // Vertical layout (default)
    return (
        <Wrapper {...wrapperProps} className={`group relative ${className}`}>
            <motion.div
                variants={cardHover}
                className="p-8 rounded-2xl bg-green-card border border-green-accent/10 h-full flex flex-col items-center text-center transition-colors duration-300 hover:border-green-accent/30"
            >
                {/* Icon container */}
                <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-secondary to-green-accent flex items-center justify-center mb-6 shadow-lg shadow-green-accent/20"
                >
                    <Icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Title */}
                {title && (
                    <h3 className="font-display text-xl font-bold text-white mb-4">
                        {title}
                    </h3>
                )}

                {/* Description */}
                {description && (
                    <p className="text-green-light/70 text-sm leading-relaxed">
                        {description}
                    </p>
                )}

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-green-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
        </Wrapper>
    );
}
