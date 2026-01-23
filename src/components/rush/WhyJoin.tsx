'use client';

import { Users, Award, Heart, PartyPopper } from 'lucide-react';
import { Section } from '@/components/shared/Section';
import { IconCard } from '@/components/shared/IconCard';

const benefits = [
    {
        icon: Users,
        title: 'Brotherhood',
        description: 'Form lifelong friendships with men who share your values and aspirations. Your brothers will be there through every challenge and celebration.',
    },
    {
        icon: Award,
        title: 'Leadership',
        description: 'Develop essential skills through chapter positions, campus involvement, and professional development opportunities.',
    },
    {
        icon: Heart,
        title: 'Service',
        description: 'Make a real difference in your community through meaningful volunteer work and philanthropy events.',
    },
    {
        icon: PartyPopper,
        title: 'Social Life',
        description: 'Enjoy an active social calendar including formals, mixers, philanthropy events, and brotherhood activities.',
    },
];

export function WhyJoin() {
    return (
        <Section
            title="Why Join ΑΚΣ?"
            subtitle="Being part of Alpha Kappa Sigma means gaining experiences and connections that last a lifetime."
            stagger
            contentClassName="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16"
        >
            {benefits.map((benefit) => (
                <IconCard
                    key={benefit.title}
                    icon={benefit.icon}
                    title={benefit.title}
                    description={benefit.description}
                    layout="horizontal"
                />
            ))}
        </Section>
    );
}
