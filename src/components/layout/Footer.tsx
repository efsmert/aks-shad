'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { CHAPTER_INFO, NAV_LINKS } from '@/lib/constants';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const socialLinks = [
    { icon: Instagram, href: CHAPTER_INFO.socialMedia.instagram, label: 'Instagram' },
    { icon: Linkedin, href: CHAPTER_INFO.socialMedia.linkedin, label: 'LinkedIn' },
];

export function Footer() {
    return (
        <footer className="relative bg-green-dark-bg border-t border-green-accent/10">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-primary/5 to-transparent pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
                >
                    {/* Chapter Info */}
                    <motion.div variants={fadeInUp} className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <Image
                                src="/metal-rounded.png"
                                alt="Alpha Kappa Sigma Logo"
                                width={48}
                                height={48}
                                className="rounded-full"
                            />
                            <div>
                                <h3 className="font-display font-bold text-white text-lg">{CHAPTER_INFO.name}</h3>
                                <p className="text-xs text-green-light/70">{CHAPTER_INFO.greekLetters}</p>
                            </div>
                        </div>
                        <p className="text-green-light/80 text-sm leading-relaxed mb-4">
                            {CHAPTER_INFO.tagline}
                        </p>
                        <p className="text-green-light/60 text-sm">
                            Established {CHAPTER_INFO.foundingYear}
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={fadeInUp}>
                        <h4 className="font-display font-semibold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-green-light/70 hover:text-green-accent transition-colors duration-300 text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-accent/50 group-hover:bg-green-accent transition-colors duration-300" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={fadeInUp}>
                        <h4 className="font-display font-semibold text-white mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href={`mailto:${CHAPTER_INFO.email}`}
                                    className="text-green-light/70 hover:text-green-accent transition-colors duration-300 text-sm flex items-start gap-3 group"
                                >
                                    <Mail className="w-4 h-4 mt-0.5 text-green-accent/70 group-hover:text-green-accent transition-colors duration-300" />
                                    {CHAPTER_INFO.email}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`tel:${CHAPTER_INFO.phone}`}
                                    className="text-green-light/70 hover:text-green-accent transition-colors duration-300 text-sm flex items-start gap-3 group"
                                >
                                    <Phone className="w-4 h-4 mt-0.5 text-green-accent/70 group-hover:text-green-accent transition-colors duration-300" />
                                    {CHAPTER_INFO.phone}
                                </a>
                            </li>
                            <li className="text-green-light/70 text-sm flex items-start gap-3">
                                <MapPin className="w-4 h-4 mt-0.5 text-green-accent/70 flex-shrink-0" />
                                <span>{CHAPTER_INFO.address}</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div variants={fadeInUp}>
                        <h4 className="font-display font-semibold text-white mb-6">Connect With Us</h4>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-full bg-green-card border border-green-accent/20 flex items-center justify-center text-green-light/70 hover:text-green-accent hover:border-green-accent/50 hover:bg-green-accent/10 transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                        <div className="mt-8">
                            <Link
                                href="/rush"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-secondary to-green-accent text-white font-semibold rounded-full text-sm hover:shadow-lg hover:shadow-green-accent/30 transition-all duration-300"
                            >
                                Rush ΑΚΣ
                                <span className="text-lg">→</span>
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 pt-8 border-t border-green-accent/10 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                    <p className="text-green-light/50 text-sm">
                        © {new Date().getFullYear()} Alpha Kappa Sigma. All rights reserved.
                    </p>
                    <p className="text-green-light/50 text-sm">
                        Founded {CHAPTER_INFO.foundingYear} • {CHAPTER_INFO.university}
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
