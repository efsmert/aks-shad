'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, CHAPTER_INFO } from '@/lib/constants';
import { fadeInDown, navUnderline, staggerContainer, fadeInUp } from '@/lib/animations';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? 'glass py-3'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative"
                        >
                            <Image
                                src="/metal-rounded.png"
                                alt="Alpha Kappa Sigma Logo"
                                width={48}
                                height={48}
                                className="rounded-full"
                            />
                        </motion.div>
                        <div className="hidden sm:block">
                            <p className="font-display font-bold text-white text-lg">Alpha Kappa Sigma</p>
                            <p className="text-xs text-green-light/70">Est. {CHAPTER_INFO.foundingYear}</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <motion.nav
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="hidden md:flex items-center gap-8"
                    >
                        {NAV_LINKS.map((link, index) => {
                            // Home is exact match, other pages match if pathname starts with the link
                            const isActive = link.href === '/'
                                ? pathname === '/'
                                : pathname.startsWith(link.href);
                            return (
                                <motion.div key={link.href} variants={fadeInDown}>
                                    <NavLink href={link.href} label={link.label} isActive={isActive} />
                                </motion.div>
                            );
                        })}
                    </motion.nav>

                    {/* Mobile Menu Button */}
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-80 bg-green-dark-bg border-l border-green-accent/20">
                            <div className="flex flex-col h-full py-8">
                                {/* Centered Logo Header */}
                                <div className="flex flex-col items-center gap-3 mb-10 pb-8 border-b border-green-accent/10">
                                    <Image
                                        src="/metal-rounded.png"
                                        alt="Alpha Kappa Sigma Logo"
                                        width={56}
                                        height={56}
                                        className="rounded-full"
                                    />
                                    <div className="text-center">
                                        <p className="font-display font-bold text-white text-lg">Alpha Kappa Sigma</p>
                                        <p className="text-xs text-green-light/60 tracking-wider uppercase">Est. {CHAPTER_INFO.foundingYear}</p>
                                    </div>
                                </div>

                                {/* Navigation Links */}
                                <nav className="flex flex-col gap-2 px-2">
                                    {NAV_LINKS.map((link, index) => {
                                        const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                                        return (
                                            <motion.div
                                                key={link.href}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className={`group relative flex items-center gap-4 py-4 px-5 rounded-xl text-lg font-medium transition-all duration-300 ${isActive
                                                        ? 'bg-gradient-to-r from-green-accent/20 to-green-secondary/10 text-green-accent border border-green-accent/30'
                                                        : 'text-white hover:bg-green-card hover:text-green-light border border-transparent hover:border-green-accent/10'
                                                        }`}
                                                >
                                                    {/* Active indicator dot */}
                                                    <span className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive
                                                        ? 'bg-green-accent shadow-[0_0_8px_rgba(45,212,191,0.6)]'
                                                        : 'bg-green-accent/30 group-hover:bg-green-accent/50'
                                                        }`} />
                                                    {link.label}
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </nav>

                                {/* CTA Button */}
                                <div className="mt-auto px-2">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <Link
                                            href="/rush"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="group relative block w-full py-4 px-6 bg-gradient-to-r from-green-secondary to-green-accent text-white font-bold text-center rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-green-accent/40 hover:scale-[1.02]"
                                        >
                                            <span className="relative z-10">Rush ΑΚΣ</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-green-accent to-green-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </motion.header>
    );
}

interface NavLinkProps {
    href: string;
    label: string;
    isActive: boolean;
}

function NavLink({ href, label, isActive }: NavLinkProps) {
    return (
        <Link href={href} className="relative group">
            <span
                className={`text-sm font-medium transition-colors duration-300 ${isActive ? 'text-green-accent' : 'text-white hover:text-green-light'
                    }`}
            >
                {label}
            </span>
            <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-accent to-green-light"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: isActive ? 1 : 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
        </Link>
    );
}
