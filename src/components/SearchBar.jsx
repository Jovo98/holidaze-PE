import React from 'react';
import { TextField, MenuItem, Box, Typography } from '@mui/material';

function SearchBar({ filters, setFilters }) {
    const handleChange = (field) => (e) => {
        setFilters({ ...filters, [field]: e.target.value });
    };

    return (
        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>

            {/* Location filter */}
            <TextField
                label="Location"
                variant="outlined"
                value={filters.location}
                onChange={handleChange('location')}
                sx={{ minWidth: 150 }}
            />

            {/* Check-in date */}
            <TextField
                label="Check-in Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={filters.checkIn}
                onChange={handleChange('checkIn')}
                sx={{ minWidth: 150 }}
            />

            {/* Check-out date */}
            <TextField
                label="Check-out Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={filters.checkOut}
                onChange={handleChange('checkOut')}
                sx={{ minWidth: 150 }}
            />

            {/* Guests amount */}
            <TextField
                label="Guests"
                type="number"
                inputProps={{ min: 1 }}
                value={filters.guests}
                onChange={handleChange('guests')}
                sx={{ minWidth: 100 }}
            />
        </Box>
    );
}

export default SearchBar;