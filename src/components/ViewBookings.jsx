import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, CircularProgress, IconButton, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../api/api';

const ViewBookings = ({ open, handleClose, username }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const formatDate = (dateStr) => new Date(dateStr).toISOString().slice(0, 10);

    const fetchBookings = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await api.getProfileBookings(username)
            if (response.data && Array.isArray(response.data.data)) {
                setBookings(response.data.data);
            } else {
                setError('No bookings found');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open && username) {
            fetchBookings();
        }
    }, [open, username]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            try {
                await api.deleteBooking(id)
                setSnackbarMessage('Delete successful!');
                setSnackbarOpen(true);
                setBookings((prev) => prev.filter((b) => b.id !== id));
            } catch (err) {
                alert('Failed to delete booking.');
                console.error('Delete error:', err);
            }
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Bookings</DialogTitle>
            <DialogContent>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <p>{error}</p>
                ) : bookings.length === 0 ? (
                    <p>No bookings found.</p>
                ) : (
                    <List>
                        {bookings.map((booking) => (
                            <ListItem key={booking.id} divider>
                                <ListItemText
                                    primary={`Guests: ${booking.guests}`}
                                    secondary={`From: ${formatDate(booking.dateFrom)} To: ${formatDate(booking.dateTo)}`}
                                />
                                {/* Trashcan icon button */}
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => handleDelete(booking.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                )}
            </DialogContent>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Dialog>
    );
};

export default ViewBookings;