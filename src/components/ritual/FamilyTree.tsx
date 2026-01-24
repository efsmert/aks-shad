'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, ChevronDown, ChevronRight, MapPin, GraduationCap, Briefcase, X, Users } from 'lucide-react';
import Image from 'next/image';
import { familyTreeData, FamilyMember, getLineagePath } from '@/data/familyTree';
import { brothers, getBrotherById, getBrotherPhotoPath } from '@/data/brothers';
import { formatPledgeClass, Brother } from '@/types';
import { Badge } from '@/components/ui/badge';
import { ImageQueueProvider } from '@/components/brothers/ImageQueueContext';
import { ProgressiveImage } from '@/components/ui/progressive-image';

export function FamilyTree() {
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['Unknown Founder']));
    const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Build simple tree structure
    const tree = useMemo(() => {
        const treeMap = new Map<string, string[]>();
        familyTreeData.forEach(member => {
            const bigName = member.bigName || 'ROOT';
            const children = treeMap.get(bigName) || [];
            children.push(member.name);
            treeMap.set(bigName, children);
        });
        return treeMap;
    }, []);

    const roots = useMemo(() => {
        return familyTreeData.filter(m => !m.bigName);
    }, []);

    // Filter members by search
    const matchingMembers = useMemo(() => {
        if (!searchQuery.trim()) return new Set<string>();
        const query = searchQuery.toLowerCase();
        return new Set(
            familyTreeData
                .filter(m => m.name.toLowerCase().includes(query))
                .map(m => m.name)
        );
    }, [searchQuery]);

    const toggleNode = (name: string) => {
        setExpandedNodes(prev => {
            const next = new Set(prev);
            if (next.has(name)) {
                next.delete(name);
            } else {
                next.add(name);
            }
            return next;
        });
    };

    const getBrotherData = (member: FamilyMember): Brother | undefined => {
        if (!member.brotherId) return undefined;
        return getBrotherById(member.brotherId);
    };

    const getLineageCount = (name: string): number => {
        const children = tree.get(name) || [];
        let count = children.length;
        children.forEach(child => {
            count += getLineageCount(child);
        });
        return count;
    };

    const renderNode = (name: string, depth: number, imageIndex: { current: number }): React.ReactNode => {
        const member = familyTreeData.find(m => m.name === name);
        if (!member) return null;

        const brother = getBrotherData(member);
        const children = tree.get(name) || [];
        const hasChildren = children.length > 0;
        const isExpanded = expandedNodes.has(name);
        const isUnknown = name.includes('Unknown') || name.includes('Alumni');
        const isHighlighted = matchingMembers.has(name);
        const lineageCount = getLineageCount(name);
        const currentImageIndex = imageIndex.current++;

        return (
            <div key={name}>
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: depth * 0.02 }}
                    className={`flex items-center gap-3 p-3 hover:bg-green-card/50 rounded-xl cursor-pointer transition-all duration-200 ${isHighlighted ? 'bg-green-accent/20 ring-1 ring-green-accent/50' : ''
                        } ${selectedMember?.name === name ? 'bg-green-card/70 ring-1 ring-green-accent/30' : ''}`}
                    style={{ paddingLeft: `${depth * 28 + 12}px` }}
                    onClick={() => setSelectedMember(member)}
                >
                    {/* Expand/collapse button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (hasChildren) toggleNode(name);
                        }}
                        className="w-6 h-6 flex items-center justify-center flex-shrink-0"
                    >
                        {hasChildren ? (
                            isExpanded ? (
                                <ChevronDown className="w-4 h-4 text-green-accent" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-green-light/50" />
                            )
                        ) : (
                            <div className="w-2 h-2 rounded-full bg-green-accent/30" />
                        )}
                    </button>

                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-green-card border-2 border-green-accent/20 flex-shrink-0">
                        {brother && !isUnknown ? (
                            <div className="relative w-full h-full">
                                <ProgressiveImage
                                    src={getBrotherPhotoPath(brother.slug)}
                                    alt={brother.name}
                                    sizes="48px"
                                    className="object-cover"
                                    style={{ objectPosition: 'center 15%' }}
                                    queueIndex={currentImageIndex}
                                />
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-card to-green-dark-bg">
                                <User className="w-6 h-6 text-green-light/40" />
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium truncate ${isUnknown ? 'text-green-light/50 italic' : 'text-white'}`}>
                                {name}
                            </span>
                            {brother?.positions && brother.positions.length > 0 && (
                                <Badge className="bg-amber-500/80 text-black border-0 text-xs px-1.5 py-0 hidden sm:inline-flex">
                                    {brother.positions[0]}
                                </Badge>
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-green-light/50">
                            {brother?.major && (
                                <span className="truncate max-w-[150px]">{brother.major}</span>
                            )}
                        </div>
                    </div>

                    {/* Right side info */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {hasChildren && (
                            <span className="text-xs text-green-light/40 hidden sm:block">
                                {lineageCount} {lineageCount === 1 ? 'little' : 'littles'}
                            </span>
                        )}
                        {member.pledgeClass && (
                            <span className="text-xs px-2 py-1 bg-green-accent/10 rounded-full text-green-accent">
                                {member.pledgeClass}
                            </span>
                        )}
                    </div>
                </motion.div>

                {/* Children */}
                <AnimatePresence>
                    {isExpanded && children.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {children.map(childName => renderNode(childName, depth + 1, imageIndex))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    const renderDetailPanel = () => {
        if (!selectedMember) return null;

        const brother = getBrotherData(selectedMember);
        const lineage = getLineagePath(familyTreeData, selectedMember.name);
        const littles = tree.get(selectedMember.name) || [];

        return (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-green-card/50 border border-green-accent/20 rounded-2xl p-6 sticky top-24"
            >
                <button
                    onClick={() => setSelectedMember(null)}
                    className="absolute top-4 right-4 text-green-light/50 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Profile Image */}
                <div className="w-64 h-64 mx-auto rounded-2xl overflow-hidden bg-green-dark-bg border-2 border-green-accent/30 mb-4">
                    {brother ? (
                        <div className="relative w-full h-full">
                            <Image
                                src={getBrotherPhotoPath(brother.slug)}
                                alt={brother.name}
                                fill
                                className="object-cover"
                                style={{ objectPosition: 'center 15%' }}
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <User className="w-12 h-12 text-green-light/40" />
                        </div>
                    )}
                </div>

                <h3 className="text-xl font-bold text-white text-center mb-1">
                    {selectedMember.name}
                </h3>

                {selectedMember.pledgeClass && (
                    <p className="text-green-accent text-center mb-4">
                        {formatPledgeClass(selectedMember.pledgeClass)}
                    </p>
                )}

                {/* Position badges */}
                {brother?.positions && brother.positions.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {brother.positions.map((pos, i) => (
                            <Badge key={i} className="bg-amber-500/80 text-black border-0 text-xs">
                                {pos}
                            </Badge>
                        ))}
                    </div>
                )}

                {/* Details */}
                {brother && (
                    <div className="space-y-3 mb-6">
                        {brother.major && (
                            <div className="flex items-center gap-3 text-sm">
                                <GraduationCap className="w-4 h-4 text-green-accent flex-shrink-0" />
                                <span className="text-green-light/80">{brother.major}</span>
                            </div>
                        )}
                        {brother.hometown && (
                            <div className="flex items-center gap-3 text-sm">
                                <MapPin className="w-4 h-4 text-green-accent flex-shrink-0" />
                                <span className="text-green-light/80">{brother.hometown}</span>
                            </div>
                        )}
                        {brother.graduationYear && (
                            <div className="flex items-center gap-3 text-sm">
                                <Briefcase className="w-4 h-4 text-green-accent flex-shrink-0" />
                                <span className="text-green-light/80">Class of {brother.graduationYear}</span>
                            </div>
                        )}
                        {brother.coopStatus === 'Co-op' && (
                            <Badge className="bg-blue-500/80 text-white border-0 text-xs">
                                Currently on Co-op
                            </Badge>
                        )}
                    </div>
                )}

                {/* Lineage */}
                <div className="border-t border-green-accent/10 pt-4">
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4 text-green-accent" />
                        Lineage
                    </h4>
                    <div className="flex flex-wrap gap-1">
                        {lineage.map((name, i) => (
                            <div key={name} className="flex items-center">
                                <button
                                    onClick={() => {
                                        const member = familyTreeData.find(m => m.name === name);
                                        if (member) setSelectedMember(member);
                                    }}
                                    className={`text-xs px-2 py-1 rounded transition-colors ${name === selectedMember.name
                                        ? 'bg-green-accent text-black font-medium'
                                        : 'bg-green-card/50 text-green-light/70 hover:bg-green-card hover:text-white'
                                        }`}
                                >
                                    {name}
                                </button>
                                {i < lineage.length - 1 && (
                                    <span className="text-green-light/30 mx-1">→</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Littles */}
                {littles.length > 0 && (
                    <div className="border-t border-green-accent/10 pt-4 mt-4">
                        <h4 className="text-sm font-semibold text-white mb-3">
                            Littles ({littles.length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {littles.map(name => (
                                <button
                                    key={name}
                                    onClick={() => {
                                        const member = familyTreeData.find(m => m.name === name);
                                        if (member) setSelectedMember(member);
                                    }}
                                    className="text-xs px-2 py-1 bg-green-card/50 text-green-light/70 rounded hover:bg-green-card hover:text-white transition-colors"
                                >
                                    {name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        );
    };

    return (
        <main className="min-h-screen bg-green-dark-bg pt-24 pb-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-card rounded-full border border-green-accent/20 mb-6">
                        <Lock className="w-4 h-4 text-green-accent" />
                        <span className="text-green-light/80 text-sm">Brothers Only</span>
                    </div>

                    <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                        Family <span className="text-gradient">Tree</span>
                    </h1>

                    <p className="text-green-light/70 text-lg max-w-2xl mx-auto">
                        The lineage of bigs and littles that makes our brotherhood strong.
                        Click on any brother to see their full profile and family connections.
                    </p>
                </div>

                {/* Controls */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Search brothers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 bg-green-card/50 border border-green-accent/20 rounded-xl text-white placeholder-green-light/40 focus:outline-none focus:ring-2 focus:ring-green-accent/30 w-64"
                    />
                    <button
                        onClick={() => setExpandedNodes(new Set(familyTreeData.map(m => m.name)))}
                        className="px-4 py-2 text-sm text-green-light/70 hover:text-white bg-green-card/50 hover:bg-green-card rounded-xl transition-colors"
                    >
                        Expand All
                    </button>
                    <button
                        onClick={() => setExpandedNodes(new Set())}
                        className="px-4 py-2 text-sm text-green-light/70 hover:text-white bg-green-card/50 hover:bg-green-card rounded-xl transition-colors"
                    >
                        Collapse All
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto">
                    <div className="bg-green-card/30 border border-green-accent/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-green-accent">{familyTreeData.length}</div>
                        <div className="text-xs text-green-light/50">Total Members</div>
                    </div>
                    <div className="bg-green-card/30 border border-green-accent/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-green-accent">
                            {familyTreeData.filter(m => m.brotherId).length}
                        </div>
                        <div className="text-xs text-green-light/50">Active Brothers</div>
                    </div>
                    <div className="bg-green-card/30 border border-green-accent/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-green-accent">
                            {new Set(familyTreeData.map(m => m.pledgeClass).filter(Boolean)).size}
                        </div>
                        <div className="text-xs text-green-light/50">Pledge Classes</div>
                    </div>
                    <div className="bg-green-card/30 border border-green-accent/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-green-accent">
                            {Math.max(...familyTreeData.map(m => getLineagePath(familyTreeData, m.name).length))}
                        </div>
                        <div className="text-xs text-green-light/50">Deepest Lineage</div>
                    </div>
                </div>

                {/* Main content */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Tree */}
                    <div className="lg:col-span-2">
                        <ImageQueueProvider concurrency={6}>
                            <div className="bg-green-card/30 border border-green-accent/10 rounded-2xl p-4">
                                {roots.map(root => {
                                    const imageIndex = { current: 0 };
                                    return renderNode(root.name, 0, imageIndex);
                                })}
                            </div>
                        </ImageQueueProvider>
                    </div>

                    {/* Detail Panel */}
                    <div className="lg:col-span-1">
                        <AnimatePresence mode="wait">
                            {selectedMember ? (
                                renderDetailPanel()
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-green-card/20 border border-green-accent/10 rounded-2xl p-8 text-center sticky top-24"
                                >
                                    <User className="w-16 h-16 text-green-light/20 mx-auto mb-4" />
                                    <p className="text-green-light/50">
                                        Click on a brother to view their profile and family connections.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </main>
    );
}
