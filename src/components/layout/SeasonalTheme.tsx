'use client';

import { useEffect, type CSSProperties } from 'react';
import { usePathname } from 'next/navigation';
import { Heart, X } from 'lucide-react';
import { applySeasonalTheme } from '@/lib/seasonal-theme';

function RoseSprig({ className }: { className: string }) {
    return (
        <svg className={className} viewBox="0 0 250 410" fill="none" aria-hidden="true">
            <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 405C80 325 28 214 120 113M53 350C98 302 145 253 188 214M60 285C47 238 29 206 22 162" />
                <path d="M58 328C15 317 4 289 9 267C38 271 59 292 58 328ZM59 288C102 285 119 260 121 240C86 241 65 262 59 288ZM82 197C46 186 44 159 48 140C75 151 88 172 82 197ZM116 280C119 245 139 233 159 234C158 257 141 277 116 280Z" fill="currentColor" fillOpacity=".09" />
                <g transform="translate(122 90)">
                    <path d="M0 4C-18-11-11-25 3-20C24-30 34-9 21 4C28 24 7 36-6 24C-27 27-35 4-20-7C-21-24-2-35 10-25" />
                    <path d="M-20-7C-41-22-54 5-41 22C-48 46-20 55-6 41C12 61 40 47 36 25C59 11 47-17 29-17C28-44 3-52-11-35C-33-43-49-22-39-10" />
                    <path d="M-6 24C-17 5-5-9 10-5C24 1 16 16 4 15C-4 13-2 6 3 5M-41 22C-31 23-21 22-19 12M36 25C24 30 16 30 9 25M-11-35C-7-27-5-23 3-20" />
                    <path d="M-26 42L-18 61L0 49L17 57L22 46" />
                </g>
                <g transform="translate(194 197) rotate(22) scale(.55)">
                    <path d="M0 4C-18-11-11-25 3-20C24-30 34-9 21 4C28 24 7 36-6 24C-27 27-35 4-20-7C-21-24-2-35 10-25M-20-7C-41-22-54 5-41 22C-48 46-20 55-6 41C12 61 40 47 36 25C59 11 47-17 29-17C28-44 3-52-11-35C-33-43-49-22-39-10M-6 24C-17 5-5-9 10-5C24 1 16 16 4 15" />
                </g>
                <path d="M22 164C-1 154 5 135 13 129C32 127 37 148 22 164Z" />
            </g>
        </svg>
    );
}

export function SeasonalTheme() {
    const pathname = usePathname();
    useEffect(() => {
        applySeasonalTheme();
        const onVisibility = () => {
            document.documentElement.dataset.seasonMotion = document.hidden ? 'paused' : 'running';
            if (!document.hidden) applySeasonalTheme();
        };
        onVisibility();
        // Also return to the classic theme if an open page crosses midnight.
        const timer = window.setInterval(applySeasonalTheme, 60_000);
        document.addEventListener('visibilitychange', onVisibility);
        window.addEventListener('popstate', applySeasonalTheme);
        return () => {
            window.clearInterval(timer);
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('popstate', applySeasonalTheme);
        };
    }, [pathname]);

    const exitPreview = () => {
        try { sessionStorage.removeItem('aks-season-preview'); } catch { /* optional storage */ }
        const url = new URL(window.location.href);
        url.searchParams.delete('theme');
        window.history.replaceState(window.history.state, '', url);
        applySeasonalTheme();
    };

    return <>
        <div className="valentine-decor" aria-hidden="true">
            <RoseSprig className="valentine-sprig valentine-sprig--left" />
            <RoseSprig className="valentine-sprig valentine-sprig--right" />
            {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="valentine-petal-track" style={{
                    '--petal-x': `${7 + i * 12.3}%`, '--petal-time': `${24 + (i % 3) * 7}s`,
                    '--petal-delay': `${-i * 5.7}s`, '--petal-drift': `${i % 2 ? -64 : 78}px`,
                } as CSSProperties}>
                    <svg className="valentine-petal" width="14" height="21" viewBox="0 0 20 28" fill="currentColor">
                        <path d="M2 2C18-2 25 17 8 27C9 18-2 15 2 2Z" />
                    </svg>
                </div>
            ))}
        </div>
        <div className="season-preview-control" role="region" aria-label="Seasonal theme preview">
            <Heart className="season-preview-heart" size={13} aria-hidden="true" />
            <span>Seasonal preview</span>
            <button type="button" onClick={exitPreview}>Exit preview <X size={12} aria-hidden="true" /></button>
        </div>
    </>;
}
