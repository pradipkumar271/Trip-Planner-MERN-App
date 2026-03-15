import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import ContactForm from '../components/common/ContactForm';

const supportDetails = [
    {
        title: 'Support Email',
        value: 'support@tripplanner.app',
        icon: Mail,
    },
    {
        title: 'Phone',
        value: '+91 98765 43210',
        icon: Phone,
    },
    {
        title: 'Office Location',
        value: 'Ahmedabad, Gujarat, India',
        icon: MapPin,
    },
    {
        title: 'Working Hours',
        value: 'Mon - Sat, 9:00 AM - 6:00 PM',
        icon: Clock,
    },
];

export default function Contact() {
    return (
        <div className="min-h-full bg-gradient-dark">
            <PageHero
                badge="Contact"
                title="Get in Touch"
                subtitle="Questions, feedback, or support needs? We are ready to help you plan better journeys."
                backgroundImage="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1800&q=80"
            />

            <section className="pb-14 sm:pb-16 lg:pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className="lg:col-span-2"
                        >
                            <ContactForm />
                        </motion.div>

                        <motion.aside
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="space-y-4"
                        >
                            <div className="card-glass p-6 space-y-4">
                                <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, Manrope, sans-serif' }}>
                                    Support Details
                                </h3>

                                {supportDetails.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div key={item.title} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                                            <div className="w-9 h-9 rounded-lg bg-cyan-500/12 border border-cyan-400/25 text-cyan-300 flex items-center justify-center">
                                                <Icon size={16} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-white/55">{item.title}</p>
                                                <p className="text-sm text-white/80 mt-0.5">{item.value}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="card-glass p-4">
                                <div className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-dark-800 to-dark-900 min-h-[220px] relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
                                        alt="Office location placeholder"
                                        className="w-full h-full object-cover opacity-45"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="px-3 py-1.5 rounded-full bg-dark-900/70 border border-cyan-400/30 text-cyan-200 text-xs">
                                            Map / Location Placeholder
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.aside>
                    </div>
                </div>
            </section>
        </div>
    );
}
