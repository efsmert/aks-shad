'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { PasswordScreen } from './PasswordScreen';

const FamilyTree = dynamic(() => import('./FamilyTree').then(mod => ({ default: mod.FamilyTree })), {
    loading: () => (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-heritage-900 border-t-transparent rounded-full animate-spin" />
        </div>
    ),
});

export function RitualContent() {
    const [hasAccess, setHasAccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const access = sessionStorage.getItem('ritual_access');
        if (access === 'granted') {
            setHasAccess(true);
        }
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-heritage-900 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!hasAccess) {
        return <PasswordScreen onSuccess={() => setHasAccess(true)} />;
    }

    return <FamilyTree />;
}
