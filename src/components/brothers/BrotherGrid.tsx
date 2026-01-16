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
    const [statusFilter, setStatusFilter] = useState('active'); // Default to showing active only
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
                className="text-green-light/60 text-sm"
            >
                Showing {filteredBrothers.length} {filteredBrothers.length === 1 ? 'brother' : 'brothers'}
            </motion.p>

            {/* Grid - wrapped with ImageQueueProvider for sequential loading */}
            <ImageQueueProvider concurrency={3}>
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                >
                    <p className="text-green-light/60 text-lg mb-2">No brothers found</p>
                    <p className="text-green-light/40 text-sm">Try adjusting your filters</p>
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

