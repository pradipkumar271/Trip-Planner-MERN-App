import React from 'react';
import { motion } from 'framer-motion';
import { Map, Wallet, Bot, ClipboardList } from 'lucide-react';

const FEATURES = [
    {
        title: 'Trip Planning',
        description: 'Create destination-based trips with schedules, transport details, and dates in minutes.',
        icon: Map,
    },
    {
        title: 'Budget Tracking',
        description: 'Set travel budgets, monitor expected costs, and stay on track with smart spending insights.',
        icon: Wallet,
    },
    {
        title: 'AI Travel Suggestions',
        description: 'Get instant recommendations for places, activities, and practical travel tips.',
        icon: Bot,
    },
    {
        title: 'Itinerary Management',
        description: 'Build and edit day-wise plans with one clean workflow for your entire adventure.',
        icon: ClipboardList,
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="relative py-14 sm:py-16 lg:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_65%)]" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    className="text-center max-w-3xl mx-auto mb-10"
                >
                    <p className="text-cyan-300 text-sm tracking-wide uppercase">Core Features</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2" style={{ fontFamily: 'Outfit, Manrope, sans-serif' }}>
                        Everything You Need to Plan Better Trips
                    </h2>
                    <p className="text-white/65 mt-3 text-base sm:text-lg">
                        A unified toolkit for planning, budgeting, AI recommendations, and itinerary execution.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
                    {FEATURES.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.article
                                key={feature.title}
                                initial={{ opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: index * 0.06 }}
                                whileHover={{ y: -8 }}
                                className="card-glass p-6 rounded-2xl hover:border-cyan-400/45 hover:bg-white/[0.07]"
                            >
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-600/90 to-cyan-500/90 text-white flex items-center justify-center shadow-glow-blue mb-4">
                                    <Icon size={20} />
                                </div>

                                <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'Outfit, Manrope, sans-serif' }}>
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-white/65 leading-relaxed">{feature.description}</p>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
