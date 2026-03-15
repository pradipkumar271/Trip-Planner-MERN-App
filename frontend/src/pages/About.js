import React from 'react';
import { motion } from 'framer-motion';
import { Target, Map, Wallet, Bot, ClipboardList, Route } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import FeatureGlassCard from '../components/common/FeatureGlassCard';

const FEATURES = [
    {
        title: 'Trip Planning',
        description: 'Create, edit, and manage trips with a clear workflow from destination selection to schedule setup.',
        icon: Map,
    },
    {
        title: 'Budget Tracking',
        description: 'Track your planned spending and keep every trip aligned with your comfort budget.',
        icon: Wallet,
    },
    {
        title: 'AI Travel Suggestions',
        description: 'Receive personalized travel recommendations for places, timing, and activity options.',
        icon: Bot,
    },
    {
        title: 'Itinerary Management',
        description: 'Organize day-wise plans so every destination has a structured and practical itinerary.',
        icon: ClipboardList,
    },
    {
        title: 'Activity Planning',
        description: 'Add activities and discover destination highlights before you even pack your bags.',
        icon: Route,
    },
];

export default function About() {
    return (
        <div className="min-h-full bg-gradient-dark">
            <PageHero
                badge="About"
                title="About Trip Planner"
                subtitle="A modern travel platform that helps you plan smarter, spend better, and explore confidently."
                backgroundImage="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80"
            />

            <section className="py-14 sm:py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                        className="text-center max-w-3xl mx-auto mb-10"
                    >
                        <p className="text-cyan-300 text-sm tracking-wide uppercase">What We Offer</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2" style={{ fontFamily: 'Outfit, Manrope, sans-serif' }}>
                            Core Capabilities for Every Traveler
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                        {FEATURES.map((feature, index) => (
                            <FeatureGlassCard
                                key={feature.title}
                                title={feature.title}
                                description={feature.description}
                                icon={feature.icon}
                                delay={index * 0.06}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="pb-14 sm:pb-16 lg:pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
                        <motion.article
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                            className="card-glass p-6 sm:p-8"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-cyan-500 text-white flex items-center justify-center shadow-glow-blue mb-5">
                                <Target size={22} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Outfit, Manrope, sans-serif' }}>
                                Our Mission
                            </h3>
                            <p className="text-white/72 leading-relaxed mb-4">
                                We built Trip Planner to simplify travel planning with a single intelligent workspace. From first idea to final itinerary, our goal is to reduce planning friction and make travel decisions more confident.
                            </p>
                            <p className="text-white/72 leading-relaxed">
                                By combining trip management, budgeting, and AI guidance, we help travelers spend less time organizing and more time experiencing meaningful journeys.
                            </p>
                        </motion.article>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.1 }}
                            className="card-glass p-4 sm:p-5"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1300&q=80"
                                alt="Travel mission"
                                className="w-full h-full min-h-[260px] object-cover rounded-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
