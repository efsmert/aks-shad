'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Lock } from 'lucide-react';
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
        <div className="min-h-screen bg-green-dark-bg flex items-center justify-center px-4">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-accent/10 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-green-card border border-green-accent/20 rounded-2xl p-8 shadow-2xl">
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/metal-rounded.png"
                            alt="ΑΚΣ"
                            width={80}
                            height={80}
                            className="rounded-full"
                        />
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="font-display text-2xl font-bold text-white mb-2">
                            Brothers Only
                        </h1>
                        <p className="text-green-light/60 text-sm">
                            Enter the password to access this page
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-light/40" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError(false);
                                }}
                                placeholder="Password"
                                className={`w-full pl-12 pr-4 py-4 bg-green-dark-bg border rounded-xl text-white placeholder-green-light/40 focus:outline-none focus:ring-2 transition-all ${
                                    error
                                        ? 'border-red-500/50 focus:ring-red-500/30'
                                        : 'border-green-accent/20 focus:ring-green-accent/30'
                                }`}
                                autoFocus
                            />
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm text-center">
                                Incorrect password. Try again.
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-green-secondary to-green-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-green-accent/30 transition-all duration-300"
                        >
                            Enter
                        </button>
                    </form>

                    <p className="text-green-light/40 text-xs text-center mt-6">
                        {CHAPTER_INFO.greekLetters} • Est. {CHAPTER_INFO.foundingYear}
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
