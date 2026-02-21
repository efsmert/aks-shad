'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CHAPTER_INFO, NAV_LINKS } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function Footer() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <footer
            ref={ref}
            className="relative bg-heritage-900"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate={isInView ? 'animate' : 'initial'}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
                >
                    {/* Chapter Info */}
                    <motion.div variants={fadeInUp} className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <Image
                                src="/metal-rounded.png"
                                alt="Alpha Kappa Sigma crest"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <div>
                                <h3 className="font-display font-bold text-white text-base">
                                    {CHAPTER_INFO.name}
                                </h3>
                                <p className="text-xs text-heritage-400 tracking-wide">
                                    {CHAPTER_INFO.greekLetters}
                                </p>
                            </div>
                        </div>
                        <p className="text-heritage-300 text-sm leading-relaxed max-w-xs">
                            {CHAPTER_INFO.tagline}. Building brotherhood at{' '}
                            {CHAPTER_INFO.university} since {CHAPTER_INFO.foundingYear}.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={fadeInUp}>
                        <h4 className="font-display font-semibold text-white text-sm tracking-wide uppercase mb-6">
                            Navigate
                        </h4>
                        <ul className="space-y-3">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-heritage-300 hover:text-gold-400 transition-colors duration-200 text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact */}
                    <motion.div variants={fadeInUp}>
                        <h4 className="font-display font-semibold text-white text-sm tracking-wide uppercase mb-6">
                            Contact
                        </h4>
                        <ul className="space-y-3 text-sm text-heritage-300">
                            <li>
                                <a
                                    href={`mailto:${CHAPTER_INFO.email}`}
                                    className="hover:text-gold-400 transition-colors duration-200"
                                >
                                    {CHAPTER_INFO.email}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`tel:${CHAPTER_INFO.phone}`}
                                    className="hover:text-gold-400 transition-colors duration-200"
                                >
                                    {CHAPTER_INFO.phone}
                                </a>
                            </li>
                            <li className="leading-relaxed">
                                {CHAPTER_INFO.address}
                            </li>
                        </ul>
                    </motion.div>

                    {/* Connect */}
                    <motion.div variants={fadeInUp}>
                        <h4 className="font-display font-semibold text-white text-sm tracking-wide uppercase mb-6">
                            Connect
                        </h4>
                        <div className="flex gap-4 mb-8">
                            <a
                                href={CHAPTER_INFO.socialMedia.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-heritage-300 hover:text-gold-400 transition-colors duration-200"
                                aria-label="Instagram"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" />
                                    <circle cx="12" cy="12" r="5" />
                                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                                </svg>
                            </a>
                            <a
                                href={CHAPTER_INFO.socialMedia.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-heritage-300 hover:text-gold-400 transition-colors duration-200"
                                aria-label="LinkedIn"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect x="2" y="9" width="4" height="12" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </a>
                        </div>
                        <Link
                            href="/rush"
                            className="inline-block px-5 py-2.5 bg-gold-600 text-heritage-900 font-semibold text-sm rounded-sm transition-colors duration-200 hover:bg-gold-500"
                        >
                            Rush ΑΚΣ →
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-heritage-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-heritage-400 text-xs">
                        © {new Date().getFullYear()} Alpha Kappa Sigma. All rights reserved.
                    </p>
                    <p className="text-heritage-400 text-xs">
                        Founded{' '}
                        <Link href="/ritual" className="text-heritage-400 hover:text-heritage-300" style={{ textDecoration: 'none' }}>
                            {CHAPTER_INFO.foundingYear}
                        </Link>{' '}
                        · {CHAPTER_INFO.university}
                    </p>
                </div>
            </div>
        </footer>
    );
}
