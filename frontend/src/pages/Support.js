import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Headset, CircleHelp } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import ActionButton from '../components/common/ActionButton';
import FaqAccordion from '../components/common/FaqAccordion';

const faqItems = [
    {
        badge: 'Account',
        question: 'How do I create an account and start planning?',
        answer:
            'Sign up using your email, verify your account, then head to Dashboard to create your first trip with destination, dates, and budget details.',
    },
    {
        badge: 'Trips',
        question: 'Can I edit or delete trips after saving them?',
        answer:
            'Yes. Open the trip card from Dashboard and choose edit or delete. All updates sync to your trip history immediately.',
    },
    {
        badge: 'AI',
        question: 'How do AI travel suggestions work in the app?',
        answer:
            'Use the chatbot to ask for destination ideas, activities, budget tips, or itinerary plans. Suggestions are generated based on your prompt context.',
    },
    {
        badge: 'Budget',
        question: 'How can I keep my trip under budget?',
        answer:
            'Set your estimated budget while creating a trip and track values in Dashboard summaries. You can update budget fields anytime.',
    },
    {
        badge: 'Payments',
        question: 'Does Trip Planner process direct travel payments?',
        answer:
            'Trip Planner currently focuses on planning and organization. Payment integration can be added in future versions if enabled by the project owner.',
    },
];

export default function Support() {
    return (
        <div className="min-h-full bg-gradient-dark">
            <PageHero
                badge="Help Center"
                title="Support & FAQs"
                subtitle="We are here to help you. Find quick answers and practical guidance for your travel planning workflow."
                backgroundImage="https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&w=1800&q=80"
            >
                <ActionButton to="/contact" variant="primary">
                    <Headset size={17} />
                    Contact Support
                </ActionButton>
            </PageHero>

            <section className="pb-14 sm:pb-16 lg:pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="grid md:grid-cols-3 gap-4 mb-8"
                    >
                        <div className="card-glass p-5 flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 flex items-center justify-center">
                                <ShieldCheck size={18} />
                            </div>
                            <div>
                                <p className="text-white font-semibold">Reliable Support</p>
                                <p className="text-sm text-white/65">Guidance for account, trips, and AI features.</p>
                            </div>
                        </div>

                        <div className="card-glass p-5 flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 flex items-center justify-center">
                                <CircleHelp size={18} />
                            </div>
                            <div>
                                <p className="text-white font-semibold">Clear Answers</p>
                                <p className="text-sm text-white/65">FAQs designed to resolve common issues fast.</p>
                            </div>
                        </div>

                        <div className="card-glass p-5 flex items-start gap-3 border-amber-300/30 bg-amber-400/5">
                            <div className="w-10 h-10 rounded-lg bg-amber-300/15 border border-amber-300/30 text-amber-200 flex items-center justify-center">
                                <Headset size={18} />
                            </div>
                            <div>
                                <p className="text-white font-semibold">Need Personal Help?</p>
                                <p className="text-sm text-white/70">Use Contact page for one-to-one support.</p>
                            </div>
                        </div>
                    </motion.div>

                    <FaqAccordion items={faqItems} />

                    <div className="mt-8 text-center">
                        <ActionButton to="/contact" variant="secondary">
                            Still Need Help? Contact Support
                        </ActionButton>
                    </div>
                </div>
            </section>
        </div>
    );
}
