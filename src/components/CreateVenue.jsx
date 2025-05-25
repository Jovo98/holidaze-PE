import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Box,
    Typography,
    Snackbar,
} from '@mui/material';
import apiClient from "../api/api";

const CreateVenue = ({ open, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        media: [{ url: '', alt: '' }],
        price: 0,
        maxGuests: 0,
        rating: 0,
        meta: {
            wifi: false,
            parking: false,
            breakfast: false,
            pets: false,
        },
        location: {
            address: '',
            city: '',
            zip: '',
            country: '',
            continent: '',
        },
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.startsWith('media')) {
            const parts = name.split('.');
            const index = parseInt(parts[1], 10);
            const field = parts[2];

            setFormData((prev) => {
                const newMedia = [...prev.media];
                newMedia[index] = {
                    ...newMedia[index],
                    [field]: value,
                };
                return { ...prev, media: newMedia };
            });
        } else if (name.includes('.')) {
            // nested object (meta, location)
            const [parent, child] = name.split('.');
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === 'checkbox' ? checked : value,
                },
            }));
        } else {
            // top-level fields
            let newValue = value;

            // Convert to number where appropriate
            if (name === 'price') {
                const num = parseFloat(newValue);
                newValue = isNaN(num) ? 0 : Math.min(num, 10000);
            }
            if (name === 'maxGuests') {
                newValue = Math.min(parseInt(newValue, 10) || 0, 100);
            }
            if (name === 'rating') {
                const num = parseFloat(newValue);
                newValue = isNaN(num) ? 0 : Math.min(num, 5);
            }

            setFormData((prev) => ({
                ...prev,
                [name]: newValue,
            }));
        }
    };

    const handleMetaChange = (key, checked) => {
        setFormData((prev) => ({
            ...prev,
            meta: { ...prev.meta, [key]: checked },
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await apiClient.createVenue(formData);
            setSnackbarMessage('Venue created successfully!');
            setSnackbarOpen(true);
            onClose();
        } catch (error) {
            console.error('Error creating venue:', error);
            setSnackbarMessage('Failed to create venue.');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Create a New Venue</DialogTitle>
            <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '80vh', overflowY: 'auto' }}>

                {/* Name */}
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />

                {/* Description */}
                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    minRows={3}
                    fullWidth
                />

                {/* Price */}
                <TextField
                    label="Price"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={(e) => handleChange({ target: { name: 'price', value: e.target.value, type: 'number' } })}
                    inputProps={{ max: 10000 }}
                    fullWidth
                />

                {/* Max Guests */}
                <TextField
                    label="Max Guests (max 100)"
                    type="number"
                    name="maxGuests"
                    value={formData.maxGuests}
                    onChange={(e) => handleChange({ target: { name: 'maxGuests', value: e.target.value, type: 'number' } })}
                    inputProps={{ min: 0, max: 100 }}
                    fullWidth
                />

                {/* Rating */}
                <TextField
                    label="Rating"
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={(e) => handleChange({ target: { name: 'rating', value: e.target.value, type: 'number' } })}
                    inputProps={{ max: 5, min: 0 }}
                    fullWidth
                />

                {/* Meta options */}
                <Typography variant="h6">Features</Typography>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {Object.keys(formData.meta).map((key) => (
                        <FormControlLabel
                            key={key}
                            control={
                                <Checkbox
                                    checked={formData.meta[key]}
                                    onChange={(e) => handleMetaChange(key, e.target.checked)}
                                    name={`meta.${key}`}
                                />
                            }
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                        />
                    ))}
                </div>

                {/* Location Fields */}
                <Typography variant="h6">Location</Typography>
                {Object.keys(formData.location).map((key) => (
                    <TextField
                        key={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        name={`location.${key}`}
                        value={formData.location[key]}
                        onChange={handleChange}
                        fullWidth
                    />
                ))}

                {/* Media URLs */}
                <Typography variant="h6">Media</Typography>
                {formData.media.map((mediaItem, index) => (
                    <React.Fragment key={index}>
                        <TextField
                            label="Image URL"
                            name={`media.${index}.url`}
                            value={mediaItem.url}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Alt Text"
                            name={`media.${index}.alt`}
                            value={mediaItem.alt}
                            onChange={handleChange}
                            fullWidth
                        />
                    </React.Fragment>
                ))}

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                </Box>
            </DialogContent>

            {/* Snackbar for feedback */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                message={snackbarMessage}
                onClose={() => setSnackbarOpen(false)}
            />
        </Dialog>
    );
}

export default CreateVenue;