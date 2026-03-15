import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plane, Sparkles, Compass, ArrowRight, PlayCircle } from 'lucide-react';

export default function HeroSection({ hasNavbar, isAuthenticated, getStartedPath, exploreTripsPath }) {
    return (
        <section className={`relative overflow-hidden ${hasNavbar ? 'pt-24' : 'pt-10'} pb-14 sm:pb-20 lg:pb-24`}>
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80"
                    alt="Travel landscape"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-dark-900/95 via-dark-900/88 to-primary-900/55" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_45%)]" />
            </div>

            {!hasNavbar && !isAuthenticated && (
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                    <div className="card-glass py-4 px-5 flex flex-wrap gap-3 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center shadow-glow-blue">
                                <Plane size={17} className="text-white -rotate-12" />
                            </div>
                            <span className="text-white font-semibold" style={{ fontFamily: 'Outfit, Manrope, sans-serif' }}>
                                Trip Planner
                            </span>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 text-sm">
                            <a href="#features" className="px-3 py-2 rounded-lg text-white/70 hover:text-cyan-300 hover:bg-white/10 transition-all duration-300">
                                Features
                            </a>
                            <a href="#how-it-works" className="px-3 py-2 rounded-lg text-white/70 hover:text-cyan-300 hover:bg-white/10 transition-all duration-300">
                                How It Works
                            </a>
                            <Link to="/login" className="px-4 py-2 rounded-lg text-white/75 hover:text-white hover:bg-white/10 transition-all duration-300">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/35 bg-cyan-500/10 mb-5 text-xs sm:text-sm text-cyan-200">
                            <Sparkles size={14} />
                            AI-assisted travel planning for every journey
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight font-extrabold text-white mb-5" style={{ fontFamily: 'Outfit, Manrope, sans-serif' }}>
                            Plan Your Adventures
                            <span className="block text-gradient">with Ease</span>
                        </h1>

                        <p className="text-base sm:text-lg text-white/70 max-w-xl leading-relaxed" style={{ fontFamily: 'Manrope, system-ui, sans-serif' }}>
                            Build smarter trips with destination ideas, AI suggestions, budget insights, and itinerary tracking in one modern dashboard.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <Link
                                to={getStartedPath}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-primary-600 via-blue-500 to-cyan-500 hover:shadow-glow-blue transition-all duration-300"
                            >
                                <PlayCircle size={18} />
                                Get Started
                            </Link>

                            <Link
                                to={exploreTripsPath}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white/85 border border-white/20 bg-white/5 hover:bg-white/10 hover:text-cyan-200 transition-all duration-300"
                            >
                                <Compass size={18} />
                                Explore Trips
                                <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                            {[
                                { metric: '50K+', label: 'Trips planned' },
                                { metric: '4x', label: 'Faster planning' },
                                { metric: '24/7', label: 'AI assistance' },
                            ].map((item) => (
                                <div key={item.label} className="card-glass p-4">
                                    <p className="text-xl font-bold text-cyan-300" style={{ fontFamily: 'Outfit, Manrope, sans-serif' }}>{item.metric}</p>
                                    <p className="text-sm text-white/65">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="relative"
                    >
                        <div className="card-glass p-4 sm:p-5">
                            <img
                                src="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1200&q=80"
                                alt="Travel planning dashboard preview"
                                className="w-full h-[250px] sm:h-[300px] md:h-[360px] object-cover rounded-2xl"
                            />
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                    <p className="text-xs text-white/55">Budget Forecast</p>
                                    <p className="text-sm text-cyan-300 font-semibold">Smart Expense Planner</p>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                    <p className="text-xs text-white/55">Itinerary Engine</p>
                                    <p className="text-sm text-cyan-300 font-semibold">Day-by-Day Builder</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
