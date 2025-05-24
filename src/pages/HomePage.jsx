import React, { useEffect, useState, useRef } from 'react';
import { Container } from '@mui/material';
import api from '../api/api'; // Your API module with API calls
import VenueCard from '../components/VenueCard';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';

function HomePage() {
    const dispatch = useDispatch();
    const [venues, setVenues] = useState([]);
    const [bookings, setBookings] = useState([]); // Bookings data
    const [filters, setFilters] = useState({
        name: '',
        locationSearch: '', // single search box for location
        checkIn: '',
        checkOut: '',
        guests: 1,
    });

    const loaderRef = useRef(null);
    const [visibleCount, setVisibleCount] = useState(20); // initial number of venues to show

    // Fetch venues
    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await api.getVenues();
                if (Array.isArray(response.data.data)) {
                    setVenues(response.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch venues:', err);
            }
        };
        fetchVenues();
    }, [dispatch]);

    // IntersectionObserver for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && visibleCount < venues.length) {
                // Increase visibleCount when near bottom
                setTimeout(() => {
                    setVisibleCount(prev => Math.min(prev + 20, venues.length));
                }, 300); // small delay for smoothness
            }
        });
        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }
        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [venues, visibleCount]);

    // Filtering venues
    const filteredVenues = venues.filter(venue => {
        const location = venue.location || {};
        const address = location.address || '';
        const city = location.city || '';
        const country = location.country || '';

        const search = filters.locationSearch.trim().toLowerCase();

        const locationMatch =
            !search ||
            address.toLowerCase().includes(search) ||
            city.toLowerCase().includes(search) ||
            country.toLowerCase().includes(search);

        const nameMatch = venue.name.toLowerCase().includes(filters.name.toLowerCase());
        const guestsMatch = venue.maxGuests >= filters.guests;

        let available = true;
        if (filters.checkIn && filters.checkOut) {
            const dateFrom = new Date(filters.checkIn);
            const dateTo = new Date(filters.checkOut);
            const venueBookings = bookings.filter(b => b.venueId === venue.id);
            available = !venueBookings.some(booking => {
                const bookedStart = new Date(booking.dateFrom);
                const bookedEnd = new Date(booking.dateTo);
                return dateFrom <= bookedEnd && dateTo >= bookedStart; // overlap
            });
        }

        return nameMatch && locationMatch && guestsMatch && available;
    });

    const venuesToRender = filteredVenues.slice(0, visibleCount);

    return (
        <>
            <Header />
            <SearchBar filters={filters} setFilters={setFilters} />

            <Container maxWidth="lg" sx={{ py: 4, pt: 10 }}>
                <Grid container spacing={2}>
                    {venuesToRender.map((venue) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4,}} key={venue.id}>
                            <VenueCard venue={venue} />
                        </Grid>
                    ))}
                </Grid>
                <div ref={loaderRef} style={{ height: '20px', margin: '20px 0' }}>
                    {visibleCount >= filteredVenues.length ? 'No more venues' : 'Loading...'}
                </div>
            </Container>
        </>
    );
}

export default HomePage;