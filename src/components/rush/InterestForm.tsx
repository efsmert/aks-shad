'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { fadeInUp } from '@/lib/animations';
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

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <section id="interest-form" ref={ref} className="py-24 px-4 relative">
            {/* Top gradient fade */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-green-dark-bg to-transparent pointer-events-none z-0" />

            <div className="max-w-2xl mx-auto relative z-10 pt-8">
                <SectionHeading
                    title="Register Your Interest"
                    subtitle="Fill out the form below and our Rush Chair will be in touch."
                />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-12"
                >
                    <AnimatePresence mode="wait">
                        {isSubmitted ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="p-12 rounded-3xl bg-green-card border border-green-accent/20 text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                                    className="w-20 h-20 rounded-full bg-gradient-to-br from-green-secondary to-green-accent flex items-center justify-center mx-auto mb-6"
                                >
                                    <CheckCircle className="w-10 h-10 text-white" />
                                </motion.div>
                                <h3 className="font-display text-2xl font-bold text-white mb-4">
                                    You&apos;re on the list!
                                </h3>
                                <p className="text-green-light/70">
                                    Thanks for your interest in Alpha Kappa Sigma. Our Rush Chair will reach out soon with more information about upcoming events.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                onSubmit={handleSubmit}
                                className="p-8 rounded-3xl bg-green-card border border-green-accent/10 space-y-6"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="text-white">First Name *</Label>
                                        <Input
                                            id="firstName"
                                            required
                                            placeholder="John"
                                            className="bg-green-dark-bg/50 border-green-accent/20 text-white placeholder:text-green-light/40 focus:border-green-accent/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName" className="text-white">Last Name *</Label>
                                        <Input
                                            id="lastName"
                                            required
                                            placeholder="Doe"
                                            className="bg-green-dark-bg/50 border-green-accent/20 text-white placeholder:text-green-light/40 focus:border-green-accent/50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-white">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        placeholder="john.doe@university.edu"
                                        className="bg-green-dark-bg/50 border-green-accent/20 text-white placeholder:text-green-light/40 focus:border-green-accent/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="(555) 123-4567"
                                        className="bg-green-dark-bg/50 border-green-accent/20 text-white placeholder:text-green-light/40 focus:border-green-accent/50"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-white">Year *</Label>
                                        <Select required>
                                            <SelectTrigger className="bg-green-dark-bg/50 border-green-accent/20 text-white">
                                                <SelectValue placeholder="Select year" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-green-card border-green-accent/20">
                                                <SelectItem value="freshman" className="text-white">Freshman</SelectItem>
                                                <SelectItem value="sophomore" className="text-white">Sophomore</SelectItem>
                                                <SelectItem value="junior" className="text-white">Junior</SelectItem>
                                                <SelectItem value="senior" className="text-white">Senior</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="major" className="text-white">Major *</Label>
                                        <Input
                                            id="major"
                                            required
                                            placeholder="Computer Science"
                                            className="bg-green-dark-bg/50 border-green-accent/20 text-white placeholder:text-green-light/40 focus:border-green-accent/50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="why" className="text-white">Why are you interested in ΑΚΣ?</Label>
                                    <Textarea
                                        id="why"
                                        placeholder="Tell us a bit about yourself and what interests you about Alpha Kappa Sigma..."
                                        rows={4}
                                        className="bg-green-dark-bg/50 border-green-accent/20 text-white placeholder:text-green-light/40 focus:border-green-accent/50 resize-none"
                                    />
                                </div>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-6 bg-gradient-to-r from-green-secondary to-green-accent hover:shadow-lg hover:shadow-green-accent/30 transition-all duration-300 text-lg font-semibold"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5 mr-2" />
                                                Submit Interest Form
                                            </>
                                        )}
                                    </Button>
                                </motion.div>

                                <p className="text-center text-green-light/50 text-sm">
                                    By submitting this form, you agree to be contacted by Alpha Kappa Sigma about rush events.
                                </p>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
