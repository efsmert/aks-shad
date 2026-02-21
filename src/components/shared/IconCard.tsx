'use client';

import { motion } from 'framer-motion';
import { type ComponentType } from 'react';
import { fadeInUp } from '@/lib/animations';
import { AnimatedCounter } from './AnimatedCounter';

interface IconCardProps {
    icon: ComponentType<{ className?: string }>;
    title?: string;
    description?: string;
    value?: number;
    label?: string;
    prefix?: string;
    suffix?: string;
    layout?: 'vertical' | 'horizontal' | 'stat';
    className?: string;
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
    const wrapperProps = animate ? { variants: fadeInUp } : {};

    if (layout === 'stat') {
        return (
            <Wrapper {...wrapperProps} className={className}>
                <div className="p-6 text-center">
                    <div className="w-10 h-10 rounded-full bg-heritage-50 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-5 h-5 text-heritage-700" />
                    </div>
                    {value !== undefined && (
                        <div className="text-3xl font-display font-bold text-heritage-900 mb-1 tabular-nums">
                            <AnimatedCounter end={value} prefix={prefix} suffix={suffix} />
                        </div>
                    )}
                    {label && (
                        <p className="text-stone-500 text-xs font-medium uppercase tracking-wide">
                            {label}
                        </p>
                    )}
                </div>
            </Wrapper>
        );
    }

    if (layout === 'horizontal') {
        return (
            <Wrapper {...wrapperProps} className={`group ${className}`}>
                <div className="flex gap-5 py-6 border-b border-stone-200 transition-colors duration-200 group-hover:bg-stone-50 -mx-4 px-4">
                    <div className="w-10 h-10 rounded-full bg-heritage-50 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-heritage-700" />
                    </div>
                    <div>
                        {title && (
                            <h3 className="font-display text-lg font-bold text-heritage-900 mb-2 group-hover:text-gold-700 transition-colors duration-200">
                                {title}
                            </h3>
                        )}
                        {description && (
                            <p className="text-stone-600 leading-relaxed text-sm">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            </Wrapper>
        );
    }

    return (
        <Wrapper {...wrapperProps} className={`group ${className}`}>
            <div className="py-6">
                <div className="w-10 h-10 rounded-full bg-heritage-50 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-heritage-700" />
                </div>
                {title && (
                    <h3 className="font-display text-lg font-bold text-heritage-900 mb-3">
                        {title}
                    </h3>
                )}
                {description && (
                    <p className="text-stone-600 text-sm leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        </Wrapper>
    );
}
