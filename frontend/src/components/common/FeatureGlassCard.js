import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureGlassCard({
    icon: Icon,
    title,
    description,
    badge,
    delay = 0,
    highlight = false,
}) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay }}
            whileHover={{ y: -7 }}
            className={`card-glass p-6 ${highlight ? 'border-cyan-400/35 bg-cyan-500/10' : 'hover:border-cyan-400/40 hover:bg-white/[0.07]'}`}
        >
            {badge ? (
                <span className="inline-flex mb-3 px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-200 text-xs">
                    {badge}
                </span>
            ) : null}

            {Icon ? (
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-600/90 to-cyan-500/90 text-white flex items-center justify-center shadow-glow-blue mb-4">
                    <Icon size={20} />
                </div>
            ) : null}

            <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'Outfit, Manrope, sans-serif' }}>
                {title}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">{description}</p>
        </motion.article>
    );
}
