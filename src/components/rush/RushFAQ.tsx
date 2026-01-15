'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { RUSH_FAQS } from '@/lib/constants';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export function RushFAQ() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section ref={ref} className="py-24 px-4 relative">
            {/* Top gradient fade */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-green-dark-bg to-transparent pointer-events-none z-0" />

            <div className="max-w-3xl mx-auto relative z-10 pt-8">
                <SectionHeading
                    title="Frequently Asked Questions"
                    subtitle="Got questions? We've got answers."
                />

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate={isInView ? 'animate' : 'initial'}
                    className="mt-12"
                >
                    <Accordion type="single" collapsible className="space-y-4">
                        {RUSH_FAQS.map((faq) => (
                            <motion.div key={faq.id} variants={fadeInUp}>
                                <AccordionItem
                                    value={faq.id}
                                    className="border border-green-accent/10 rounded-xl bg-green-card overflow-hidden data-[state=open]:border-green-accent/30 transition-colors duration-300"
                                >
                                    <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-green-accent/5 transition-colors duration-300 group">
                                        <span className="font-display text-lg font-semibold text-white group-hover:text-green-light transition-colors duration-300">
                                            {faq.question}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-5 text-green-light/70 leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-dark-bg to-transparent pointer-events-none z-0" />
        </section>
    );
}
