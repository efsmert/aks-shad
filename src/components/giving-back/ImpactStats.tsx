'use client';

import { Clock, Calendar, DollarSign, Users, Handshake, GraduationCap } from 'lucide-react';
import { impactStats } from '@/data/philanthropy';
import { Section } from '@/components/shared/Section';
import { IconCard } from '@/components/shared/IconCard';

const stats = [
    {
        icon: Clock,
        value: impactStats.totalHours,
        label: 'Volunteer Hours',
        suffix: '+',
    },
    {
        icon: Calendar,
        value: impactStats.eventsHosted,
        label: 'Events Hosted',
        suffix: '',
    },
    {
        icon: DollarSign,
        value: impactStats.moneyRaised,
        label: 'Raised for Charity',
        prefix: '$',
        suffix: '+',
    },
    {
        icon: Users,
        value: impactStats.communitiesServed,
        label: 'Communities Served',
        suffix: '',
    },
    {
        icon: Handshake,
        value: impactStats.partnersWorkedWith,
        label: 'Partner Organizations',
        suffix: '',
    },
    {
        icon: GraduationCap,
        value: impactStats.studentsmentored,
        label: 'Students Mentored',
        suffix: '+',
    },
];

export function ImpactStats() {
    return (
        <Section
            title="Our Impact"
            subtitle="The numbers that represent our commitment to service and community."
            backgroundDecoration={
                <div className="absolute inset-0 bg-gradient-to-b from-green-primary/5 via-transparent to-green-primary/5" />
            }
            stagger
            contentClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-16"
        >
            {stats.map((stat) => (
                <IconCard
                    key={stat.label}
                    icon={stat.icon}
                    value={stat.value}
                    label={stat.label}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    layout="stat"
                />
            ))}
        </Section>
    );
}
