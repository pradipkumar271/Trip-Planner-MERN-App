import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container, Typography, Button, Card, CardContent, Grid,
    TextField, Box, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { format } from 'date-fns';

const Dashboard = () => {
    const [trips, setTrips] = useState([]);
    const [open, setOpen] = useState(false);
    const [newTrip, setNewTrip] = useState({
        title: '',
        source: '',
        destination: '',
        startDate: '',
        endDate: '',
        budget: 0,
        background: '',
        itinerary: ''
    });

    useEffect(() => {
        fetchTrips();
    }, []);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    const fetchCoordinates = async (place) => {
        try {
            const resp = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`);
            const data = await resp.json();
            if (data.length === 0) return null;
            return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
        } catch (err) {
            console.error('Geocode error', err);
            return null;
        }
    };

    const getDistanceKm = (p1, p2) => {
        if (!p1 || !p2) return null;
        const toRad = (v) => (v * Math.PI) / 180;
        const R = 6371;
        const dLat = toRad(p2.lat - p1.lat);
        const dLon = toRad(p2.lon - p1.lon);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(p1.lat)) * Math.cos(toRad(p2.lat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const fetchTrips = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:5000/api/trips', {
                headers: getAuthHeaders(),
            });

            const enriched = await Promise.all(res.data.map(async (trip) => {
                const sourceCoords = trip.source ? await fetchCoordinates(trip.source) : null;
                const destCoords = trip.destination ? await fetchCoordinates(trip.destination) : null;
                return {
                    ...trip,
                    sourceCoords,
                    destCoords,
                    distanceKm: sourceCoords && destCoords ? getDistanceKm(sourceCoords, destCoords) : null,
                };
            }));

            setTrips(enriched);
        } catch (err) {
            console.error('Failed to fetch trips', err);
            if (err.response) {
                alert(`Fetch trips failed: ${err.response.data.message || err.response.statusText}`);
            } else {
                alert('Fetch trips failed: Network Error');
            }
        }
    };

    const handleSubmit = async () => {
        try {
            await axios.post('http://127.0.0.1:5000/api/trips', newTrip, {
                headers: getAuthHeaders(),
            });
            setOpen(false);
            setNewTrip({ title: '', source: '', destination: '', startDate: '', endDate: '', budget: 0, background: '', itinerary: '' });
            fetchTrips();
        } catch (err) {
            console.error('Add trip failed', err);
            if (err.response) {
                alert(`Add trip failed: ${err.response.data.message || err.response.statusText}`);
            } else {
                alert('Add trip failed: Network Error');
            }
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h4">My Trips</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpen(true)}
                >
                    Add Trip
                </Button>
            </Box>

            <Grid container spacing={3}>
                {trips.map(trip => {
                    const mapPlace = trip.destCoords || trip.sourceCoords ?
                        `${trip.source || ''} ${trip.destination || ''}` : trip.destination;
                    const mapUrl = `https://www.openstreetmap.org/export/embed.html?search=${encodeURIComponent(mapPlace)}`;

                    return (
                        <Grid item xs={12} sm={6} md={4} key={trip._id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{trip.title}</Typography>
                                    <Typography color="textSecondary">{trip.source} → {trip.destination}</Typography>
                                    <Typography sx={{ mt: 1 }}>
                                        {format(new Date(trip.dates.start), 'MMM dd')} -
                                        {format(new Date(trip.dates.end), 'MMM dd')}
                                    </Typography>
                                    <Typography>Budget: ${trip.budget}</Typography>
                                    {trip.distanceKm && (
                                        <Typography color="textSecondary">
                                            Distance: {trip.distanceKm.toFixed(1)} km
                                        </Typography>
                                    )}
                                    {trip.background && (
                                        <Typography sx={{ mt: 1 }}>{trip.background}</Typography>
                                    )}
                                    {trip.itinerary && (
                                        <Typography sx={{ mt: 1 }} color="textSecondary">
                                            Plan: {trip.itinerary}
                                        </Typography>
                                    )}
                                    <Box sx={{ mt: 2, height: 200 }}>
                                        <iframe
                                            title={`map-${trip._id}`}
                                            src={mapUrl}
                                            style={{ border: 0, width: '100%', height: '100%' }}
                                            loading="lazy"
                                        />
                                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                            Map view: source+destination location search
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Add Trip Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Trip</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Trip Title"
                        value={newTrip.title}
                        onChange={(e) => setNewTrip({ ...newTrip, title: e.target.value })}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Source"
                        value={newTrip.source}
                        onChange={(e) => setNewTrip({ ...newTrip, source: e.target.value })}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Destination"
                        value={newTrip.destination}
                        onChange={(e) => setNewTrip({ ...newTrip, destination: e.target.value })}
                        sx={{ mt: 2 }}
                    />
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <TextField
                            type="date"
                            label="Start Date"
                            value={newTrip.startDate}
                            onChange={(e) => setNewTrip({ ...newTrip, startDate: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            type="date"
                            label="End Date"
                            value={newTrip.endDate}
                            onChange={(e) => setNewTrip({ ...newTrip, endDate: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Box>
                    <TextField
                        fullWidth
                        label="Budget ($)"
                        type="number"
                        value={newTrip.budget}
                        onChange={(e) => setNewTrip({ ...newTrip, budget: e.target.value })}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Trip Background"
                        multiline
                        minRows={2}
                        value={newTrip.background}
                        onChange={(e) => setNewTrip({ ...newTrip, background: e.target.value })}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Itinerary / Enjoyment Notes"
                        multiline
                        minRows={3}
                        value={newTrip.itinerary}
                        onChange={(e) => setNewTrip({ ...newTrip, itinerary: e.target.value })}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Add Trip</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Dashboard;
