'use client';

import { useState, type CSSProperties } from 'react';
import Link from 'next/link';
import styles from './style-lab.module.css';
import { badgeMotion } from '@/lib/badge-motion';

const concepts = [
    { id: 'silk', name: 'Emerald silk', note: 'Soft folds of green. A quiet, tailored finish.', motion: 'Slow drift', depth: 'Flat', period: '24s' },
    { id: 'champagne', name: 'Brushed champagne', note: 'Warm metal with a broad, uninterrupted reflection.', motion: 'Polished glide', depth: 'Inset only', period: '9s' },
    { id: 'aurora', name: 'Northern lights', note: 'Blue-green light pooling across a deep ink surface.', motion: 'Fluid crossflow', depth: 'Very low', period: '18s' },
    { id: 'halo', name: 'Orbit outline', note: 'The color moves along the edge. The center stays calm.', motion: 'Continuous orbit', depth: 'None', period: '14s' },
    { id: 'porcelain', name: 'Opal porcelain', note: 'A pale, pearlescent wash with crisp, dark lettering.', motion: 'Gentle color shift', depth: 'Flat', period: '28s' },
    { id: 'tide', name: 'Tidal glass', note: 'Wide, overlapping currents beneath a glassy surface.', motion: 'Liquid ripple', depth: 'Low', period: '12s' },
    { id: 'foil', name: 'Heritage foil', note: 'Engraved edges and slowly drifting metallic light.', motion: 'Measured sweep', depth: 'Inset only', period: '22s' },
    { id: 'nebula', name: 'Velvet nebula', note: 'Soft violet and bronze clouds. The most expressive option.', motion: 'Rich, fluid swirl', depth: 'Soft lift', period: '10s' },
] as const;

const roles = [
    { label: 'President', tone: 'president' },
    { label: 'Vice President', tone: 'executive' },
    { label: 'Webmaster (Head)', tone: 'head' },
    { label: 'Webmaster', tone: 'member' },
    { label: 'Co-op', tone: 'status' },
    { label: 'Graduated', tone: 'muted' },
];

export default function StyleLab() {
    const [dark, setDark] = useState(true);
    const [paused, setPaused] = useState(false);
    const [enlarged, setEnlarged] = useState(true);
    const [selected, setSelected] = useState<string[]>([]);

    const toggle = (id: string) => setSelected(current => current.includes(id)
        ? current.filter(item => item !== id) : [...current, id]);

    return (
        <div data-badge-lab className={styles.lab} data-theme={dark ? 'dark' : 'light'} data-paused={paused} data-enlarged={enlarged}>
            <div className={styles.wrap}>
                <header className={styles.intro}>
                    <div>
                        <Link href="/brothers" className={styles.back}>← Back to the brothers</Link>
                        <p className={styles.eyebrow}>ΑΚΣ / MATERIAL STUDIES</p>
                        <h1>Eight ways to wear the title.</h1>
                        <p className={styles.lead}>Same roles. Different character. Compare the movement, finish, and depth—then shortlist your favorites.</p>
                    </div>
                    <span className={styles.edition}>01—08<br /><small>BADGE COLLECTION</small></span>
                </header>

                <div className={styles.toolbar} aria-label="Preview controls">
                    <div className={styles.controls}>
                        <button type="button" aria-pressed={dark} onClick={() => setDark(!dark)}>{dark ? 'Dark canvas' : 'Light canvas'} <span>↔</span></button>
                        <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Resume motion' : 'Pause motion'}</button>
                        <button type="button" aria-pressed={enlarged} onClick={() => setEnlarged(!enlarged)}>{enlarged ? 'Close-up' : 'Actual size'} <span>↔</span></button>
                    </div>
                    <p className={styles.selection} aria-live="polite">{selected.length ? `Shortlisted: ${concepts.filter(c => selected.includes(c.id)).map(c => `${String(concepts.indexOf(c) + 1).padStart(2, '0')} ${c.name}`).join(' · ')}` : 'Choose any favorites below'}</p>
                </div>

                <div className={styles.grid}>
                    {concepts.map((concept, index) => (
                        <article key={concept.id} className={styles.card} data-selected={selected.includes(concept.id)}>
                            <div className={styles.cardHeader}>
                                <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
                                <div><h2>{concept.name}</h2><p>{concept.note}</p></div>
                            </div>
                            <div className={styles.stage} data-style={concept.id} style={{ '--period': concept.period } as CSSProperties}>
                                <div className={styles.samples}>
                                    {roles.map((role) => (
                                        <span key={role.tone} className={`${styles.badge} ${concept.id === 'champagne' ? 'badge-champagne' : ''} ${role.tone === 'president' ? 'badge-president' : ''}`} data-tone={role.tone} style={badgeMotion(`${concept.id}:${role.tone}`, parseFloat(concept.period))}>
                                            <span className={`${styles.surface} badge-surface`} aria-hidden="true" />
                                            {role.tone === 'president' && <span className="badge-honor" aria-hidden="true" />}
                                            <span className={styles.ink}>{role.tone === 'president' && <span className={`${styles.star} badge-insignia`} aria-hidden="true">✦</span>}{role.label}</span>
                                        </span>
                                    ))}
                                </div>
                                <div className={styles.longSample}>
                                    <span className={`${styles.badge} ${concept.id === 'champagne' ? 'badge-champagne' : ''}`} data-tone="head" style={badgeMotion(`${concept.id}:long-label`, parseFloat(concept.period))}>
                                        <span className={`${styles.surface} badge-surface`} aria-hidden="true" />
                                        <span className={styles.ink}>Alumni Outreach and Engagement (Head)</span>
                                    </span>
                                    <small>LONG LABEL</small>
                                </div>
                            </div>
                            <div className={styles.cardFooter}>
                                <p>{concept.motion}<span> / </span>{concept.depth}</p>
                                <button type="button" aria-label={`Shortlist ${concept.name}`} aria-pressed={selected.includes(concept.id)} onClick={() => toggle(concept.id)}>{selected.includes(concept.id) ? '✓ Shortlisted' : '+ Shortlist'}</button>
                            </div>
                        </article>
                    ))}
                </div>
                <p className={styles.footnote}>Tell me the numbers you like, or mix a finish from one with the movement of another. Your shortlist is a preview choice; it doesn’t change the website.</p>
            </div>
        </div>
    );
}
