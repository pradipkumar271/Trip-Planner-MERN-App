// import React, { useState, useEffect, useMemo } from 'react';
// import { motion } from 'framer-motion';
// import { useLocation } from 'react-router-dom';
// import { parseISO, isAfter, isBefore } from 'date-fns';
// import { Plus, Search, Loader, Plane, Calendar, DollarSign } from 'lucide-react';
// import Sidebar from '../components/Sidebar';
// import Topbar from '../components/Topbar';
// import TripCard from '../components/TripCard';
// import TripModal from '../components/TripModal';
// import Chatbot from '../components/Chatbot';
// import api from '../services/api';
// import { useAuth } from '../contexts/AuthContext';

// const initialTrip = { title: '', source: '', destination: '', startDate: '', endDate: '', budget: '', itinerary: '' };

// const Dashboard = () => {
//     const location = useLocation();
//     const { logout } = useAuth();
//     const [trips, setTrips] = useState([]);
//     const [query, setQuery] = useState('');
//     const [filter, setFilter] = useState('all');
//     const [loading, setLoading] = useState(false);
//     const [modalOpen, setModalOpen] = useState(false);
//     const [selectedTrip, setSelectedTrip] = useState(null);
//     const [formTrip, setFormTrip] = useState(initialTrip);
//     const [saving, setSaving] = useState(false);

//     useEffect(() => {
//         loadTrips();
//     }, []);

//     // Handle navigation from Discover page with destination pre-filled
//     useEffect(() => {
//         if (location.state?.destination && !modalOpen) {
//             setSelectedTrip(null);
//             setFormTrip({
//                 title: '',
//                 source: '',
//                 destination: location.state.destination,
//                 startDate: '',
//                 endDate: '',
//                 budget: '',
//                 itinerary: ''
//             });
//             setModalOpen(true);
//         }
//     }, [location]);

//     const loadTrips = async () => {
//         try {
//             setLoading(true);
//             const response = await api.get('/api/trips');
//             setTrips(response.data);
//         } catch (error) {
//             console.error('Error loading trips', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const filteredTrips = useMemo(() => {
//         const now = new Date();
//         return trips
//             .filter((trip) => (trip.destination || '').toLowerCase().includes(query.toLowerCase()))
//             .filter((trip) => {
//                 if (filter === 'upcoming') {
//                     return trip.startDate ? isAfter(parseISO(trip.startDate), now) : true;
//                 }
//                 if (filter === 'past') {
//                     return trip.endDate ? isBefore(parseISO(trip.endDate), now) : false;
//                 }
//                 return true;
//             });
//     }, [trips, query, filter]);

//     const openCreate = () => {
//         setSelectedTrip(null);
//         setFormTrip(initialTrip);
//         setModalOpen(true);
//     };

//     const openEdit = (trip) => {
//         setSelectedTrip(trip);
//         setFormTrip({
//             title: trip.title || '',
//             source: trip.source || '',
//             destination: trip.destination || '',
//             startDate: trip.dates?.start ? trip.dates.start.split('T')[0] : '',
//             endDate: trip.dates?.end ? trip.dates.end.split('T')[0] : '',
//             budget: trip.budget || '',
//             itinerary: trip.itinerary || '',
//         });
//         setModalOpen(true);
//     };

//     const handleSave = async () => {
//         // Validate all required fields with explicit checks
//         const trimTitle = formTrip.title?.trim();
//         const trimSource = formTrip.source?.trim();
//         const trimDest = formTrip.destination?.trim();
//         const startStr = formTrip.startDate?.trim();
//         const endStr = formTrip.endDate?.trim();

//         if (!trimTitle || !trimSource || !trimDest || !startStr || !endStr) {
//             alert('Please fill in all required fields: Title, Source, Destination, and Dates');
//             return;
//         }

//         setSaving(true);
//         try {
//             console.log('Raw form data:', {
//                 startDate: formTrip.startDate,
//                 endDate: formTrip.endDate,
//                 title: formTrip.title,
//                 source: formTrip.source,
//                 destination: formTrip.destination
//             });

//             // Create Date objects from the date strings
//             // HTML5 date input returns YYYY-MM-DD format
//             const startDate = new Date(formTrip.startDate);
//             const endDate = new Date(formTrip.endDate);

//             console.log('Parsed Dates:', {
//                 startDate: startDate,
//                 endDate: endDate,
//                 startISO: startDate.toISOString(),
//                 endISO: endDate.toISOString(),
//                 startTime: startDate.getTime(),
//                 endTime: endDate.getTime()
//             });

//             // Validate dates
//             if (isNaN(startDate.getTime())) {
//                 alert('Invalid start date. Please use the date picker.');
//                 setSaving(false);
//                 return;
//             }
//             if (isNaN(endDate.getTime())) {
//                 alert('Invalid end date. Please use the date picker.');
//                 setSaving(false);
//                 return;
//             }

//             const tripData = {
//                 title: trimTitle,
//                 source: trimSource,
//                 destination: trimDest,
//                 startDate: startDate.toISOString(),
//                 endDate: endDate.toISOString(),
//                 budget: formTrip.budget ? parseInt(formTrip.budget, 10) : 0,
//                 itinerary: formTrip.itinerary?.trim() || ''
//             };

//             console.log('Final Trip Data to send:', JSON.stringify(tripData, null, 2));

//             let response;
//             if (selectedTrip) {
//                 response = await api.put(`/api/trips/${selectedTrip._id}`, tripData);
//                 console.log('Update response:', response.data);
//             } else {
//                 response = await api.post('/api/trips', tripData);
//                 console.log('Create response:', response.data);
//             }

//             alert('Trip saved successfully!');
//             setModalOpen(false);
//             setFormTrip(initialTrip);
//             await loadTrips();
//         } catch (error) {
//             console.error('Save trip error:', error);
//             console.error('Error response:', error?.response?.data);
//             const errorMsg = error?.response?.data?.message || error?.message || 'Failed to save trip';
//             alert(`Error: ${errorMsg}`);
//         } finally {
//             setSaving(false);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm('Delete this trip?')) return;
//         try {
//             await api.delete(`/api/trips/${id}`);
//             setTrips((prev) => prev.filter((trip) => trip._id !== id));
//         } catch (error) {
//             console.error('Delete trip error', error);
//         }
//     };

//     const totalBudget = trips.reduce((sum, trip) => sum + Number(trip.budget || 0), 0);
//     const upcomingCount = trips.filter((trip) => trip.dates?.start && isAfter(parseISO(trip.dates.start), new Date())).length;

//     return (
//         <div className="flex min-h-screen bg-gradient-dark">
//             <Sidebar onLogout={logout} />
//             <div className="flex-1 lg:ml-64 flex flex-col">
//                 <Topbar />

//                 <main className="flex-1 overflow-y-auto pt-24 lg:pt-20 pb-12">
//                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                         {/* Header */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.4 }}
//                             className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
//                         >
//                             <div>
//                                 <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Your Trips</h1>
//                                 <p className="text-white/60">Manage your journeys and ask AI for travel advice</p>
//                             </div>
//                             <button
//                                 onClick={openCreate}
//                                 className="btn-primary flex items-center gap-2 w-fit"
//                             >
//                                 <Plus size={20} />
//                                 New Trip
//                             </button>
//                         </motion.div>

//                         {/* Stats Cards */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.4, delay: 0.1 }}
//                             className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
//                         >
//                             {/* Total Trips */}
//                             <div className="card-glass p-6">
//                                 <div className="flex items-center justify-between mb-4">
//                                     <h3 className="text-white/80 font-medium">Total Trips</h3>
//                                     <div className="p-2.5 rounded-lg bg-primary-500/20 text-primary-400">
//                                         <Plane size={20} />
//                                     </div>
//                                 </div>
//                                 <p className="text-4xl font-bold text-white">{trips.length}</p>
//                                 <p className="text-sm text-white/50 mt-2">All your adventures</p>
//                             </div>

//                             {/* Upcoming Trips */}
//                             <div className="card-glass p-6">
//                                 <div className="flex items-center justify-between mb-4">
//                                     <h3 className="text-white/80 font-medium">Upcoming Trips</h3>
//                                     <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400">
//                                         <Calendar size={20} />
//                                     </div>
//                                 </div>
//                                 <p className="text-4xl font-bold text-white">{upcomingCount}</p>
//                                 <p className="text-sm text-white/50 mt-2">Coming soon</p>
//                             </div>

//                             {/* Budget */}
//                             <div className="card-glass p-6">
//                                 <div className="flex items-center justify-between mb-4">
//                                     <h3 className="text-white/80 font-medium">Total Budget</h3>
//                                     <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
//                                         <DollarSign size={20} />
//                                     </div>
//                                 </div>
//                                 <p className="text-4xl font-bold text-white">${totalBudget.toLocaleString()}</p>
//                                 <p className="text-sm text-white/50 mt-2">Planned spending</p>
//                             </div>
//                         </motion.div>

//                         {/* Search & Filter */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.4, delay: 0.2 }}
//                             className="card-glass p-6 mb-8"
//                         >
//                             <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
//                                 {/* Search */}
//                                 <div className="flex-1 relative">
//                                     <Search className="absolute left-4 top-3.5 w-5 h-5 text-primary-400/60 pointer-events-none" />
//                                     <input
//                                         type="text"
//                                         value={query}
//                                         onChange={(e) => setQuery(e.target.value)}
//                                         placeholder="Search destination..."
//                                         className="input-field pl-12 w-full"
//                                     />
//                                 </div>

//                                 {/* Filter Buttons */}
//                                 <div className="flex gap-2 flex-wrap">
//                                     {['all', 'upcoming', 'past'].map((f) => (
//                                         <button
//                                             key={f}
//                                             onClick={() => setFilter(f)}
//                                             className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-300 capitalize ${filter === f
//                                                 ? 'bg-gradient-to-r from-primary-600 to-cyan-600 text-white shadow-glow-blue'
//                                                 : 'text-white/60 hover:text-white hover:bg-white/10'
//                                                 }`}
//                                         >
//                                             {f}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>
//                         </motion.div>

//                         {/* Trips Grid or Loading */}
//                         {loading ? (
//                             <div className="flex items-center justify-center py-20">
//                                 <div className="flex flex-col items-center gap-4">
//                                     <Loader className="w-12 h-12 text-primary-500 animate-spin" />
//                                     <p className="text-white/60">Loading your trips...</p>
//                                 </div>
//                             </div>
//                         ) : filteredTrips.length > 0 ? (
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                                 {filteredTrips.map((trip) => (
//                                     <TripCard
//                                         key={trip._id}
//                                         trip={trip}
//                                         onEdit={openEdit}
//                                         onDelete={handleDelete}
//                                     />
//                                 ))}
//                             </div>
//                         ) : (
//                             <motion.div
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 className="card-glass p-12 text-center border border-white/10"
//                             >
//                                 <Plane className="w-16 h-16 text-white/20 mx-auto mb-4" />
//                                 <h3 className="text-xl font-bold text-white mb-2">No trips found</h3>
//                                 <p className="text-white/60 mb-6">
//                                     {query ? 'Try adjusting your search' : 'Create your first adventure now'}
//                                 </p>
//                                 {!query && (
//                                     <button
//                                         onClick={openCreate}
//                                         className="btn-primary inline-flex items-center gap-2"
//                                     >
//                                         <Plus size={20} />
//                                         Create Trip
//                                     </button>
//                                 )}
//                             </motion.div>
//                         )}
//                     </div>
//                 </main>

//                 {/* Trip Modal */}
//                 <TripModal
//                     open={modalOpen}
//                     onClose={() => setModalOpen(false)}
//                     onSubmit={handleSave}
//                     trip={formTrip}
//                     setTrip={setFormTrip}
//                     loading={saving}
//                 />

//                 {/* Chatbot */}
//                 <Chatbot />
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { parseISO, isAfter, isBefore } from 'date-fns';
import { Plus, Search, Loader, Plane, Calendar, IndianRupee } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import TripCard from '../components/TripCard';
import TripModal from '../components/TripModal';
import Chatbot from '../components/Chatbot';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const initialTrip = { title: '', source: '', destination: '', startDate: '', endDate: '', budget: '', itinerary: '' };

const Dashboard = () => {
    const location = useLocation();
    const { logout } = useAuth();
    const [trips, setTrips] = useState([]);
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [formTrip, setFormTrip] = useState(initialTrip);
    const [saving, setSaving] = useState(false);

    const getTripDateValue = (trip, key) => {
        if (key === 'start') {
            return trip?.dates?.start || trip?.startDate;
        }
        return trip?.dates?.end || trip?.endDate;
    };

    const parseTripDate = (value) => {
        if (!value) return null;
        const parsed = typeof value === 'string' ? parseISO(value) : new Date(value);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    };

    useEffect(() => {
        loadTrips();
    }, []);

    // Pre-fill destination if navigated from Discover page
    useEffect(() => {
        if (location.state?.destination && !modalOpen) {
            setSelectedTrip(null);
            setFormTrip({ ...initialTrip, destination: location.state.destination, budget: location.state.budget ? String(location.state.budget) : '' });
            setModalOpen(true);
        }
    }, [location]);

    const loadTrips = async ({ silent = false } = {}) => {
        try {
            setLoading(true);
            const response = await api.get('/api/trips');
            setTrips(response.data);
            return true;
        } catch (error) {
            console.error('Error loading trips', error);
            if (error?.response?.status === 401) {
                logout();
            }
            if (!silent) {
                alert(error?.response?.data?.message || 'Failed to load trips');
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const filteredTrips = useMemo(() => {
        const now = new Date();
        return trips
            .filter((trip) => (trip.destination || '').toLowerCase().includes(query.toLowerCase()))
            .filter((trip) => {
                const startDate = parseTripDate(getTripDateValue(trip, 'start'));
                const endDate = parseTripDate(getTripDateValue(trip, 'end'));

                if (filter === 'upcoming') {
                    return startDate ? isAfter(startDate, now) : true;
                }
                if (filter === 'past') {
                    return endDate ? isBefore(endDate, now) : false;
                }
                return true;
            });
    }, [trips, query, filter]);

    const openCreate = () => {
        setSelectedTrip(null);
        setFormTrip(initialTrip);
        setModalOpen(true);
    };

    const openEdit = (trip) => {
        const existingStart = getTripDateValue(trip, 'start');
        const existingEnd = getTripDateValue(trip, 'end');

        setSelectedTrip(trip);
        setFormTrip({
            title: trip.title || '',
            source: trip.source || '',
            destination: trip.destination || '',
            startDate: existingStart ? String(existingStart).split('T')[0] : '',
            endDate: existingEnd ? String(existingEnd).split('T')[0] : '',
            budget: trip.budget || '',
            itinerary: trip.itinerary || '',
        });
        setModalOpen(true);
    };

    const handleSave = async () => {
        const trimTitle = formTrip.title?.trim();
        const trimSource = formTrip.source?.trim();
        const trimDest = formTrip.destination?.trim();
        const startStr = formTrip.startDate?.trim();
        const endStr = formTrip.endDate?.trim();

        const missingFields = [];
        if (!trimTitle) missingFields.push('Title');
        if (!trimSource) missingFields.push('Source');
        if (!trimDest) missingFields.push('Destination');
        if (!startStr) missingFields.push('Start Date');
        if (!endStr) missingFields.push('End Date');

        if (missingFields.length > 0) {
            alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return;
        }

        const startDate = new Date(formTrip.startDate);
        const endDate = new Date(formTrip.endDate);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            alert('Invalid dates. Please use the date picker.');
            return;
        }

        if (endDate < startDate) {
            alert('End date cannot be earlier than start date.');
            return;
        }

        setSaving(true);
        try {
            const parsedBudget = Number(formTrip.budget);

            const tripData = {
                title: trimTitle,
                source: trimSource,
                destination: trimDest,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                budget: Number.isFinite(parsedBudget) && parsedBudget >= 0 ? parsedBudget : 0,
                background: formTrip.background?.trim() || '',
                itinerary: formTrip.itinerary?.trim() || '',
                activities: selectedTrip?.activities || [],
            };

            let response;
            if (selectedTrip) {
                response = await api.put(`/api/trips/${selectedTrip._id}`, tripData);
            } else {
                response = await api.post('/api/trips', tripData);
            }

            const savedTrip = response.data;
            setTrips((previousTrips) => {
                if (selectedTrip) {
                    return previousTrips.map((trip) => (trip._id === savedTrip._id ? savedTrip : trip));
                }
                return [savedTrip, ...previousTrips];
            });

            alert('Trip saved successfully!');
            setModalOpen(false);
            setSelectedTrip(null);
            setFormTrip(initialTrip);

            const refreshed = await loadTrips({ silent: true });
            if (!refreshed) {
                alert('Trip saved, but refreshing the trip list failed. Please reload the page.');
            }
        } catch (error) {
            console.error('Save trip error:', error);
            if (error?.response?.status === 401) {
                logout();
            }
            alert(error?.response?.data?.message || 'Failed to save trip');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this trip?')) return;
        try {
            await api.delete(`/api/trips/${id}`);
            setTrips((prev) => prev.filter((trip) => trip._id !== id));
        } catch (error) {
            console.error('Delete trip error', error);
        }
    };

    const totalBudget = trips.reduce((sum, trip) => sum + Number(trip.budget || 0), 0);
    const upcomingCount = trips.filter((trip) => {
        const startDate = parseTripDate(getTripDateValue(trip, 'start'));
        return startDate ? isAfter(startDate, new Date()) : false;
    }).length;

    return (
        <div className="flex min-h-full bg-gradient-dark">
            <Sidebar onLogout={logout} />
            <div className="flex-1 lg:ml-64 flex flex-col">
                <Topbar />
                <main className="flex-1 overflow-y-auto pt-24 lg:pt-20 pb-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Your Trips</h1>
                                <p className="text-white/60">Manage your journeys and ask AI for travel advice</p>
                            </div>
                            <button onClick={openCreate} className="btn-primary flex items-center gap-2 w-fit">
                                <Plus size={20} /> New Trip
                            </button>
                        </motion.div>

                        {/* Stats Cards */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="card-glass p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-white/80 font-medium">Total Trips</h3>
                                    <div className="p-2.5 rounded-lg bg-primary-500/20 text-primary-400">
                                        <Plane size={20} />
                                    </div>
                                </div>
                                <p className="text-4xl font-bold text-white">{trips.length}</p>
                                <p className="text-sm text-white/50 mt-2">All your adventures</p>
                            </div>

                            <div className="card-glass p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-white/80 font-medium">Upcoming Trips</h3>
                                    <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                                        <Calendar size={20} />
                                    </div>
                                </div>
                                <p className="text-4xl font-bold text-white">{upcomingCount}</p>
                                <p className="text-sm text-white/50 mt-2">Coming soon</p>
                            </div>

                            <div className="card-glass p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-white/80 font-medium">Total Budget</h3>
                                    <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                                        <IndianRupee size={20} />
                                    </div>
                                </div>
                                <p className="text-4xl font-bold text-white">₹{totalBudget.toLocaleString('en-IN')}</p>
                                <p className="text-sm text-white/50 mt-2">Planned spending</p>
                            </div>
                        </motion.div>

                        {/* Search & Filter */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="card-glass p-6 mb-8">
                            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-primary-400/60 pointer-events-none" />
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search destination..."
                                        className="input-field pl-12 w-full"
                                    />
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {['all', 'upcoming', 'past'].map((f) => (
                                        <button
                                            key={f}
                                            onClick={() => setFilter(f)}
                                            className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-300 capitalize ${filter === f
                                                ? 'bg-gradient-to-r from-primary-600 to-cyan-600 text-white shadow-glow-blue'
                                                : 'text-white/60 hover:text-white hover:bg-white/10'
                                                }`}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Trips Grid */}
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader className="w-12 h-12 text-primary-500 animate-spin" />
                            </div>
                        ) : filteredTrips.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredTrips.map((trip) => (
                                    <TripCard
                                        key={trip._id}
                                        trip={trip}
                                        onEdit={openEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-glass p-12 text-center border border-white/10">
                                <Plane className="w-16 h-16 text-white/20 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">No trips found</h3>
                                <p className="text-white/60 mb-6">{query ? 'Try adjusting your search' : 'Create your first adventure now'}</p>
                                {!query && (
                                    <button onClick={openCreate} className="btn-primary inline-flex items-center gap-2">
                                        <Plus size={20} /> Create Trip
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </div>
                </main>

                {/* Trip Modal */}
                <TripModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleSave}
                    trip={formTrip}
                    setTrip={setFormTrip}
                    isEditing={Boolean(selectedTrip)}
                    loading={saving}
                />

                {/* Chatbot */}
                <Chatbot />
            </div>
        </div>
    );
};

export default Dashboard;