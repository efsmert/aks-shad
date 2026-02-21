'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-end pb-20 lg:pb-28 overflow-hidden">
            {/* Subtle background texture */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />



            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
                    {/* Left: Main content — left-aligned, editorial */}
                    <div className="lg:col-span-7 pt-32 lg:pt-40">
                        {/* Overline */}
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                            className="text-gold-600 text-sm font-semibold tracking-[0.2em] uppercase mb-6"
                        >
                            Northeastern University · Est. 1919
                        </motion.p>

                        {/* Title — Large, serif, left-aligned */}
                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                            className="font-display font-black text-heritage-900 leading-[0.95] mb-8"
                            style={{ fontSize: 'clamp(3.5rem, 8vw, 8rem)' }}
                        >
                            <span className="block">Alpha</span>
                            <span className="block">Kappa</span>
                            <span className="block text-gold-600">Sigma</span>
                        </motion.h1>

                        {/* Greek letters — refined, integrated */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                            className="flex items-center gap-6 mb-8"
                        >
                            <span className="font-display text-5xl lg:text-6xl font-black text-heritage-900 tracking-[0.15em]">
                                ΑΚΣ
                            </span>
                            <div className="h-12 w-[1px] bg-stone-300" />
                            <p className="text-stone-500 text-base lg:text-lg font-light italic">
                                Advancement of Kindred Sympathy
                            </p>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                            className="text-stone-600 text-lg leading-relaxed max-w-lg mb-10"
                        >
                            Over a century of building lifelong bonds, developing leaders, and creating
                            a community rooted in genuine care and mutual growth.
                        </motion.p>

                        {/* CTA — asymmetric, intentional hierarchy */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                            className="flex flex-wrap items-center gap-4"
                        >
                            <Link
                                href="/rush"
                                className="px-7 py-3.5 bg-heritage-900 text-white font-semibold text-sm rounded-sm transition-all duration-200 hover:bg-heritage-800"
                            >
                                Rush ΑΚΣ
                            </Link>
                            <Link
                                href="/brothers"
                                className="px-7 py-3.5 border border-heritage-900 text-heritage-900 font-semibold text-sm rounded-sm transition-all duration-200 hover:bg-heritage-900 hover:text-white"
                            >
                                Meet Our Brothers
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right: Crest / visual anchor */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                        className="lg:col-span-5 flex justify-center lg:justify-end"
                    >
                        <div className="relative">
                            {/* Decorative ring */}
                            <div className="absolute -inset-6 rounded-full border border-stone-200" />
                            <div className="absolute -inset-12 rounded-full border border-stone-100" />
                            <Image
                                src="/metal-rounded.png"
                                alt="Alpha Kappa Sigma chapter crest"
                                width={320}
                                height={320}
                                className="rounded-full relative z-10"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Stats strip — beneath the hero fold */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    className="mt-16 pt-8 border-t border-stone-200 grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    {[
                        { value: '1919', label: 'Year Founded' },
                        { value: '46+', label: 'Active Brothers' },
                        { value: '500+', label: 'Alumni Network' },
                        { value: '100+', label: 'Years of Brotherhood' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.8 + i * 0.08,
                                duration: 0.5,
                                ease: [0.25, 1, 0.5, 1],
                            }}
                        >
                            <p className="font-display text-3xl lg:text-4xl font-bold text-heritage-900 tabular-nums">
                                {stat.value}
                            </p>
                            <p className="text-stone-500 text-sm mt-1">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
