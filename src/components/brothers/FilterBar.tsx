'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PLEDGE_CLASSES } from '@/lib/constants';

interface FilterBarProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    pledgeClass: string;
    onPledgeClassChange: (value: string) => void;
    roleFilter: string;
    onRoleFilterChange: (value: string) => void;
}

export function FilterBar({
    searchQuery,
    onSearchChange,
    pledgeClass,
    onPledgeClassChange,
    roleFilter,
    onRoleFilterChange,
}: FilterBarProps) {
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
                    placeholder="Search brothers..."
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
                    {PLEDGE_CLASSES.map((pc) => (
                        <SelectItem
                            key={pc}
                            value={pc}
                            className="text-white hover:bg-green-accent/10 focus:bg-green-accent/10 focus:text-white"
                        >
                            {pc} Class
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Role filter */}
            <Select value={roleFilter} onValueChange={onRoleFilterChange}>
                <SelectTrigger className="w-full sm:w-48 bg-green-dark-bg/50 border-green-accent/20 text-white focus:ring-green-accent/20">
                    <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent className="bg-green-card border-green-accent/20">
                    <SelectItem value="all" className="text-white hover:bg-green-accent/10 focus:bg-green-accent/10 focus:text-white">
                        All Roles
                    </SelectItem>
                    <SelectItem value="executive" className="text-white hover:bg-green-accent/10 focus:bg-green-accent/10 focus:text-white">
                        Executive Board
                    </SelectItem>
                    <SelectItem value="member" className="text-white hover:bg-green-accent/10 focus:bg-green-accent/10 focus:text-white">
                        General Members
                    </SelectItem>
                    <SelectItem value="alumni" className="text-white hover:bg-green-accent/10 focus:bg-green-accent/10 focus:text-white">
                        Alumni
                    </SelectItem>
                </SelectContent>
            </Select>
        </motion.div>
    );
}
