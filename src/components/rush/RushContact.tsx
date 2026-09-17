import { CHAPTER_INFO } from '@/lib/constants';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function RushContact() {
    return (
        <section id="rush-contact" className="scroll-mt-28 py-24 lg:py-32 px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <SectionHeading
                    title="Interested in rushing?"
                    subtitle="Text Perry Yung, our Recruitment Chair, to introduce yourself or ask about rush. You can also message the chapter on Instagram for the latest updates."
                />
                <div className="flex flex-col sm:flex-row gap-4">
                    <a
                        href="sms:+14019993340"
                        className="action-primary inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold rounded-sm"
                    >
                        Text Perry
                    </a>
                    <a
                        href={CHAPTER_INFO.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold rounded-sm border border-stone-200 text-heritage-900 transition-colors hover:bg-heritage-50"
                    >
                        Message us on Instagram ↗
                    </a>
                </div>
                <p className="mt-5 text-sm text-stone-500">
                    Perry Yung · (401) 999-3340 · @alphakappasigma
                </p>
            </div>
        </section>
    );
}
