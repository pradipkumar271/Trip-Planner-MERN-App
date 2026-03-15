import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Clock, Plane, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const deals = [
    {
        id: 1,
        city: "Goa",
        country: "India",
        price: 13999,
        currency: "INR",
        summary: "Beach resort + watersports + nightlife",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=60",
        duration: "2 nights",
        type: "Beach Escape"
    },
    {
        id: 2,
        city: "Dubai",
        country: "UAE",
        price: 46999,
        currency: "INR",
        summary: "Desert safari, luxury stay, Burj Khalifa tickets",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=60",
        duration: "4 nights",
        type: "Luxury Getaway"
    },
    {
        id: 3,
        city: "Singapore",
        country: "Singapore",
        price: 65999,
        currency: "INR",
        summary: "Universal Studios, Gardens by the Bay, Sentosa Island",
        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=60",
        duration: "3 nights",
        type: "Adventure"
    },
    {
        id: 4,
        city: "Manali",
        country: "India",
        price: 10999,
        currency: "INR",
        summary: "Snow mountains, Solang Valley adventure sports",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=60",
        duration: "3 nights",
        type: "Mountain Escape"
    },
    {
        id: 5,
        city: "Bali",
        country: "Indonesia",
        price: 52999,
        currency: "INR",
        summary: "Beach villas, temples, waterfalls tour",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
        duration: "4 nights",
        type: "Tropical Holiday"
    },
    {
        id: 6,
        city: "Shimla",
        country: "India",
        price: 9999,
        currency: "INR",
        summary: "Mall Road walk, Kufri sightseeing, scenic hills",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60",
        duration: "2 nights",
        type: "Hill Station"
    },
    {
        id: 7,
        city: "Maldives",
        country: "Maldives",
        price: 75999,
        currency: "INR",
        summary: "Overwater villa, snorkeling, sunset cruise",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
        duration: "3 nights",
        type: "Luxury Beach"
    },
    {
        id: 8,
        city: "Jaipur",
        country: "India",
        price: 7999,
        currency: "INR",
        summary: "Amber Fort, Hawa Mahal, royal palace stay",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=60",
        duration: "2 nights",
        type: "Cultural Trip"
    },
    {
        id: 9,
        city: "Bangkok",
        country: "Thailand",
        price: 32999,
        currency: "INR",
        summary: "Floating markets, temples, nightlife tour",
        image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=60",
        duration: "3 nights",
        type: "City Adventure"
    },
    {
        id: 10,
        city: "Paris",
        country: "France",
        price: 119999,
        currency: "INR",
        summary: "Eiffel Tower, Louvre Museum, Seine river cruise",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=60",
        duration: "5 nights",
        type: "Romantic Escape"
    },
    {
        id: 11,
        city: "Kashmir",
        country: "India",
        price: 18999,
        currency: "INR",
        summary: "Dal Lake houseboat, Gulmarg snow views",
        image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=60",
        duration: "4 nights",
        type: "Nature Retreat"
    },
    {
        id: 12,
        city: "Tokyo",
        country: "Japan",
        price: 98999,
        currency: "INR",
        summary: "Shibuya crossing, Mt Fuji tour, anime district",
        image: "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=800&q=60",
        duration: "4 nights",
        type: "Modern City"
    },
    {
        id: 13,
        city: "London",
        country: "United Kingdom",
        price: 104999,
        currency: "INR",
        summary: "Big Ben, London Eye, Buckingham Palace tour",
        image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=800&q=60",
        duration: "5 nights",
        type: "Historic City"
    },
    {
        id: 14,
        city: "Rishikesh",
        country: "India",
        price: 6999,
        currency: "INR",
        summary: "River rafting, yoga retreat, Ganga aarti",
        image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=60",
        duration: "2 nights",
        type: "Adventure"
    },
    {
        id: 15,
        city: "New York",
        country: "USA",
        price: 129999,
        currency: "INR",
        summary: "Statue of Liberty, Times Square, Central Park",
        image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=800&q=60",
        duration: "5 nights",
        type: "City Explorer"
    }
];

const Discover = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');
    const [favorites, setFavorites] = useState(new Set());

    const filteredDeals = useMemo(() => {
        const lower = search.trim().toLowerCase();
        return deals.filter(deal => {
            const matchText = `${deal.city} ${deal.country}`.toLowerCase().includes(lower);
            const matchFilter = filter === 'All' || deal.country === filter;
            return matchText && matchFilter;
        });
    }, [search, filter]);

    const countries = useMemo(() => ['All', ...new Set(deals.map(d => d.country))], []);

    const toggleFavorite = (id) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(id)) {
            newFavorites.delete(id);
        } else {
            newFavorites.add(id);
        }
        setFavorites(newFavorites);
    };

    return (
        <div className="min-h-screen bg-gradient-dark pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        Discover Amazing <span className="text-gradient">Destinations</span>
                    </h1>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Explore curated travel packages and find your next unforgettable adventure
                    </p>
                </motion.div>

                {/* Search & Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-12"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-4 w-5 h-5 text-primary-400/60 pointer-events-none" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search destination..."
                                className="input-field pl-12 w-full"
                            />
                        </div>

                        {/* Filter */}
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="input-field md:w-48 px-4"
                        >
                            {countries.map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>
                </motion.div>

                {/* Deals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {filteredDeals.map((deal, idx) => (
                        <motion.div
                            key={deal.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className="group"
                        >
                            <div className="card-glass overflow-hidden flex flex-col h-full hover:border-cyan-500/50">
                                {/* Image */}
                                <div className="relative overflow-hidden h-56">
                                    <img
                                        src={deal.image}
                                        alt={`${deal.city} image`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-900/40"></div>

                                    {/* Badge */}
                                    <div className="absolute top-4 left-4">
                                        <div className="px-3 py-1 rounded-full bg-primary-500/20 backdrop-blur-sm border border-primary-500/30 text-xs font-semibold text-primary-300">
                                            {deal.type}
                                        </div>
                                    </div>

                                    {/* Favorite Button */}
                                    <button
                                        onClick={() => toggleFavorite(deal.id)}
                                        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                                    >
                                        <Heart
                                            size={18}
                                            className={`transition-all ${favorites.has(deal.id) ? 'fill-red-500 text-red-500' : 'text-white/60'
                                                }`}
                                        />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{deal.city}</h3>
                                            <p className="text-sm text-white/60">{deal.country}</p>
                                        </div>
                                    </div>

                                    <p className="text-white/70 text-sm mb-4 line-clamp-2">{deal.summary}</p>

                                    {/* Details */}
                                    <div className="space-y-3 mb-4 pb-4 border-b border-white/10">
                                        <div className="flex items-center gap-2 text-white/60 text-sm">
                                            <Clock size={14} className="text-primary-400" />
                                            <span>{deal.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Plane size={14} className="text-primary-400" />
                                            <span className="text-sm text-white/60">Flight + Hotel Included</span>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="mb-4">
                                        <p className="text-white/60 text-xs mb-1">Starting from</p>
                                        <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-primary-400 to-cyan-400 bg-clip-text">
                                            ₹{deal.price.toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                </div>

                                {/* Action */}
                                <div className="px-6 pb-6 pt-0">
                                    <button
                                        onClick={() => navigate('/dashboard', { state: { destination: deal.city } })}
                                        className="w-full btn-primary group"
                                    >
                                        <span>Plan This Trip</span>
                                        <Plane size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredDeals.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <MapPin className="w-16 h-16 text-white/20 mx-auto mb-4" />
                        <p className="text-white/60 text-lg">No destinations found. Try adjusting your search.</p>
                    </motion.div>
                )}

                {/* Info Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-16 card-glass border-primary-500/20"
                >
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                            <Plane size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Start Your Journey</h3>
                            <p className="text-white/70">
                                Browse our curated collection of travel packages. Each destination is carefully selected with
                                flights, accommodations, and activities included. Save your favorites and plan your next adventure
                                with our AI-powered trip assistant.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Discover;
