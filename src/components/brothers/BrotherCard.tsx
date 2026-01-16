'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { User } from 'lucide-react';
import { Brother, formatPledgeClass } from '@/types';
import { getBrotherPhotoPath } from '@/data/brothers';
import { Badge } from '@/components/ui/badge';
import { ProgressiveImage } from '@/components/ui/progressive-image';
import { cardHover, imageZoom } from '@/lib/animations';

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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
                duration: 0.4,
                delay: index * 0.03,
                ease: [0.22, 1, 0.36, 1]
            }}
            whileHover="hover"
            onClick={onClick}
            className="cursor-pointer group"
        >
            <motion.div
                variants={cardHover}
                className="relative rounded-2xl bg-green-card border border-green-accent/10 overflow-hidden transition-colors duration-300 hover:border-green-accent/30"
            >
                {/* Image container */}
                <div className="relative aspect-square overflow-hidden bg-green-dark-bg">
                    {!imageError ? (
                        <motion.div variants={imageZoom} className="w-full h-full relative">
                            {/* Progressive image with shimmer placeholder */}
                            <ProgressiveImage
                                src={photoPath}
                                alt={brother.name}
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-cover"
                                style={{ objectPosition: 'center 15%' }}
                                onError={() => setImageError(true)}
                                quality={50}
                                queueIndex={index}
                            />
                        </motion.div>
                    ) : (
                        // Placeholder when no image
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-card to-green-dark-bg">
                            <div className="w-24 h-24 rounded-full bg-green-accent/10 flex items-center justify-center">
                                <User className="w-12 h-12 text-green-accent/40" />
                            </div>
                        </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-dark-bg via-transparent to-transparent opacity-60" />

                    {/* Position badges (top-left) */}
                    {brother.positions && brother.positions.length > 0 && (
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5 max-w-[60%]">
                            {brother.positions.map((position, idx) => (
                                <Badge
                                    key={idx}
                                    className="bg-amber-500/90 text-black border-0 text-xs font-semibold px-2 py-0.5 shadow-md"
                                >
                                    {position}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {/* Status badges (top-right) */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1.5">
                        {brother.status !== 'Active' && (
                            <Badge
                                className={`text-xs font-medium px-2 py-0.5 ${brother.status === 'Inactive'
                                    ? 'bg-red-500/80 text-white border-0'
                                    : 'bg-yellow-500/80 text-black border-0'
                                    }`}
                            >
                                {brother.status}
                            </Badge>
                        )}
                        {brother.coopStatus === 'Co-op' && (
                            <Badge className="bg-blue-500/80 text-white border-0 text-xs font-medium px-2 py-0.5">
                                Co-op
                            </Badge>
                        )}
                    </div>

                    {/* Hover overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-green-accent/10 flex items-center justify-center"
                    >
                        <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 1 }}
                            className="px-4 py-2 bg-green-accent/90 text-white text-sm font-medium rounded-full"
                        >
                            View Profile
                        </motion.span>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <motion.h3
                        className="font-display text-lg font-semibold text-white mb-1 group-hover:text-green-light transition-colors duration-300 truncate"
                    >
                        {brother.name}
                    </motion.h3>

                    <div className="flex items-center justify-between">
                        <p className="text-green-accent text-sm font-medium">
                            {formatPledgeClass(brother.pledgeClass)}
                        </p>
                        {brother.graduationYear && (
                            <p className="text-green-light/60 text-sm">
                                &apos;{String(brother.graduationYear).slice(-2)}
                            </p>
                        )}
                    </div>

                    <p className="text-green-light/50 text-xs mt-1 truncate">
                        {brother.major}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}
