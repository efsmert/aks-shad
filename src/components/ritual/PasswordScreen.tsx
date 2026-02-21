'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CHAPTER_INFO } from '@/lib/constants';

const ACCESS_PASSWORD = 'deklub';

interface PasswordScreenProps {
    onSuccess: () => void;
}

export function PasswordScreen({ onSuccess }: PasswordScreenProps) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ACCESS_PASSWORD) {
            sessionStorage.setItem('ritual_access', 'granted');
            onSuccess();
        } else {
            setError(true);
            setPassword('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm"
            >
                <div className="flex justify-center mb-8">
                    <Image
                        src="/metal-rounded.png"
                        alt="ΑΚΣ"
                        width={64}
                        height={64}
                        className="rounded-full"
                    />
                </div>

                <div className="text-center mb-8">
                    <h1 className="font-display text-2xl font-bold text-heritage-900 mb-2">
                        Brothers Only
                    </h1>
                    <p className="text-stone-500 text-sm">
                        Enter the password to access this page
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <rect x="3" y="11" width="18" height="11" rx="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(false);
                            }}
                            placeholder="Password"
                            className={`w-full pl-10 pr-4 py-3 border rounded-sm text-heritage-900 placeholder-stone-400 focus:outline-none focus:ring-2 transition-all text-sm ${error
                                    ? 'border-red-400 focus:ring-red-200'
                                    : 'border-stone-200 focus:ring-gold-200'
                                }`}
                            autoFocus
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-xs text-center">
                            Incorrect password. Try again.
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-heritage-900 text-white font-semibold rounded-sm hover:bg-heritage-800 transition-colors duration-200 text-sm"
                    >
                        Enter
                    </button>
                </form>

                <p className="text-stone-400 text-xs text-center mt-6">
                    {CHAPTER_INFO.greekLetters} · Est. {CHAPTER_INFO.foundingYear}
                </p>
            </motion.div>
        </div>
    );
}
