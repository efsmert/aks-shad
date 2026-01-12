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
                                src="/logo.jpg"
                                alt="Alpha Kappa Sigma Logo"
                                width={48}
                                height={48}
                                className="rounded-full shadow-lg shadow-green-accent/20"
                            />
                            <div className="absolute inset-0 rounded-full bg-green-accent/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                        {NAV_LINKS.map((link, index) => (
                            <motion.div key={link.href} variants={fadeInDown}>
                                <NavLink href={link.href} label={link.label} isActive={pathname === link.href} />
                            </motion.div>
                        ))}
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
                                <div className="flex items-center gap-3 mb-12">
                                    <Image
                                        src="/logo.jpg"
                                        alt="Alpha Kappa Sigma Logo"
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <p className="font-display font-bold text-white">Alpha Kappa Sigma</p>
                                    </div>
                                </div>
                                <nav className="flex flex-col gap-4">
                                    {NAV_LINKS.map((link, index) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`block py-3 px-4 rounded-lg text-lg font-medium transition-all duration-300 ${pathname === link.href
                                                    ? 'bg-green-accent/20 text-green-accent'
                                                    : 'text-white hover:bg-white/5 hover:text-green-light'
                                                    }`}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>
                                <div className="mt-auto">
                                    <Link
                                        href="/rush"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block w-full py-4 px-6 bg-gradient-to-r from-green-secondary to-green-accent text-white font-semibold text-center rounded-xl hover:shadow-lg hover:shadow-green-accent/30 transition-all duration-300"
                                    >
                                        Rush ΑΚΣ
                                    </Link>
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
                initial={{ scaleX: isActive ? 1 : 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
        </Link>
    );
}
