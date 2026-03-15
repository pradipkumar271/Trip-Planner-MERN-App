import React from 'react';
import { motion } from 'framer-motion';

export default function PageHero({
    badge = 'Trip Planner',
    title,
    subtitle,
    backgroundImage,
    children,
}) {
    return (
        <section className="relative overflow-hidden pt-24 pb-14 sm:pb-16 lg:pb-20">
            <div className="absolute inset-0">
                {backgroundImage ? (
                    <img
                        src={backgroundImage}
                        alt="Section background"
                        className="w-full h-full object-cover opacity-20"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900/40" />
                )}

                <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/70 to-dark-900/95" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(34,211,238,0.20),transparent_40%)]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="max-w-3xl mx-auto"
                >
                    <p className="inline-flex items-center px-3 py-1.5 rounded-full border border-cyan-400/35 bg-cyan-500/10 text-cyan-200 text-xs sm:text-sm mb-5">
                        {badge}
                    </p>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight" style={{ fontFamily: 'Outfit, Manrope, sans-serif' }}>
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed" style={{ fontFamily: 'Manrope, system-ui, sans-serif' }}>
                            {subtitle}
                        </p>
                    )}

                    {children ? <div className="mt-8">{children}</div> : null}
                </motion.div>
            </div>
        </section>
    );
}
