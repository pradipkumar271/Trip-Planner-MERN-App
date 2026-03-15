import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Compass, Lightbulb, Bot, Sparkles } from 'lucide-react';
import Chatbot from '../components/Chatbot';

const tips = [
    {
        icon: Compass,
        title: 'Be specific',
        text: 'Include destination, budget, dates, and travel style for better recommendations.',
    },
    {
        icon: Lightbulb,
        title: 'Ask follow-up questions',
        text: 'Refine the itinerary step by step, like food spots, transport, or activities.',
    },
    {
        icon: Sparkles,
        title: 'Try planning prompts',
        text: 'Example: Build me a 4-day budget itinerary for Bali with adventure activities.',
    },
];

export default function ChatbotPage() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-full bg-gradient-dark pt-24 pb-12 overflow-hidden">
            <div className="pointer-events-none absolute -top-32 right-0 w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 -left-24 w-80 h-80 rounded-full bg-primary-500/20 blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <motion.section
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="card-glass p-5 sm:p-6"
                >
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                        >
                            <ChevronLeft size={16} />
                            Back
                        </button>

                        <p className="text-xs sm:text-sm text-white/55">
                            <Link to="/home" className="hover:text-white transition-colors duration-300">Home</Link>
                            <span className="mx-2 text-white/30">/</span>
                            <span className="text-white/80">Chatbot</span>
                        </p>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-600 to-cyan-500 flex items-center justify-center shadow-glow-blue shrink-0">
                            <Bot size={22} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">AI Travel Chatbot</h1>
                            <p className="text-white/60 mt-2 max-w-3xl">
                                Welcome back. Describe your ideal trip and get instant itinerary ideas, budget guidance,
                                destination suggestions, and activity planning in one place.
                            </p>
                        </div>
                    </div>
                </motion.section>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                    <motion.aside
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.05 }}
                        className="xl:col-span-1 card-glass p-5 h-fit"
                    >
                        <h2 className="text-sm uppercase tracking-[0.14em] text-white/45 mb-4">Quick Tips</h2>
                        <div className="space-y-4">
                            {tips.map((tip) => {
                                const Icon = tip.icon;
                                return (
                                    <div key={tip.title} className="p-3 rounded-xl bg-white/5 border border-white/10">
                                        <div className="flex items-center gap-2 mb-2 text-cyan-300">
                                            <Icon size={16} />
                                            <p className="text-sm font-semibold text-white/90">{tip.title}</p>
                                        </div>
                                        <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{tip.text}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.aside>

                    <motion.section
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.1 }}
                        className="xl:col-span-3"
                    >
                        <Chatbot mode="embedded" />
                    </motion.section>
                </div>
            </div>
        </div>
    );
}
