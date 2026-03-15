import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FaqAccordion({ items = [] }) {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="space-y-3">
            {items.map((item, index) => {
                const isOpen = index === openIndex;

                return (
                    <div
                        key={item.question}
                        className={`card-glass p-0 overflow-hidden ${isOpen ? 'border-cyan-400/45' : ''}`}
                    >
                        <button
                            onClick={() => setOpenIndex(isOpen ? -1 : index)}
                            className="w-full text-left flex items-center justify-between gap-4 px-5 py-4 hover:bg-white/[0.03] transition-colors duration-300"
                        >
                            <div className="flex items-center gap-3">
                                {item.badge ? (
                                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-400/25 text-cyan-200 text-[11px] uppercase tracking-wide">
                                        {item.badge}
                                    </span>
                                ) : null}
                                <p className="text-white font-medium">{item.question}</p>
                            </div>

                            <ChevronDown
                                size={18}
                                className={`text-white/70 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-300' : ''}`}
                            />
                        </button>

                        <AnimatePresence initial={false}>
                            {isOpen ? (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: 'easeOut' }}
                                    className="px-5 overflow-hidden"
                                >
                                    <div className="pb-5 text-sm text-white/72 leading-relaxed">
                                        {item.answer}
                                    </div>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
