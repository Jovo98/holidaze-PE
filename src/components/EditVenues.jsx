import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    IconButton,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Snackbar,
} from '@mui/material';
import apiClient from '../api/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EditVenues = ({ open, handleClose, username }) => {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editOpen, setEditOpen] = useState(false);
    const [currentVenue, setCurrentVenue] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        description: '',
        media: [{ url: '', alt: '' }],
        price: 0,
        maxGuests: 0,
        rating: 0,
        meta: { wifi: false, parking: false, breakfast: false, pets: false },
        location: { address: '', city: '', zip: '', country: '', continent: '' }
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        if (!open || !username) return;

        const fetchUserVenues = async () => {
            setLoading(true);
            try {
                const response = await apiClient.getUserVenues(username);
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
    const handleOpenEdit = (venue) => {
        setCurrentVenue(venue);
        setEditForm({
            name: venue.name,
            description: venue.description,
            media: venue.media || [{ url: '', alt: '' }],
            price: venue.price,
            maxGuests: venue.maxGuests,
            rating: venue.rating || 0,
            meta: {
                wifi: venue.meta?.wifi || false,
                parking: venue.meta?.parking || false,
                breakfast: venue.meta?.breakfast || false,
                pets: venue.meta?.pets || false,
            },
            location: venue.location || { address: '', city: '', zip: '', country: '', continent: '' }
        });
        setEditOpen(true);
    };
    const handleChange = (field, value) => {
        if (field === 'price') {
            const newValue = Math.min(value, 10000);
            setEditForm(prev => ({ ...prev, [field]: newValue }));
        } else if (field === 'maxGuests') {
            const newValue = Math.min(value, 100);
            setEditForm(prev => ({ ...prev, [field]: newValue }));
        } else if (field === 'rating') {
            const newValue = Math.min(value, 5);
            setEditForm(prev => ({ ...prev, [field]: newValue }));
        } else {
            setEditForm(prev => ({ ...prev, [field]: value }));
        }
    };
    const handleMetaChange = (field, value) => {
        setEditForm((prev) => ({
            ...prev,
            meta: { ...prev.meta, [field]: value },
        }));
    };

    const handleSave = async () => {
        try {
            await apiClient.putVenue(currentVenue.id, editForm);
            setSnackbarMessage('Changes saved successfully!');
            setSnackbarOpen(true);
            setEditOpen(false);
        } catch (err) {
            console.error('Failed to update venue', err);
        }
    };
    const handleDelete = async (venueId) => {
        if (window.confirm('Are you sure you want to delete this venue?')) {
            try {
                await apiClient.deleteVenue(venueId);
                const response = await apiClient.getUserVenues(username);
                if (response.data && Array.isArray(response.data.data)) {
                    setVenues(response.data.data);
                }
                setSnackbarMessage('Venue deleted successfully!');
                setSnackbarOpen(true);
            } catch (err) {
                console.error('Failed to delete venue', err);
                setSnackbarMessage('Failed to delete venue.');
                setSnackbarOpen(true);
            }
        }
    };

    return (
        <>
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
                                    <ListItemText
                                        primary={
                                            <span
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => navigate(`/venues/${venue.id}`)}
                                            > {venue.name}
                                            </span>
                                        }
                                    />
                                    <IconButton onClick={() => handleOpenEdit(venue)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(venue.id)}
                                        aria-label="delete"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog
                open={editOpen}
                onClose={() => setEditOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Edit Venue</DialogTitle>
                <DialogContent
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        maxHeight: '80vh',
                        overflowY: 'auto'
                    }}
                >
                    <TextField
                        label="Name"
                        value={editForm.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Description"
                        value={editForm.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Price"
                        type="number"
                        inputProps={{ max: 10000 }}
                        value={editForm.price}
                        onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                        fullWidth
                    />
                    <TextField
                        label="Max Guests"
                        type="number"
                        inputProps={{ max: 100 }}
                        value={editForm.maxGuests}
                        onChange={(e) => handleChange('maxGuests', parseInt(e.target.value) || 0)}
                        fullWidth
                    />
                    <TextField
                        label="Rating"
                        type="number"
                        inputProps={{ max: 5, step: 0.1 }} // step added for more precise ratings
                        value={editForm.rating}
                        onChange={(e) => handleChange('rating', parseFloat(e.target.value) || 0)}
                        fullWidth
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={editForm.meta.wifi}
                                    onChange={(e) => handleMetaChange('wifi', e.target.checked)}
                                />
                            }
                            label="Wi-Fi"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={editForm.meta.parking}
                                    onChange={(e) => handleMetaChange('parking', e.target.checked)}
                                />
                            }
                            label="Parking"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={editForm.meta.breakfast}
                                    onChange={(e) => handleMetaChange('breakfast', e.target.checked)}
                                />
                            }
                            label="Breakfast"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={editForm.meta.pets}
                                    onChange={(e) => handleMetaChange('pets', e.target.checked)}
                                />
                            }
                            label="Pets"
                        />
                    </div>

                    <TextField
                        label="Address"
                        value={editForm.location.address}
                        onChange={(e) =>
                            setEditForm((prev) => ({
                                ...prev,
                                location: { ...prev.location, address: e.target.value },
                            }))
                        }
                        fullWidth
                    />
                    <TextField
                        label="City"
                        value={editForm.location.city}
                        onChange={(e) =>
                            setEditForm((prev) => ({
                                ...prev,
                                location: { ...prev.location, city: e.target.value },
                            }))
                        }
                        fullWidth
                    />
                    <TextField
                        label="Zip"
                        value={editForm.location.zip}
                        onChange={(e) =>
                            setEditForm((prev) => ({
                                ...prev,
                                location: { ...prev.location, zip: e.target.value },
                            }))
                        }
                        fullWidth
                    />
                    <TextField
                        label="Country"
                        value={editForm.location.country}
                        onChange={(e) =>
                            setEditForm((prev) => ({
                                ...prev,
                                location: { ...prev.location, country: e.target.value },
                            }))
                        }
                        fullWidth
                    />
                    <TextField
                        label="Continent"
                        value={editForm.location.continent}
                        onChange={(e) =>
                            setEditForm((prev) => ({
                                ...prev,
                                location: { ...prev.location, continent: e.target.value },
                            }))
                        }
                        fullWidth
                    />
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        color="primary"
                        style={{ alignSelf: 'center', marginTop: '1rem' }}
                    >
                        Save
                    </Button>
                </DialogContent>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </>
    );
};

export default EditVenues;