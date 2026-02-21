'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brother } from '@/types';
import { BrotherCard } from './BrotherCard';
import { BrotherProfile } from './BrotherProfile';
import { FilterBar } from './FilterBar';
import { ImageQueueProvider } from './ImageQueueContext';
import { filterBrothers } from '@/data/brothers';

interface BrotherGridProps {
    brothers: Brother[];
}

export function BrotherGrid({ brothers }: BrotherGridProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [pledgeClass, setPledgeClass] = useState('all');
    const [statusFilter, setStatusFilter] = useState('active');
    const [selectedBrother, setSelectedBrother] = useState<Brother | null>(null);

    const filteredBrothers = useMemo(() => {
        return filterBrothers(searchQuery, pledgeClass, statusFilter);
    }, [searchQuery, pledgeClass, statusFilter]);

    return (
        <div className="space-y-8">
            <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                pledgeClass={pledgeClass}
                onPledgeClassChange={setPledgeClass}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
            />

            {/* Results count */}
            <motion.p
                key={filteredBrothers.length}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-stone-500 text-sm"
            >
                Showing {filteredBrothers.length}{' '}
                {filteredBrothers.length === 1 ? 'brother' : 'brothers'}
            </motion.p>

            {/* Grid */}
            <ImageQueueProvider concurrency={6}>
                <motion.div
                    layout
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredBrothers.map((brother, index) => (
                            <BrotherCard
                                key={brother.id}
                                brother={brother}
                                index={index}
                                onClick={() => setSelectedBrother(brother)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </ImageQueueProvider>

            {/* Empty state */}
            {filteredBrothers.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                >
                    <p className="text-stone-600 text-lg mb-2">No brothers found</p>
                    <p className="text-stone-400 text-sm">Try adjusting your filters</p>
                </motion.div>
            )}

            {/* Profile modal */}
            <BrotherProfile
                brother={selectedBrother}
                isOpen={!!selectedBrother}
                onClose={() => setSelectedBrother(null)}
            />
        </div>
    );
}
