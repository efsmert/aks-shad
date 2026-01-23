'use client';

import { Users, GraduationCap, Heart, Trophy } from 'lucide-react';
import { VALUES } from '@/lib/constants';
import { Section } from '@/components/shared/Section';
import { IconCard } from '@/components/shared/IconCard';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Users,
    GraduationCap,
    Heart,
    Trophy,
};

export function Values() {
    return (
        <Section
            title="Our Values"
            subtitle="The four pillars that define our brotherhood and commitment to excellence."
            backgroundDecoration={
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-primary/5 to-transparent" />
            }
            stagger
            contentClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
            {VALUES.map((value) => {
                const Icon = iconMap[value.icon] || Users;
                return (
                    <IconCard
                        key={value.title}
                        icon={Icon}
                        title={value.title}
                        description={value.description}
                        layout="vertical"
                    />
                );
            })}
        </Section>
    );
}
