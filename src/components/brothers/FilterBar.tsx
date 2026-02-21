'use client';

import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getPledgeClasses } from '@/data/brothers';
import { formatPledgeClass } from '@/types';

interface FilterBarProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    pledgeClass: string;
    onPledgeClassChange: (value: string) => void;
    statusFilter: string;
    onStatusFilterChange: (value: string) => void;
}

export function FilterBar({
    searchQuery,
    onSearchChange,
    pledgeClass,
    onPledgeClassChange,
    statusFilter,
    onStatusFilterChange,
}: FilterBarProps) {
    const pledgeClasses = getPledgeClasses();

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col sm:flex-row gap-3 py-4 border-b border-stone-200"
        >
            {/* Search */}
            <div className="relative flex-1">
                <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                </svg>
                <Input
                    type="text"
                    placeholder="Search by name, major, or hometown…"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 border-stone-200 text-heritage-900 placeholder:text-stone-400 focus:border-gold-500 focus:ring-gold-500/20"
                />
            </div>

            {/* Pledge class filter */}
            <Select value={pledgeClass} onValueChange={onPledgeClassChange}>
                <SelectTrigger className="w-full sm:w-44 border-stone-200 text-heritage-900">
                    <SelectValue placeholder="Pledge Class" />
                </SelectTrigger>
                <SelectContent className="bg-white border-stone-200">
                    <SelectItem value="all" className="text-heritage-900">All Classes</SelectItem>
                    {pledgeClasses.map((pc) => (
                        <SelectItem key={pc} value={pc} className="text-heritage-900">
                            {formatPledgeClass(pc)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Status filter */}
            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                <SelectTrigger className="w-full sm:w-40 border-stone-200 text-heritage-900">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-white border-stone-200">
                    <SelectItem value="all" className="text-heritage-900">All Brothers</SelectItem>
                    <SelectItem value="active" className="text-heritage-900">Active</SelectItem>
                    <SelectItem value="inactive" className="text-heritage-900">Inactive</SelectItem>
                    <SelectItem value="coop" className="text-heritage-900">On Co-op</SelectItem>
                </SelectContent>
            </Select>
        </motion.div>
    );
}
