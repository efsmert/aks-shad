'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, MapPin, GraduationCap, BookOpen, User, Briefcase } from 'lucide-react';
import { Brother, formatPledgeClass } from '@/types';
import { getBrotherPhotoPath } from '@/data/brothers';
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
    const [imageError, setImageError] = useState(false);

    // Reset imageError when brother changes so each brother gets a fresh attempt to load their photo
    useEffect(() => {
        setImageError(false);
    }, [brother?.id]);

    if (!brother) return null;

    const photoPath = getBrotherPhotoPath(brother.slug);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-green-card border-green-accent/20 p-0 overflow-hidden" showCloseButton={false}>
                <VisuallyHidden>
                    <DialogTitle>{brother.name} Profile</DialogTitle>
                </VisuallyHidden>

                <motion.div
                    variants={modalContent}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="relative"
                >
                    {/* Header with image */}
                    <div className="relative h-64 md:h-80 bg-green-dark-bg">
                        {!imageError ? (
                            <img
                                src={photoPath}
                                alt={brother.name}
                                className="w-full h-full object-cover"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-card to-green-dark-bg">
                                <div className="w-32 h-32 rounded-full bg-green-accent/10 flex items-center justify-center">
                                    <User className="w-16 h-16 text-green-accent/40" />
                                </div>
                            </div>
                        )}
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
                                {brother.name}
                            </motion.h2>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap items-center gap-2"
                            >
                                <Badge className="bg-gradient-to-r from-green-secondary to-green-accent text-white border-0 font-medium">
                                    {formatPledgeClass(brother.pledgeClass)}
                                </Badge>
                                {brother.positions && brother.positions.map((position, idx) => (
                                    <Badge
                                        key={idx}
                                        className="bg-amber-500/90 text-black border-0 font-semibold"
                                    >
                                        {position}
                                    </Badge>
                                ))}
                                {brother.status !== 'Active' && (
                                    <Badge
                                        className={`font-medium ${brother.status === 'Inactive'
                                            ? 'bg-red-500/80 text-white border-0'
                                            : 'bg-yellow-500/80 text-black border-0'
                                            }`}
                                    >
                                        {brother.status}
                                    </Badge>
                                )}
                                {brother.coopStatus === 'Co-op' && (
                                    <Badge className="bg-blue-500/80 text-white border-0 font-medium">
                                        On Co-op
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
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            {/* Major */}
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-green-accent/10 flex items-center justify-center flex-shrink-0">
                                    <BookOpen className="w-5 h-5 text-green-accent" />
                                </div>
                                <div>
                                    <p className="text-green-light/50 text-xs uppercase tracking-wide">Major</p>
                                    <p className="text-white text-sm font-medium">{brother.major}</p>
                                </div>
                            </div>

                            {/* Graduation Year */}
                            {brother.graduationYear && (
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-green-accent/10 flex items-center justify-center flex-shrink-0">
                                        <GraduationCap className="w-5 h-5 text-green-accent" />
                                    </div>
                                    <div>
                                        <p className="text-green-light/50 text-xs uppercase tracking-wide">Class of</p>
                                        <p className="text-white text-sm font-medium">{brother.graduationYear}</p>
                                    </div>
                                </div>
                            )}

                            {/* Hometown */}
                            {brother.hometown && (
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-green-accent/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-green-accent" />
                                    </div>
                                    <div>
                                        <p className="text-green-light/50 text-xs uppercase tracking-wide">Hometown</p>
                                        <p className="text-white text-sm font-medium">{brother.hometown}</p>
                                    </div>
                                </div>
                            )}

                            {/* Current Status */}
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-green-accent/10 flex items-center justify-center flex-shrink-0">
                                    <Briefcase className="w-5 h-5 text-green-accent" />
                                </div>
                                <div>
                                    <p className="text-green-light/50 text-xs uppercase tracking-wide">Current Status</p>
                                    <p className="text-white text-sm font-medium">
                                        {brother.coopStatus === 'Co-op' ? 'On Co-op' : 'Taking Classes'}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}
