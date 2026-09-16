'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Brother, formatPledgeClass } from '@/types';
import { getBrotherPhotoPath } from '@/data/brothers';
import { BrotherBadge } from './BrotherBadge';
import { ProgressiveImage } from '@/components/ui/progressive-image';

interface BrotherCardProps {
    brother: Brother;
    onClick: () => void;
    index: number;
}

export function BrotherCard({ brother, onClick, index }: BrotherCardProps) {
    const [imageError, setImageError] = useState(false);
    const photoPath = getBrotherPhotoPath(brother.slug);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
                duration: 0.4,
                delay: Math.min(index * 0.025, 0.2),
                ease: [0.25, 1, 0.5, 1],
            }}
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-label={`View ${brother.name}’s profile`}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onClick();
                }
            }}
            className="brother-card cursor-pointer group"
        >
            {/* Image */}
            <div className="portrait-frame relative aspect-[3/4] overflow-hidden rounded-sm mb-3 bg-stone-100">
                {!imageError ? (
                    <div className="w-full h-full relative">
                        <ProgressiveImage
                            src={photoPath}
                            alt={brother.name}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover transition-transform duration-500 ease-out-quart group-hover:scale-[1.03]"
                            style={{ objectPosition: 'center 15%' }}
                            onError={() => setImageError(true)}
                            quality={65}
                            queueIndex={index}
                        />
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-stone-100">
                        <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="oklch(55% 0.01 60)" strokeWidth="1.5">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* Position badges */}
                {brother.positions && brother.positions.length > 0 && (
                    <div className="absolute top-2 left-2 right-2 flex flex-col items-start gap-1.5">
                        {brother.positions.map((position, idx) => (
                            <BrotherBadge seed={brother.slug} key={idx} label={position} />
                        ))}
                    </div>
                )}

                {/* Status badges */}
                <div className="absolute bottom-2 right-2 flex flex-col items-end gap-1.5">
                    {brother.status !== 'Active' && (
                        <BrotherBadge seed={brother.slug} label={brother.status} kind="status" />
                    )}
                    {brother.status !== 'Graduated' && brother.coopStatus === 'Co-op' && (
                        <BrotherBadge seed={brother.slug} label="Co-op" kind="status" />
                    )}
                </div>
            </div>

            {/* Info */}
            <h3 className="font-display text-base font-semibold text-heritage-900 group-hover:text-gold-700 transition-colors duration-200 truncate">
                {brother.name}
            </h3>
            <div className="flex items-center justify-between mt-0.5">
                <p className="text-gold-600 text-xs font-medium">
                    {formatPledgeClass(brother.pledgeClass)}
                </p>
                {brother.graduationYear && (
                    <p className="text-stone-400 text-xs tabular-nums">
                        &apos;{String(brother.graduationYear).slice(-2)}
                    </p>
                )}
            </div>
            <p className="text-stone-500 text-xs mt-0.5 truncate">
                {brother.major}
            </p>
        </motion.div>
    );
}
