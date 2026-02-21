'use client';

import { Section } from '@/components/shared/Section';
import { fadeInUp } from '@/lib/animations';
import { motion } from 'framer-motion';

const benefits = [
    {
        title: 'Brotherhood',
        description: 'Form lifelong friendships with men who share your values and aspirations. Your brothers will be there through every challenge and celebration.',
    },
    {
        title: 'Leadership',
        description: 'Develop essential skills through chapter positions, campus involvement, and professional development opportunities.',
    },
    {
        title: 'Service',
        description: 'Make a real difference in your community through meaningful volunteer work and philanthropy events.',
    },
    {
        title: 'Social Life',
        description: 'Enjoy an active social calendar including formals, mixers, philanthropy events, and brotherhood activities.',
    },
];

export function WhyJoin() {
    return (
        <Section
            title="Why Join ΑΚΣ?"
            subtitle="Being part of Alpha Kappa Sigma means gaining experiences and connections that last a lifetime."
            background="muted"
            stagger
            contentClassName="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-12"
        >
            {benefits.map((benefit, index) => (
                <motion.div key={benefit.title} variants={fadeInUp} className="group">
                    <div className="flex items-start gap-4">
                        <span className="font-display text-3xl font-bold text-heritage-200 tabular-nums select-none leading-none shrink-0 pt-1">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                            <h3 className="font-display text-lg font-bold text-heritage-900 mb-2 group-hover:text-gold-700 transition-colors duration-200">
                                {benefit.title}
                            </h3>
                            <p className="text-stone-600 text-sm leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </Section>
    );
}
