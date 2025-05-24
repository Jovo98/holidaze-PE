import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import api from '../api/api';

const EditVenues = ({ open, handleClose, username }) => {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!open || !username) return;

        const fetchUserVenues = async () => {
            setLoading(true);
            try {
                const response = await api.getUserVenues(username);
                // response.data is an object with 'data' array
                if (response.data && Array.isArray(response.data.data)) {
                    setVenues(response.data.data);
                } else {
                    setError('No venues found');
                }
            } catch (err) {
                setError('Failed to fetch venues');
            } finally {
                setLoading(false);
            }
        };

        fetchUserVenues();
    }, [open, username]);

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>My Venues</DialogTitle>
            <DialogContent>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <p>{error}</p>
                ) : venues.length === 0 ? (
                    <p>No venues found.</p>
                ) : (
                    <List>
                        {venues.map((venue) => (
                            <ListItem key={venue.id} button>
                                <ListItemText primary={venue.name} />
                                {/* Save venue.id somewhere if needed */}
                            </ListItem>
                        ))}
                    </List>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default EditVenues;