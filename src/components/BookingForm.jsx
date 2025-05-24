import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import apiClient from '../api/api';

function BookingForm() {
    const { id } = useParams();
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [guests, setGuests] = useState(1);
    const [message, setMessage] = useState('');

    const handleBookNow = async () => {
        if (!dateFrom || !dateTo) {
            setMessage('Please select both start and end dates.');
            return;
        }
        if (guests <= 0) {
            setMessage('Guests must be at least 1.');
            return;
        }

        try {
            await apiClient.createBooking({
                dateFrom: dateFrom.toISOString(),
                dateTo: dateTo.toISOString(),
                guests: guests,
                venueId: id,
            });
            setMessage('Booking successfully created!');
        } catch (err) {
            console.error('Booking error:', err);
            setMessage('Failed to create booking.');
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2, marginTop: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Book this Venue
                </Typography>
                <DesktopDatePicker
                    label="From"
                    inputFormat="MM/dd/yyyy"
                    value={dateFrom}
                    onChange={(newVal) => setDateFrom(newVal)}
                    renderInput={(params) => <TextField fullWidth {...params} sx={{ mb: 2 }} />}
                />
                <DesktopDatePicker
                    label="To"
                    inputFormat="MM/dd/yyyy"
                    value={dateTo}
                    onChange={(newVal) => setDateTo(newVal)}
                    renderInput={(params) => <TextField fullWidth {...params} sx={{ mb: 2 }} />}
                />
                <TextField
                    label="Guests"
                    type="number"
                    inputProps={{ min: 1 }}
                    fullWidth
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" fullWidth onClick={handleBookNow}>
                    Book Now
                </Button>
                {message && (
                    <Typography sx={{ mt: 2 }} color="textSecondary" align="center">
                        {message}
                    </Typography>
                )}
            </Box>
        </LocalizationProvider>
    );
}

export default BookingForm;