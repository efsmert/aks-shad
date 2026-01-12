'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
    formatNumber?: boolean;
}

export function AnimatedCounter({
    end,
    duration = 2,
    prefix = '',
    suffix = '',
    className = '',
    formatNumber = true,
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (isInView && !hasAnimated.current) {
            hasAnimated.current = true;
            const startTime = Date.now();
            const endTime = startTime + duration * 1000;

            const updateCount = () => {
                const now = Date.now();
                const progress = Math.min((now - startTime) / (duration * 1000), 1);

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentCount = Math.floor(easeOutQuart * end);

                setCount(currentCount);

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    setCount(end);
                }
            };

            requestAnimationFrame(updateCount);
        }
    }, [isInView, end, duration]);

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {prefix}
            {formatNumber ? count.toLocaleString() : count}
            {suffix}
        </motion.span>
    );
}
