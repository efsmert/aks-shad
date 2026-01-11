'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 p-6 rounded-2xl bg-green-card border border-green-accent/10"
        >
            {/* Search input */}
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-light/50" />
                <Input
                    type="text"
                    placeholder="Search by name, major, or hometown..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 bg-green-dark-bg/50 border-green-accent/20 text-white placeholder:text-green-light/40 focus:border-green-accent/50 focus:ring-green-accent/20"
                />
            </div>

            {/* Pledge class filter */}
            <Select value={pledgeClass} onValueChange={onPledgeClassChange}>
                <SelectTrigger className="w-full sm:w-48 bg-green-dark-bg/50 border-green-accent/20 text-white focus:ring-green-accent/20">
                    <SelectValue placeholder="Pledge Class" />
                </SelectTrigger>
                <SelectContent className="bg-green-card border-green-accent/20">
                    <SelectItem value="all" className="text-white hover:bg-green-accent/10 focus:bg-green-accent/10 focus:text-white">
                        All Classes
                    </SelectItem>
                    {pledgeClasses.map((pc) => (
                        <SelectItem
                            key={pc}
                            value={pc}
                            className="text-white hover:bg-green-accent/10 focus:bg-green-accent/10 focus:text-white"
                        >
                            {formatPledgeClass(pc)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Status filter */}
            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                <SelectTrigger className="w-full sm:w-48 bg-green-dark-bg/50 border-green-accent/20 text-white focus:ring-green-accent/20">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-green-card border-green-accent/20">
                    <SelectItem value="all" className="text-white hover:bg-green-accent/10 focus:bg-green-accent/10 focus:text-white">
                        All Brothers
                    </SelectItem>
                    <SelectItem value="active" className="text-white hover:bg-green-accent/10 focus:bg-green-accent/10 focus:text-white">
                        Active
                    </SelectItem>
                    <SelectItem value="inactive" className="text-white hover:bg-green-accent/10 focus:bg-green-accent/10 focus:text-white">
                        Inactive
                    </SelectItem>
                    <SelectItem value="coop" className="text-white hover:bg-green-accent/10 focus:bg-green-accent/10 focus:text-white">
                        On Co-op
                    </SelectItem>
                </SelectContent>
            </Select>
        </motion.div>
    );
}
