'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

export function GradientBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const [isMounted, setIsMounted] = useState(false);
    const lastUpdate = useRef(0);
    const THROTTLE_MS = 100; // ~10 updates per second

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

    // Calculate orb positions (using CSS transitions instead of Framer Motion springs)
    const orb1Transform = isMounted
        ? `translate(${(mousePosition.x - 0.5) * 80}px, ${(mousePosition.y - 0.5) * 80}px)`
        : 'translate(0, 0)';
    const orb2Transform = isMounted
        ? `translate(${-(mousePosition.x - 0.5) * 60}px, ${-(mousePosition.y - 0.5) * 60}px)`
        : 'translate(0, 0)';
    const orb3Transform = isMounted
        ? `translate(${(mousePosition.x - 0.5) * 40}px, ${(mousePosition.y - 0.5) * 40}px)`
        : 'translate(0, 0)';

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-green-dark-bg" />

            {/* Gradient orbs - Using CSS transitions instead of Framer Motion */}
            {isMounted && (
                <>
                    <div
                        className="absolute w-[600px] h-[600px] rounded-full transition-transform duration-500 ease-out"
                        style={{
                            left: '10%',
                            top: '20%',
                            background: 'radial-gradient(circle, rgba(13, 77, 43, 0.4) 0%, rgba(13, 77, 43, 0.15) 40%, transparent 70%)',
                            transform: orb1Transform,
                        }}
                    />
                    <div
                        className="absolute w-[500px] h-[500px] rounded-full transition-transform duration-500 ease-out"
                        style={{
                            right: '10%',
                            top: '40%',
                            background: 'radial-gradient(circle, rgba(26, 125, 78, 0.35) 0%, rgba(26, 125, 78, 0.12) 40%, transparent 70%)',
                            transform: orb2Transform,
                        }}
                    />
                    <div
                        className="absolute w-[400px] h-[400px] rounded-full transition-transform duration-500 ease-out"
                        style={{
                            left: '50%',
                            bottom: '10%',
                            background: 'radial-gradient(circle, rgba(46, 204, 113, 0.25) 0%, rgba(46, 204, 113, 0.08) 40%, transparent 70%)',
                            transform: orb3Transform,
                        }}
                    />
                </>
            )}

            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(rgba(46, 204, 113, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(46, 204, 113, 0.5) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                }}
            />
        </div>
    );
}
