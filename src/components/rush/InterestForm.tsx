'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export function InterestForm() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <section id="interest-form" ref={ref} className="py-24 lg:py-32 px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <SectionHeading
                    title="Register Your Interest"
                    subtitle="Fill out the form below and our Rush Chair will be in touch."
                />

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    className="mt-12"
                >
                    <AnimatePresence mode="wait">
                        {isSubmitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="py-16 text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-heritage-50 flex items-center justify-center mx-auto mb-6">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="oklch(34% 0.08 155)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                </div>
                                <h3 className="font-display text-2xl font-bold text-heritage-900 mb-4">
                                    You&apos;re on the list!
                                </h3>
                                <p className="text-stone-600 max-w-md mx-auto">
                                    Thanks for your interest in Alpha Kappa Sigma. Our Rush Chair will reach
                                    out soon with more information about upcoming events.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="text-heritage-900 text-sm font-medium">First Name *</Label>
                                        <Input
                                            id="firstName"
                                            required
                                            placeholder="John"
                                            className="border-stone-200 text-heritage-900 placeholder:text-stone-400 focus:border-gold-500 focus:ring-gold-500/20"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName" className="text-heritage-900 text-sm font-medium">Last Name *</Label>
                                        <Input
                                            id="lastName"
                                            required
                                            placeholder="Doe"
                                            className="border-stone-200 text-heritage-900 placeholder:text-stone-400 focus:border-gold-500 focus:ring-gold-500/20"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-heritage-900 text-sm font-medium">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        placeholder="john.doe@northeastern.edu"
                                        className="border-stone-200 text-heritage-900 placeholder:text-stone-400 focus:border-gold-500 focus:ring-gold-500/20"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-heritage-900 text-sm font-medium">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="(555) 123-4567"
                                        className="border-stone-200 text-heritage-900 placeholder:text-stone-400 focus:border-gold-500 focus:ring-gold-500/20"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-heritage-900 text-sm font-medium">Year *</Label>
                                        <Select required>
                                            <SelectTrigger className="border-stone-200 text-heritage-900">
                                                <SelectValue placeholder="Select year" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-stone-200">
                                                <SelectItem value="freshman" className="text-heritage-900">Freshman</SelectItem>
                                                <SelectItem value="sophomore" className="text-heritage-900">Sophomore</SelectItem>
                                                <SelectItem value="junior" className="text-heritage-900">Junior</SelectItem>
                                                <SelectItem value="senior" className="text-heritage-900">Senior</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="major" className="text-heritage-900 text-sm font-medium">Major *</Label>
                                        <Input
                                            id="major"
                                            required
                                            placeholder="Computer Science"
                                            className="border-stone-200 text-heritage-900 placeholder:text-stone-400 focus:border-gold-500 focus:ring-gold-500/20"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="why" className="text-heritage-900 text-sm font-medium">Why are you interested in ΑΚΣ?</Label>
                                    <Textarea
                                        id="why"
                                        placeholder="Tell us about yourself..."
                                        rows={4}
                                        className="border-stone-200 text-heritage-900 placeholder:text-stone-400 focus:border-gold-500 focus:ring-gold-500/20 resize-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3 bg-heritage-900 hover:bg-heritage-800 text-white font-semibold rounded-sm transition-colors duration-200"
                                >
                                    {isSubmitting ? 'Submitting…' : 'Submit Interest Form'}
                                </Button>

                                <p className="text-center text-stone-400 text-xs">
                                    By submitting, you agree to be contacted about rush events.
                                </p>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
