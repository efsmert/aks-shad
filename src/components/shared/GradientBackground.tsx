'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function GradientBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-green-dark-bg" />

            {/* Animated gradient orbs - only render after mount */}
            {isMounted && (
                <>
                    <motion.div
                        className="absolute w-[600px] h-[600px] rounded-full bg-green-primary/30 blur-3xl"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            x: mousePosition.x * 100 - 300,
                            y: mousePosition.y * 100 - 300,
                        }}
                        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
                        style={{ left: '10%', top: '20%' }}
                    />
                    <motion.div
                        className="absolute w-[500px] h-[500px] rounded-full bg-green-secondary/20 blur-3xl"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            x: -mousePosition.x * 80,
                            y: -mousePosition.y * 80,
                        }}
                        transition={{ type: 'spring', stiffness: 30, damping: 20 }}
                        style={{ right: '10%', top: '40%' }}
                    />
                    <motion.div
                        className="absolute w-[400px] h-[400px] rounded-full bg-green-accent/10 blur-3xl"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            x: mousePosition.x * 50,
                            y: mousePosition.y * 50,
                        }}
                        transition={{ type: 'spring', stiffness: 40, damping: 25 }}
                        style={{ left: '50%', bottom: '10%' }}
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
