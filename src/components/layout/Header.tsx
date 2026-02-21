'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { NAV_LINKS, CHAPTER_INFO } from '@/lib/constants';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

// Routes where the hero section has a dark background
const DARK_HERO_ROUTES = ['/giving-back'];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // When on a dark-hero page and not scrolled, use light text
    const hasDarkHero = DARK_HERO_ROUTES.some(route => pathname.startsWith(route));
    const useLightText = hasDarkHero && !isScrolled;

    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 20);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out-quart ${isScrolled
                ? 'bg-[oklch(97%_0.003_60_/_0.95)] shadow-[0_1px_0_oklch(88%_0.008_60)] backdrop-blur-sm py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/metal-rounded.png"
                            alt="Alpha Kappa Sigma crest"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <div className="hidden sm:block">
                            <p className={`font-display font-bold text-base tracking-tight transition-colors duration-300 ${useLightText ? 'text-white' : 'text-heritage-900'
                                }`}>
                                Alpha Kappa Sigma
                            </p>
                            <p className={`text-[0.7rem] tracking-wider uppercase transition-colors duration-300 ${useLightText ? 'text-stone-300' : 'text-stone-500'
                                }`}>
                                Est. {CHAPTER_INFO.foundingYear}
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((link) => {
                            const isActive =
                                link.href === '/'
                                    ? pathname === '/'
                                    : pathname.startsWith(link.href);
                            return (
                                <NavLink
                                    key={link.href}
                                    href={link.href}
                                    label={link.label}
                                    isActive={isActive}
                                    light={useLightText}
                                />
                            );
                        })}
                        <Link
                            href="/rush"
                            className={`ml-4 px-5 py-2 text-sm font-semibold rounded-sm transition-colors duration-300 ${useLightText
                                ? 'bg-white text-heritage-900 hover:bg-stone-100'
                                : 'bg-heritage-900 text-white hover:bg-heritage-800'
                                }`}
                        >
                            Rush ΑΚΣ
                        </Link>
                    </nav>

                    {/* Mobile Menu */}
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`transition-colors duration-300 ${useLightText
                                    ? 'text-white hover:bg-white/10'
                                    : 'text-heritage-900 hover:bg-heritage-50'
                                    }`}
                                aria-label="Open navigation menu"
                            >
                                <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                                    <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-80 bg-[oklch(97%_0.003_60)] border-l border-stone-200"
                        >
                            <div className="flex flex-col h-full py-8">
                                {/* Logo */}
                                <div className="flex items-center gap-3 mb-10 pb-8 border-b border-stone-200">
                                    <Image
                                        src="/metal-rounded.png"
                                        alt="Alpha Kappa Sigma crest"
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <p className="font-display font-bold text-heritage-900 text-lg">
                                            Alpha Kappa Sigma
                                        </p>
                                        <p className="text-xs text-stone-500 tracking-wider uppercase">
                                            Est. {CHAPTER_INFO.foundingYear}
                                        </p>
                                    </div>
                                </div>

                                {/* Links */}
                                <nav className="flex flex-col gap-1 px-1">
                                    {NAV_LINKS.map((link, index) => {
                                        const isActive =
                                            link.href === '/'
                                                ? pathname === '/'
                                                : pathname.startsWith(link.href);
                                        return (
                                            <motion.div
                                                key={link.href}
                                                initial={{ opacity: 0, x: 16 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: index * 0.06,
                                                    duration: 0.35,
                                                    ease: [0.25, 1, 0.5, 1],
                                                }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className={`block py-3 px-4 text-base font-medium transition-colors duration-200 rounded-sm ${isActive
                                                        ? 'text-heritage-900 bg-heritage-50'
                                                        : 'text-stone-600 hover:text-heritage-900 hover:bg-stone-50'
                                                        }`}
                                                >
                                                    {link.label}
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </nav>

                                {/* CTA */}
                                <div className="mt-auto px-1">
                                    <Link
                                        href="/rush"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block w-full py-3 px-6 bg-heritage-900 text-white font-semibold text-center rounded-sm transition-colors duration-200 hover:bg-heritage-800"
                                    >
                                        Rush ΑΚΣ
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}

interface NavLinkProps {
    href: string;
    label: string;
    isActive: boolean;
    light?: boolean;
}

function NavLink({ href, label, isActive, light }: NavLinkProps) {
    return (
        <Link
            href={href}
            className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${isActive
                ? (light ? 'text-white' : 'text-heritage-900')
                : (light ? 'text-stone-300 hover:text-white' : 'text-stone-500 hover:text-heritage-900')
                }`}
        >
            {label}
            {isActive && (
                <motion.div
                    layoutId="nav-indicator"
                    className={`absolute bottom-0 left-3 right-3 h-[2px] ${light ? 'bg-gold-400' : 'bg-gold-600'}`}
                    transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                />
            )}
        </Link>
    );
}

