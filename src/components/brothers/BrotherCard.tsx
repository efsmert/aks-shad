'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Brother } from '@/types';
import { ROLE_LABELS, ROLE_COLORS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { cardHover, imageZoom } from '@/lib/animations';

interface BrotherCardProps {
    brother: Brother;
    onClick: () => void;
    index: number;
}

export function BrotherCard({ brother, onClick, index }: BrotherCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1]
            }}
            whileHover="hover"
            initial-state="rest"
            onClick={onClick}
            className="cursor-pointer group"
        >
            <motion.div
                variants={cardHover}
                className="relative rounded-2xl bg-green-card border border-green-accent/10 overflow-hidden transition-colors duration-300 hover:border-green-accent/30"
            >
                {/* Image container */}
                <div className="relative aspect-square overflow-hidden">
                    <motion.div variants={imageZoom} className="w-full h-full">
                        <Image
                            src={brother.compositePhoto}
                            alt={`${brother.firstName} ${brother.lastName}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                    </motion.div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-dark-bg via-transparent to-transparent opacity-60" />

                    {/* Role badge */}
                    {brother.isExecutiveBoard && (
                        <div className="absolute top-3 right-3">
                            <Badge className={`${ROLE_COLORS[brother.role]} text-white border-0 text-xs font-medium px-2.5 py-1`}>
                                {ROLE_LABELS[brother.role]}
                            </Badge>
                        </div>
                    )}

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
                        initial={{ opacity: 0.9 }}
                        whileHover={{ opacity: 1 }}
                        className="font-display text-lg font-semibold text-white mb-1 group-hover:text-green-light transition-colors duration-300"
                    >
                        {brother.firstName} {brother.lastName}
                    </motion.h3>

                    <div className="flex items-center justify-between">
                        <p className="text-green-light/60 text-sm">
                            {brother.pledgeClass} Class
                        </p>
                        <p className="text-green-light/60 text-sm">
                            &apos;{String(brother.graduationYear || brother.initiationYear).slice(-2)}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
