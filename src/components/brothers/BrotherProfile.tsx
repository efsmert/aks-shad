'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Brother, formatPledgeClass } from '@/types';
import { getBrotherPhotoPath } from '@/data/brothers';
import { ProgressiveImage } from '@/components/ui/progressive-image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { modalContent } from '@/lib/animations';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface BrotherProfileProps {
    brother: Brother | null;
    isOpen: boolean;
    onClose: () => void;
}

export function BrotherProfile({ brother, isOpen, onClose }: BrotherProfileProps) {
    const [errorState, setErrorState] = useState<{ id: string | null; hasError: boolean }>({ id: null, hasError: false });
    const imageError = errorState.id === brother?.id ? errorState.hasError : false;
    const handleImageError = () => setErrorState({ id: brother?.id ?? null, hasError: true });

    if (!brother) return null;

    const photoPath = getBrotherPhotoPath(brother.slug);

    const details = [
        { label: 'Major', value: brother.major },
        brother.graduationYear ? { label: 'Class of', value: String(brother.graduationYear) } : null,
        brother.hometown ? { label: 'Hometown', value: brother.hometown } : null,
        { label: 'Status', value: brother.coopStatus === 'Co-op' ? 'On Co-op' : 'Taking Classes' },
        { label: 'Pledge Class', value: formatPledgeClass(brother.pledgeClass) },
    ].filter(Boolean) as { label: string; value: string }[];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-white border-stone-200 p-0 overflow-hidden rounded-sm" showCloseButton={false}>
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
                    {/* Image */}
                    <div className="relative h-80 md:h-[420px] bg-stone-100">
                        {!imageError ? (
                            <ProgressiveImage
                                src={photoPath}
                                alt={brother.name}
                                sizes="(max-width: 768px) 100vw, 672px"
                                className="object-cover"
                                style={{ objectPosition: 'center 20%' }}
                                onError={handleImageError}
                                priority
                                quality={100}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-stone-100">
                                <div className="w-24 h-24 rounded-full bg-stone-200 flex items-center justify-center">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="oklch(55% 0.01 60)" strokeWidth="1.5">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>
                            </div>
                        )}

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-heritage-900 hover:bg-white transition-colors duration-200"
                            aria-label="Close profile"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                <path d="M4 4l8 8M12 4l-8 8" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 lg:p-8">
                        {/* Name and badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                            <h2 className="font-display text-2xl lg:text-3xl font-bold text-heritage-900 mr-2">
                                {brother.name}
                            </h2>
                            {brother.positions?.map((position, idx) => (
                                <span key={idx} className="bg-gold-100 text-gold-700 text-xs font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                                    {position}
                                </span>
                            ))}
                            {brother.status !== 'Active' && (
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider ${brother.status === 'Inactive'
                                        ? 'bg-stone-200 text-stone-600'
                                        : 'bg-gold-100 text-gold-700'
                                    }`}>
                                    {brother.status}
                                </span>
                            )}
                            {brother.coopStatus === 'Co-op' && (
                                <span className="bg-heritage-50 text-heritage-700 text-xs font-semibold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                                    Co-op
                                </span>
                            )}
                        </div>

                        {/* Details grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {details.map((detail) => (
                                <div key={detail.label}>
                                    <p className="text-stone-400 text-xs uppercase tracking-wider mb-1">
                                        {detail.label}
                                    </p>
                                    <p className="text-heritage-900 text-sm font-medium">
                                        {detail.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
}
