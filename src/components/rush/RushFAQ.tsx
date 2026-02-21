'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
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
        <section ref={ref} className="py-24 lg:py-32 px-6 lg:px-8 bg-stone-50">
            <div className="max-w-3xl mx-auto">
                <SectionHeading
                    title="Frequently Asked Questions"
                    subtitle="Common questions about rushing Alpha Kappa Sigma."
                />

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate={isInView ? 'animate' : 'initial'}
                    className="mt-12"
                >
                    <Accordion type="single" collapsible>
                        {RUSH_FAQS.map((faq) => (
                            <motion.div key={faq.id} variants={fadeInUp}>
                                <AccordionItem
                                    value={faq.id}
                                    className="border-b border-stone-200 py-1"
                                >
                                    <AccordionTrigger className="py-5 text-left hover:no-underline group">
                                        <span className="font-display text-base font-semibold text-heritage-900 group-hover:text-gold-700 transition-colors duration-200">
                                            {faq.question}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5 text-stone-600 leading-relaxed text-sm">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
