import React, { useEffect, useState } from 'react';
import { Container, Grid} from '@mui/material';
import api from '../api/api'; // Your API module with API calls
import VenueCard from '../components/VenueCard';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import { setVenues } from '../store/venueSlice';

function HomePage() {
    const dispatch = useDispatch();

    // Fetch and set user from localStorage once on component mount
    useEffect(() => {
        const storedUserStr = localStorage.getItem('user');
        if (storedUserStr) {
            const storedUser = JSON.parse(storedUserStr);
            // Convert accountType to boolean
            const accountTypeBool = storedUser.accountType === 'true';

            dispatch(setUser({
                ...storedUser,
                // Ensure accountType is boolean
                accountType: accountTypeBool,
            }));
        }
    }, [dispatch]);

    const [venues, setVenues] = useState([]);
    const [bookings, setBookings] = useState([]); // Bookings data

    const [filters, setFilters] = useState({
        id: '',
        name: '',
        country: '',
        city: '',
        continent: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
    });

    // Fetch venues
    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await api.getVenues();
                if (Array.isArray(response.data.data)) {
                    setVenues(response.data.data);
                    dispatch(setVenues(response.data.data)); // save to redux
                } else {
                    console.warn('Response data is not an array:', response.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch venues:', err);
            }
        };
        fetchVenues();
    }, [dispatch]);

    // Fetch bookings
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.getBookings();
                if (Array.isArray(response.data.data)) {
                    setBookings(response.data.data);
                } else {
                    console.warn('Bookings data is not an array:', response.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch bookings:', err);
            }
        };
        fetchBookings();
    }, []);

    // Check availability
    const checkAvailability = (venueId, dateFrom, dateTo) => {
        const venueBookings = bookings.filter(b => b.venueId === venueId);
        return !venueBookings.some((b) => {
            const bookedStart = new Date(b.dateFrom);
            const bookedEnd = new Date(b.dateTo);
            return dateFrom <= bookedEnd && dateTo >= bookedStart;
        });
    };

    const dateFromFilter = filters.checkIn ? new Date(filters.checkIn) : null;
    const dateToFilter = filters.checkOut ? new Date(filters.checkOut) : null;

    // Filter venues with availability and other filters
    const filteredVenues = (venues || []).filter((venue) => {
        const nameMatch = venue.name.toLowerCase().includes(filters.name.toLowerCase());
        const country = venue.location?.country || '';
        const countryMatch = filters.country ? country.toLowerCase().includes(filters.country.toLowerCase()) : true;
        const city = venue.location?.city || '';
        const cityMatch = filters.city ? city.toLowerCase().includes(filters.city.toLowerCase()) : true;
        const guestsMatch = venue.maxGuests >= filters.guests;

        // Check availability only if dates are set
        let available = true;
        if (dateFromFilter && dateToFilter && venue.id) {
            available = checkAvailability(venue.id, dateFromFilter, dateToFilter);
        }

        return nameMatch && countryMatch && cityMatch && guestsMatch && available;
    });

    return (
        <>
            <Header />
            {/* Filter form */}
            <SearchBar filters={filters} setFilters={setFilters} />

            <Container maxWidth="lg" sx={{ py: 4, pt: 10 }}>



                {/* Venue list */}
                <Grid container spacing={2}>
                    {filteredVenues.map((venue) => (
                        <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={venue.id}>
                            <VenueCard venue={venue} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}

export default HomePage;