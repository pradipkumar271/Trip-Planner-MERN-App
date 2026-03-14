import React, { useMemo, useState } from 'react';
import {
    Container,
    Typography,
    Box,
    TextField,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Button,
    Chip,
    Stack
} from '@mui/material';

const deals = [
    {
        id: 1,
        city: 'Goa',
        country: 'India',
        price: 13999,
        currency: 'INR',
        summary: 'Beach resort + watersports + nightlife',
        image: 'https://images.unsplash.com/photo-1541854611996-0de31001e045?auto=format&fit=crop&w=800&q=60'
    },
    {
        id: 2,
        city: 'Dubai',
        country: 'UAE',
        price: 46999,
        currency: 'INR',
        summary: 'Desert safari, luxury stay, Burj Khalifa tickets',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=60'
    },
    {
        id: 3,
        city: 'Singapore',
        country: 'Singapore',
        price: 65999,
        currency: 'INR',
        summary: 'Universal Studios, Gardens by the Bay, Sentosa',
        image: 'https://images.unsplash.com/photo-1543779503-8ba4b794b69f?auto=format&fit=crop&w=800&q=60'
    }
];

const Discover = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    const filteredDeals = useMemo(() => {
        const lower = search.trim().toLowerCase();
        return deals.filter(deal => {
            const matchText = `${deal.city} ${deal.country}`.toLowerCase().includes(lower);
            const matchFilter = filter === 'All' || deal.country === filter;
            return matchText && matchFilter;
        });
    }, [search, filter]);

    const countries = useMemo(() => ['All', ...new Set(deals.map(d => d.country))], []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Discover Great Trips</Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                Search, choose and plan your next unforgettable journey (inspired by Trip.com style).
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                <TextField
                    label="Search destination"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ flex: 1, minWidth: 220 }}
                />
                <TextField
                    select
                    label="Country"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    SelectProps={{ native: true }}
                    sx={{ width: 160 }}
                >
                    {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </TextField>
            </Box>

            <Grid container spacing={3}>
                {filteredDeals.map((deal) => (
                    <Grid item xs={12} sm={6} md={4} key={deal.id}>
                        <Card sx={{ borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                height="180"
                                image={deal.image}
                                alt={`${deal.city} image`}
                            />
                            <CardContent sx={{ flex: 1 }}>
                                <Typography variant="h6" gutterBottom>{deal.city}, {deal.country}</Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {deal.summary}
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>
                                    {deal.currency} {deal.price.toLocaleString('en-IN')}
                                </Typography>
                                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                    <Chip label="2 nights" size="small" />
                                    <Chip label="Flight + Hotel" size="small" />
                                </Stack>
                            </CardContent>
                            <Box sx={{ p: 2, pt: 0 }}>
                                <Button variant="contained" fullWidth>Book now</Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 5, p: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
                <Typography variant="h5" sx={{ mb: 1 }}>Trip Explorer Guide</Typography>
                <Typography>
                    Plan your journey with meaningful details. Pick start (source) and destination, explore popular attractions,
                    add local tips, map your distance, and save your experiences. Our app shows you trip preview cards + route ready for your next escape.
                </Typography>
            </Box>
        </Container>
    );
};

export default Discover;
