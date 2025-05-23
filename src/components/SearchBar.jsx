import React from 'react';
import { TextField, Box, Typography } from '@mui/material';

function SearchBar({ filters, setFilters }) {
    const handleChange = (field) => (e) => {
        setFilters({ ...filters, [field]: e.target.value });
    };

    const todayStr = new Date().toISOString().split('T')[0];

    return (
        <Box sx={{ mt: 10, display: 'flex', alignItems:'center' , justifyContent: 'center', flexDirection:'column', p: 2 }}>
            <Typography variant='h4' sx={{pb: 2,}}>
                Where are you traveling?
            </Typography>
            <Box sx={{ width: '100%', maxWidth: 900, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', }}>
                {/* Location filter */}
                <TextField
                    label="Location"
                    value={filters.location || ''}
                    onChange={handleChange('location')}
                    sx={{ minWidth: 150 }}
                />

                {/* Check-in date */}
                <TextField
                    label="Check-in Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={filters.checkIn || todayStr}
                    onChange={handleChange('checkIn')}
                    sx={{ minWidth: 150 }}
                />

                {/* Check-out date */}
                <TextField
                    label="Check-out Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={filters.checkOut || todayStr}
                    onChange={handleChange('checkOut')}
                    sx={{ minWidth: 150 }}
                />

                {/* Guests */}
                <TextField
                    label="Guests"
                    type="number"
                    inputProps={{ min: 1 }}
                    value={filters.guests}
                    onChange={handleChange('guests')}
                    sx={{ minWidth: 100 }}
                />
            </Box>
        </Box>
    );
}

export default SearchBar;
