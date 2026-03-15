import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CalendarClock, Rocket, Share2 } from 'lucide-react';

const STEPS = [
    {
        title: 'Create Trip',
        description: 'Set destination, travel dates, and preferences to start your personalized plan.',
        icon: MapPin,
    },
    {
        title: 'Plan Smartly',
        description: 'Define budget and itinerary details with AI-backed guidance and recommendations.',
        icon: CalendarClock,
    },
    {
        title: 'Explore',
        description: 'Follow your trip flow with clear day plans and activities across your journey.',
        icon: Rocket,
    },
    {
        title: 'Share Memories',
        description: 'Keep your plans organized and share favorite routes with travel partners.',
        icon: Share2,
    },
];

export default function StepsSection() {
    return (
        <section id="how-it-works" className="py-14 sm:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    className="text-center max-w-3xl mx-auto mb-10"
                >
                    <p className="text-cyan-300 text-sm tracking-wide uppercase">How It Works</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2" style={{ fontFamily: 'Outfit, Manrope, sans-serif' }}>
                        From Idea to Itinerary in Four Simple Steps
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <motion.article
                                key={step.title}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: index * 0.08 }}
                                className="relative card-glass p-6"
                            >
                                <div className="absolute -top-3 left-4 w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-cyan-500 text-white text-sm font-bold flex items-center justify-center shadow-glow-blue">
                                    {index + 1}
                                </div>

                                <div className="mt-4 w-11 h-11 rounded-xl border border-cyan-400/35 bg-cyan-500/10 text-cyan-200 flex items-center justify-center">
                                    <Icon size={20} />
                                </div>
                                <h3 className="text-lg font-semibold text-white mt-4 mb-2" style={{ fontFamily: 'Outfit, Manrope, sans-serif' }}>
                                    {step.title}
                                </h3>
                                <p className="text-sm text-white/65 leading-relaxed">{step.description}</p>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
