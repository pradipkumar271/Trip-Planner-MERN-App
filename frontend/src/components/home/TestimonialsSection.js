import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
    {
        name: 'Aarav K.',
        role: 'Solo Traveler',
        quote: 'Trip Planner made my 10-day Europe route effortless. The AI suggestions were actually useful and practical.',
        rating: 5,
    },
    {
        name: 'Maya R.',
        role: 'Family Trip Organizer',
        quote: 'Budget tracking and itinerary planning in one place saved us hours of back-and-forth planning.',
        rating: 5,
    },
    {
        name: 'Nikhil S.',
        role: 'Adventure Enthusiast',
        quote: 'The dashboard feels premium and I can manage all my trips without juggling multiple tools.',
        rating: 4,
    },
];

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-14 sm:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45 }}
                    className="text-center max-w-3xl mx-auto mb-10"
                >
                    <p className="text-cyan-300 text-sm tracking-wide uppercase">Testimonials</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2" style={{ fontFamily: 'Outfit, Manrope, sans-serif' }}>
                        Loved by Travelers Worldwide
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {TESTIMONIALS.map((item, index) => (
                        <motion.article
                            key={item.name}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: index * 0.06 }}
                            whileHover={{ y: -6 }}
                            className="card-glass p-6 hover:border-cyan-400/35"
                        >
                            <div className="flex items-center gap-1 text-amber-300 mb-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={`${item.name}-${i}`} size={15} fill={i < item.rating ? 'currentColor' : 'none'} />
                                ))}
                            </div>
                            <p className="text-white/75 leading-relaxed mb-5">"{item.quote}"</p>
                            <div>
                                <p className="text-white font-semibold" style={{ fontFamily: 'Outfit, Manrope, sans-serif' }}>{item.name}</p>
                                <p className="text-sm text-white/55">{item.role}</p>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
