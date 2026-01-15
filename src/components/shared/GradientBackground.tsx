'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

// Static particle data with fly-in directions (8 particles - more visible)
const particles = [
    { id: 1, x: 12, y: 18, size: 4, duration: 28, flyX: -150, flyY: -100 },
    { id: 2, x: 88, y: 12, size: 5, duration: 32, flyX: 150, flyY: -120 },
    { id: 3, x: 22, y: 72, size: 4, duration: 26, flyX: -180, flyY: 100 },
    { id: 4, x: 75, y: 78, size: 5, duration: 30, flyX: 160, flyY: 120 },
    { id: 5, x: 48, y: 32, size: 4, duration: 34, flyX: 0, flyY: -150 },
    { id: 6, x: 62, y: 52, size: 3, duration: 29, flyX: 100, flyY: 0 },
    { id: 7, x: 35, y: 45, size: 4, duration: 31, flyX: -120, flyY: 50 },
    { id: 8, x: 82, y: 38, size: 5, duration: 27, flyX: 140, flyY: -80 },
];

export function GradientBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const [isMounted, setIsMounted] = useState(false);
    const lastUpdate = useRef(0);
    const THROTTLE_MS = 200; // ~5 updates per second

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const now = Date.now();
        if (now - lastUpdate.current >= THROTTLE_MS) {
            lastUpdate.current = now;
            setMousePosition({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            });
        }
    }, []);

    useEffect(() => {
        setIsMounted(true);
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-green-dark-bg" />

            {/* Floating particles - render immediately for instant fly-in on page load */}
            {particles.map((particle, index) => (
                <div
                    key={particle.id}
                    className="absolute rounded-full animate-particle-fly-in"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        backgroundColor: 'rgba(46, 204, 113, 0.5)',
                        boxShadow: `0 0 ${particle.size * 3}px rgba(46, 204, 113, 0.4), 0 0 ${particle.size * 6}px rgba(46, 204, 113, 0.2)`,
                        // CSS variables for fly-in direction
                        '--fly-x': `${particle.flyX}px`,
                        '--fly-y': `${particle.flyY}px`,
                        // Stagger the animation start for each particle
                        animationDelay: `${index * 0.08}s`,
                    } as React.CSSProperties}
                    // After fly-in completes, transition to drift animation
                    onAnimationEnd={(e) => {
                        const el = e.currentTarget;
                        el.classList.remove('animate-particle-fly-in');
                        el.classList.add('animate-particle-drift');
                        el.style.animationDuration = `${particle.duration}s`;
                        el.style.animationDelay = `${-particle.duration * (index / particles.length)}s`;
                    }}
                />
            ))}

            {/* Gradient orbs with slow drift + mouse tracking */}
            {isMounted && (
                <>
                    <div
                        className="absolute w-[550px] h-[550px] rounded-full animate-orb-drift-1"
                        style={{
                            left: `calc(5% + ${(mousePosition.x - 0.5) * 50}px)`,
                            top: `calc(15% + ${(mousePosition.y - 0.5) * 50}px)`,
                            background: 'radial-gradient(circle, rgba(13, 77, 43, 0.45) 0%, transparent 60%)',
                            transition: 'left 0.8s ease-out, top 0.8s ease-out',
                        }}
                    />
                    <div
                        className="absolute w-[450px] h-[450px] rounded-full animate-orb-drift-2"
                        style={{
                            right: `calc(10% + ${(mousePosition.x - 0.5) * -40}px)`,
                            top: `calc(35% + ${(mousePosition.y - 0.5) * -40}px)`,
                            background: 'radial-gradient(circle, rgba(26, 125, 78, 0.35) 0%, transparent 60%)',
                            transition: 'right 0.8s ease-out, top 0.8s ease-out',
                        }}
                    />
                    <div
                        className="absolute w-[400px] h-[400px] rounded-full animate-orb-drift-3"
                        style={{
                            left: `calc(40% + ${(mousePosition.x - 0.5) * 35}px)`,
                            bottom: `calc(10% + ${(mousePosition.y - 0.5) * 35}px)`,
                            background: 'radial-gradient(circle, rgba(46, 204, 113, 0.25) 0%, transparent 60%)',
                            transition: 'left 0.8s ease-out, bottom 0.8s ease-out',
                        }}
                    />
                    <div
                        className="absolute w-[350px] h-[350px] rounded-full animate-orb-drift-4"
                        style={{
                            left: `calc(20% + ${(mousePosition.x - 0.5) * -25}px)`,
                            top: `calc(50% + ${(mousePosition.y - 0.5) * -25}px)`,
                            background: 'radial-gradient(circle, rgba(13, 77, 43, 0.3) 0%, transparent 60%)',
                            transition: 'left 0.8s ease-out, top 0.8s ease-out',
                        }}
                    />
                </>
            )}

            {/* Subtle vignette overlay with shifting animation */}
            <div
                className="absolute inset-0 pointer-events-none animate-vignette-shift"
                style={{
                    background: 'radial-gradient(ellipse 120% 120% at var(--vignette-x, 50%) var(--vignette-y, 50%), transparent 0%, rgba(10, 15, 13, 0.4) 70%)',
                    backgroundSize: '200% 200%',
                }}
            />

            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `linear-gradient(rgba(46, 204, 113, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(46, 204, 113, 0.5) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />
        </div>
    );
}
