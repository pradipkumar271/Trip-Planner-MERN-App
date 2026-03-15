import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Edit2, Trash2, Calendar, DollarSign } from 'lucide-react';

export default function TripCard({ trip, onEdit, onDelete }) {
    const start = new Date(trip.dates?.start || trip.startDate);
    const end = new Date(trip.dates?.end || trip.endDate);

    const startDate = (trip.dates?.start || trip.startDate) ? start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-';
    const endDate = (trip.dates?.end || trip.endDate) ? end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-';

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full"
        >
            <div className="card-glass h-full group hover:border-primary-500/30 flex flex-col justify-between">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        {trip.title && (
                            <p className="text-sm text-primary-300/70 font-semibold mb-1 uppercase">{trip.title}</p>
                        )}
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0" />
                            <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors truncate">{trip.destination}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 ms-2 flex-shrink-0">
                        <button
                            onClick={() => onEdit(trip)}
                            className="p-2 text-white/50 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all duration-300"
                            title="Edit trip"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(trip._id)}
                            className="p-2 text-white/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                            title="Delete trip"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Dates */}
                <div className="flex items-center gap-2 text-white/60 text-sm mb-4 pb-4 border-b border-white/10">
                    <Calendar className="w-4 h-4 text-primary-400/60 flex-shrink-0" />
                    <span>{startDate} - {endDate}</span>
                </div>

                {/* Budget */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 text-primary-400 font-semibold">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-lg">${trip.budget || 0}</span>
                    </div>
                </div>

                {/* Itinerary / Notes */}
                {(trip.itinerary || trip.notes) && (
                    <p className="text-white/60 text-sm line-clamp-2 flex-grow">
                        {trip.itinerary || trip.notes}
                    </p>
                )}

                {/* Footer CTA */}
                <div className="mt-4 pt-4 border-t border-white/10">
                    <button
                        onClick={() => onEdit(trip)}
                        className="w-full px-3 py-2 text-sm font-medium bg-gradient-to-r from-primary-600/20 to-cyan-500/20 text-primary-400 rounded-lg hover:from-primary-600/40 hover:to-cyan-500/40 transition-all duration-300"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

