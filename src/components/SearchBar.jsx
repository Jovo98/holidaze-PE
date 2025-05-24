import React from 'react';
import { TextField, Box, Typography } from '@mui/material';

function SearchBar({ filters, setFilters }) {
    const handleChange = (field) => (e) => {
        setFilters({ ...filters, [field]: e.target.value });
    };

    const todayStr = new Date().toISOString().split('T')[0];

    return (
        <Box sx={{ mt: 12, display: 'flex', alignItems:'center', justifyContent: 'center', flexDirection:'column', p: 2 }}>
            <Box>
                <Typography variant='h4' sx={{ pb: 2 }}>Where are you traveling?</Typography>

            </Box>
            <Box sx={{ width: '100%', maxWidth: 900, display: 'flex', justifyContent: 'center' }}>
                {/* Single location search box */}
                <TextField
                    label="Location"
                    placeholder="City, Country, Address..."
                    value={filters.locationSearch}
                    onChange={handleChange('locationSearch')}
                    sx={{ minWidth: 150, m: 1 }}
                />
                {/* Date pickers and guests */}
                <TextField
                    label="Check-in Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={filters.checkIn || todayStr}
                    onChange={handleChange('checkIn')}
                    sx={{ minWidth: 150, m: 1 }}
                />
                <TextField
                    label="Check-out Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={filters.checkOut || todayStr}
                    onChange={handleChange('checkOut')}
                    sx={{ minWidth: 150, m: 1 }}
                />
                <TextField
                    label="Guests"
                    type="number"
                    inputProps={{ min: 1 }}
                    value={filters.guests || 1}
                    onChange={(e) => setFilters({ ...filters, guests: parseInt(e.target.value, 10) || 1 })}
                    sx={{ minWidth: 100, m: 1 }}
                />
            </Box>
        </Box>
    );
}

export default SearchBar;