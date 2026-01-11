'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Linkedin, Instagram, MapPin, GraduationCap, Quote } from 'lucide-react';
import { Brother } from '@/types';
import { ROLE_LABELS, ROLE_COLORS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { modalContent } from '@/lib/animations';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface BrotherProfileProps {
    brother: Brother | null;
    isOpen: boolean;
    onClose: () => void;
}

export function BrotherProfile({ brother, isOpen, onClose }: BrotherProfileProps) {
    if (!brother) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-green-card border-green-accent/20 p-0 overflow-hidden">
                <VisuallyHidden>
                    <DialogTitle>{brother.firstName} {brother.lastName} Profile</DialogTitle>
                </VisuallyHidden>

                <motion.div
                    variants={modalContent}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="relative"
                >
                    {/* Header with image */}
                    <div className="relative h-64 md:h-80">
                        <Image
                            src={brother.compositePhoto}
                            alt={`${brother.firstName} ${brother.lastName}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 672px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-green-card via-green-card/50 to-transparent" />

                        {/* Close button */}
                        <motion.button
                            whileHover={{ rotate: 90, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-green-dark-bg/80 backdrop-blur-sm border border-green-accent/20 flex items-center justify-center text-white hover:text-green-accent transition-colors duration-300"
                        >
                            <X className="w-5 h-5" />
                        </motion.button>

                        {/* Name overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="font-display text-3xl md:text-4xl font-bold text-white mb-2"
                            >
                                {brother.firstName} {brother.lastName}
                            </motion.h2>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap items-center gap-2"
                            >
                                <Badge className={`${ROLE_COLORS[brother.role]} text-white border-0 font-medium`}>
                                    {ROLE_LABELS[brother.role]}
                                </Badge>
                                <Badge variant="outline" className="border-green-accent/30 text-green-light">
                                    {brother.pledgeClass} Class
                                </Badge>
                                {brother.isAlumni && (
                                    <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                                        Alumni
                                    </Badge>
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Info grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {brother.major && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-green-accent/10 flex items-center justify-center flex-shrink-0">
                                        <GraduationCap className="w-4 h-4 text-green-accent" />
                                    </div>
                                    <div>
                                        <p className="text-green-light/50 text-xs uppercase tracking-wide">Major</p>
                                        <p className="text-white text-sm font-medium">{brother.major}</p>
                                    </div>
                                </div>
                            )}
                            {brother.hometown && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-green-accent/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-4 h-4 text-green-accent" />
                                    </div>
                                    <div>
                                        <p className="text-green-light/50 text-xs uppercase tracking-wide">Hometown</p>
                                        <p className="text-white text-sm font-medium">{brother.hometown}</p>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-green-accent/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-green-accent text-sm font-bold">Ι</span>
                                </div>
                                <div>
                                    <p className="text-green-light/50 text-xs uppercase tracking-wide">Initiated</p>
                                    <p className="text-white text-sm font-medium">{brother.initiationYear}</p>
                                </div>
                            </div>
                            {brother.graduationYear && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-green-accent/10 flex items-center justify-center flex-shrink-0">
                                        <span className="text-green-accent text-sm font-bold">G</span>
                                    </div>
                                    <div>
                                        <p className="text-green-light/50 text-xs uppercase tracking-wide">
                                            {brother.isAlumni ? 'Graduated' : 'Expected Graduation'}
                                        </p>
                                        <p className="text-white text-sm font-medium">{brother.graduationYear}</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* Quote */}
                        {brother.quote && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="p-4 rounded-xl bg-green-dark-bg/50 border border-green-accent/10"
                            >
                                <div className="flex gap-3">
                                    <Quote className="w-5 h-5 text-green-accent flex-shrink-0 mt-0.5" />
                                    <p className="text-green-light/80 italic">&ldquo;{brother.quote}&rdquo;</p>
                                </div>
                            </motion.div>
                        )}

                        {/* Social links */}
                        {(brother.linkedIn || brother.instagram) && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex gap-3"
                            >
                                {brother.linkedIn && (
                                    <a
                                        href={brother.linkedIn}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors duration-300"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                        <span className="text-sm">LinkedIn</span>
                                    </a>
                                )}
                                {brother.instagram && (
                                    <a
                                        href={`https://instagram.com/${brother.instagram.replace('@', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-600/20 text-pink-400 hover:bg-pink-600/30 transition-colors duration-300"
                                    >
                                        <Instagram className="w-4 h-4" />
                                        <span className="text-sm">{brother.instagram}</span>
                                    </a>
                                )}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}
