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
} from '@mui/material';
import axios from 'axios';
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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.startsWith('media')) {
            const parts = name.split('.');
            const index = parseInt(parts[1], 10);
            const field = parts[2];

            setFormData(prev => {
                const newMedia = [...prev.media];
                newMedia[index] = {
                    ...newMedia[index],
                    [field]: value,
                };
                return {
                    ...prev,
                    media: newMedia,
                };
            });
        } else if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === 'checkbox' ? checked : value,
                },
            }));
        } else {
            let newValue = value;
            if (name === 'price' || name === 'maxGuests') {
                newValue = parseFloat(value);
            }
            setFormData(prev => ({
                ...prev,
                [name]: newValue,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.createVenue(formData);
            console.log('Venue created:', response.data);
            onClose();
        } catch (error) {
            console.error('Error creating venue:', error);
        }
    };
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Create New Venue</DialogTitle>
            <DialogContent dividers>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <TextField
                        label="Venue Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        multiline
                        minRows={3}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Price"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Max Guests"
                        type="number"
                        name="maxGuests"
                        value={formData.maxGuests}
                        onChange={handleChange}
                        fullWidth
                    />

                    {/* Meta Checkboxes */}
                    <Typography variant="h6" sx={{ marginTop: 2 }}>Meta</Typography>
                    {Object.keys(formData.meta).map((key) => (
                        <FormControlLabel
                            key={key}
                            control={
                                <Checkbox
                                    checked={formData.meta[key]}
                                    onChange={handleChange}
                                    name={`meta.${key}`}
                                />
                            }
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                        />
                    ))}

                    {/* Location Fields */}
                    <Typography variant="h6" sx={{ marginTop: 2 }}>Location</Typography>
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
                    <Typography variant="h6" sx={{ marginTop: 2 }}>Media</Typography>
                    <TextField
                        label="Image URL"
                        name="media.0.url"
                        value={formData.media[0].url}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Image Alt Text"
                        name="media.0.alt"
                        value={formData.media[0].alt}
                        onChange={handleChange}
                        fullWidth
                    />

                    {/* Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button variant="contained" color="primary" type="submit">
                            Create Venue
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default CreateVenue;