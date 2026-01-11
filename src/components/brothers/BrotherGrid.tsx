'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brother } from '@/types';
import { BrotherCard } from './BrotherCard';
import { BrotherProfile } from './BrotherProfile';
import { FilterBar } from './FilterBar';
import { filterBrothers } from '@/data/brothers';

interface BrotherGridProps {
    brothers: Brother[];
}

export function BrotherGrid({ brothers }: BrotherGridProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [pledgeClass, setPledgeClass] = useState('all');
    const [roleFilter, setRoleFilter] = useState('all');
    const [selectedBrother, setSelectedBrother] = useState<Brother | null>(null);

    const filteredBrothers = useMemo(() => {
        return filterBrothers(searchQuery, pledgeClass, roleFilter);
    }, [searchQuery, pledgeClass, roleFilter]);

    return (
        <div className="space-y-8">
            <FilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                pledgeClass={pledgeClass}
                onPledgeClassChange={setPledgeClass}
                roleFilter={roleFilter}
                onRoleFilterChange={setRoleFilter}
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

            {/* Grid */}
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
