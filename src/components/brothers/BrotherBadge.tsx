'use client';

import { badgeMotion } from '@/lib/badge-motion';
import { useBadgeVisibility } from './use-badge-visibility';

const executivePositions = new Set([
    'vice president', 'secretary', 'treasurer', 'pledgemaster', 'new member educator',
    'risk manager', 'grand marshall', 'grand marshal',
]);

function getBadgeTone(label: string, kind: 'position' | 'status') {
    const role = label.trim().toLowerCase();
    if (kind === 'status') return role === 'co-op' ? 'status' : 'muted';
    if (role === 'president') return 'president';
    if (executivePositions.has(role)) return 'executive';
    if (role.endsWith('(head)')) return 'head';
    return 'member';
}

export function BrotherBadge({ label, kind = 'position', seed = label, compact = false }: {
    label: string;
    compact?: boolean;
    seed?: string;
    kind?: 'position' | 'status';
}) {
    const ref = useBadgeVisibility();
    const tone = getBadgeTone(label, kind);
    const displayLabel = tone === 'head'
        ? label.replace(/\s*\(head\)$/i, compact ? '' : ' (Head of Chair)')
        : label;
    return (
        <span
            ref={ref}
            data-badge-motion="paused"
            aria-label={tone === 'head' ? label.replace(/\s*\(head\)$/i, ' (Head of Chair)') : undefined}
            className={`brother-badge badge-champagne brother-badge--${tone}${tone === 'president' ? ' badge-president' : ''}`}
            style={badgeMotion(`${seed}:${label}`, 9)}
        >
            <span className="badge-surface" aria-hidden="true" />
            {tone === 'president' && <span className="badge-honor" aria-hidden="true" />}
            {tone === 'president' && <span className="badge-insignia" aria-hidden="true">✦</span>}
            <span className="badge-label">{displayLabel}</span>
        </span>
    );
}
