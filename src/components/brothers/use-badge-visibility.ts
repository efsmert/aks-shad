'use client';

import { useEffect, useRef } from 'react';

type BadgeAnimation = {
    animation: Animation;
    time: number;
    baseDuration: number | null;
    duration: number;
};
type BadgeState = { visible: boolean; animations: BadgeAnimation[] };

function prepareAnimation(animation: Animation): BadgeAnimation {
    const timing = animation.effect!.getTiming();
    const duration = Number(timing.duration);
    const isReflection = animation instanceof CSSAnimation &&
        ['champagne-flow', 'champagne-undertow'].includes(animation.animationName);
    // Preserve the independently seeded starting phase. Only reflections get
    // new timing each pass; the president's small sparkle keeps its own rhythm.
    const time = isReflection ? ((-(timing.delay ?? 0) % duration) + duration) % duration : 0;
    if (isReflection) animation.effect!.updateTiming({ delay: 0, fill: 'both' });
    animation.pause();
    animation.currentTime = time;
    return { animation, time, baseDuration: isReflection ? duration : null, duration };
}

// One clock for visible badges. Slow reflections need fewer updates than the
// display refresh rate; independent CSS periods/delays keep them out of phase.
const badges = new Map<HTMLElement, BadgeState>();
let observer: IntersectionObserver | null = null;
let reducedMotion: MediaQueryList | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;
let previousTime = 0;
const frameInterval = 1000 / 24;

function stopClock() {
    if (timer !== null) clearTimeout(timer);
    timer = null;
    previousTime = 0;
}

function tick() {
    const now = performance.now();
    const delta = now - previousTime;
    previousTime = now;
    badges.forEach(state => {
        if (!state.visible) return;
        state.animations.forEach(motion => {
            motion.time += delta;
            if (motion.baseDuration !== null && motion.time >= motion.duration) {
                // Change speed only after the reflection has left the badge.
                // A short, independently varied gap hides the reset on the left.
                const overflow = (motion.time - motion.duration) % motion.duration;
                motion.duration = motion.baseDuration * (.85 + Math.random() * .3);
                motion.time = overflow - (200 + Math.random() * 700);
                motion.animation.effect!.updateTiming({ duration: motion.duration });
            }
            motion.animation.currentTime = motion.time;
        });
    });
    timer = setTimeout(tick, frameInterval);
}

function updateVisibility() {
    let active = false;
    badges.forEach((state, element) => {
        const running = state.visible && !document.hidden && !reducedMotion?.matches;
        element.dataset.badgeMotion = running ? 'running' : 'paused';
        if (reducedMotion?.matches) state.animations = [];
        if (!running) return;
        if (!state.animations.length) {
            state.animations = element.getAnimations({ subtree: true }).map(prepareAnimation);
        }
        active ||= state.animations.length > 0;
    });
    if (!active) stopClock();
    else if (timer === null) {
        previousTime = performance.now();
        timer = setTimeout(tick, frameInterval);
    }
}

export function useBadgeVisibility() {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        if (!observer) {
            observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    const target = entry.target as HTMLElement;
                    const state = badges.get(target);
                    if (state) state.visible = entry.isIntersecting;
                });
                updateVisibility();
            });
            reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
            reducedMotion.addEventListener('change', updateVisibility);
            document.addEventListener('visibilitychange', updateVisibility);
        }
        badges.set(element, { visible: false, animations: [] });
        observer.observe(element);

        return () => {
            observer?.unobserve(element);
            badges.delete(element);
            if (!badges.size) {
                stopClock();
                observer?.disconnect();
                observer = null;
                reducedMotion?.removeEventListener('change', updateVisibility);
                reducedMotion = null;
                document.removeEventListener('visibilitychange', updateVisibility);
            } else updateVisibility();
        };
    }, []);

    return ref;
}
