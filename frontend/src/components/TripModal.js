import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function TripModal({ open, onClose, onSubmit, trip, setTrip, loading, isEditing = false }) {
    const budgetStrength = useMemo(() => {
        if (!trip?.budget) return 0;
        const amount = Number(trip.budget);
        if (amount >= 100000) return 100;
        if (amount >= 50000) return 70;
        if (amount >= 20000) return 40;
        return 20;
    }, [trip]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-md card-glass my-auto max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <h2 className="text-2xl font-bold text-white">
                        {isEditing ? 'Edit Trip' : 'Create New Trip'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <div className="space-y-5 mb-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Trip Title</label>
                        <input
                            type="text"
                            value={trip.title || ''}
                            onChange={(e) => setTrip((p) => ({ ...p, title: e.target.value }))}
                            placeholder="e.g., Summer Vacation 2026"
                            className="input-field"
                        />
                    </div>

                    {/* Source */}
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Source (Starting Point)</label>
                        <input
                            type="text"
                            value={trip.source || ''}
                            onChange={(e) => setTrip((p) => ({ ...p, source: e.target.value }))}
                            placeholder="e.g., New York"
                            className="input-field"
                        />
                    </div>

                    {/* Destination */}
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Destination</label>
                        <input
                            type="text"
                            value={trip.destination || ''}
                            onChange={(e) => setTrip((p) => ({ ...p, destination: e.target.value }))}
                            placeholder="Enter destination"
                            className="input-field"
                        />
                    </div>

                    {/* Start Date */}
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Start Date</label>
                        <input
                            type="date"
                            value={trip.startDate || ''}
                            onChange={(e) => setTrip((p) => ({ ...p, startDate: e.target.value }))}
                            className="input-field"
                        />
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">End Date</label>
                        <input
                            type="date"
                            value={trip.endDate || ''}
                            onChange={(e) => setTrip((p) => ({ ...p, endDate: e.target.value }))}
                            className="input-field"
                        />
                    </div>

                    {/* Budget */}
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Budget (₹)</label>
                        <input
                            type="number"
                            value={trip.budget || ''}
                            onChange={(e) => setTrip((p) => ({ ...p, budget: e.target.value.replace(/^0+([0-9])/, '$1') }))}
                            placeholder="0"
                            min="0"
                            className="input-field"
                        />
                        {trip.budget && (
                            <div className="mt-2">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-medium text-white/60">Budget strength</span>
                                    <span className="text-xs text-primary-400">
                                        {budgetStrength < 40 ? 'Low' : budgetStrength < 70 ? 'Medium' : 'High'}
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary-500 to-cyan-500 transition-all duration-300"
                                        style={{ width: `${budgetStrength}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Notes</label>
                        <textarea
                            value={trip.itinerary || ''}
                            onChange={(e) => setTrip((p) => ({ ...p, itinerary: e.target.value }))}
                            placeholder="Add trip notes..."
                            rows="3"
                            className="input-field resize-none"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-white/10">
                    <button
                        onClick={onClose}
                        className="flex-1 btn-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        disabled={loading}
                        className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : 'Save Trip'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
