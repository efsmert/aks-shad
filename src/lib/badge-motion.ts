import type { CSSProperties } from 'react';

// Stable across hydration, but unique to each brother/role and gallery sample.
export function badgeMotion(seed: string, basePeriod = 16): CSSProperties {
    let hash = 2166136261;
    for (const char of seed) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0;
    return {
        '--phase': `${-(hash % 2900) / 100}s`,
        '--period': `${basePeriod + (hash % 700) / 100}s`,
        '--secondary-period': `${basePeriod * 1.43 + (hash % 430) / 100}s`,
        '--honor-phase': `${-(hash % 1100) / 100}s`,
        // Paint each reflection once with a distinct cut; only its position animates.
        '--sheen-angle': `${65 + ((hash >>> 8) % 61)}deg`,
        '--sheen-start': `${20 + ((hash >>> 16) % 12)}%`,
        '--sheen-end': `${67 + ((hash >>> 20) % 12)}%`,
        '--sheen-core': `${46 + ((hash >>> 12) % 9)}%`,
        '--sheen-cloud-x': `${30 + ((hash >>> 6) % 31)}%`,
    } as CSSProperties;
}
