import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import apiClient from '../api/api';

function BookingForm() {
    const { id } = useParams();
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [guests, setGuests] = useState(1);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    const showSnackbar = (message, severity = 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleBookNow = async () => {
        if (!dateFrom || !dateTo) {
            showSnackbar('Please select both start and end dates.');
            return;
        }
        if (guests <= 0) {
            showSnackbar('Guests must be at least 1.');
            return;
        }

        try {
            await apiClient.createBooking({
                dateFrom: dateFrom.toISOString(),
                dateTo: dateTo.toISOString(),
                guests: guests,
                venueId: id,
            });
            showSnackbar('Booking successfully created!', 'success');
        } catch (err) {
            if (err.response && err.response.status === 409) {
                const errorMsg =
                    err.response.data?.errors?.[0]?.message ||
                    'The selected dates and guests either overlap with an existing booking or exceed the maximum guests for this venue.';
                showSnackbar(errorMsg);
            } else {
                console.error('Booking error:', err);
                showSnackbar('Failed to create booking.');
            }
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ maxWidth: 246, mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{display:'flex', justifyContent:'center'}}>
                    Book this Venue
                </Typography>
                <DesktopDatePicker sx={{mb:0.5}}
                    label="From"
                    inputFormat="MM/dd/yyyy"
                    value={dateFrom}
                    onChange={(newVal) => setDateFrom(newVal)}
                    renderInput={(params) => <TextField fullWidth {...params} sx={{ mb: 2 }} />}
                />
                <DesktopDatePicker sx={{mb:0.5}}
                    label="To"
                    inputFormat="MM/dd/yyyy"
                    value={dateTo}
                    onChange={(newVal) => setDateTo(newVal)}
                    renderInput={(params) => <TextField fullWidth {...params} sx={{ mb: 3 }} />}
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

            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </LocalizationProvider>
    );
}

export default BookingForm;