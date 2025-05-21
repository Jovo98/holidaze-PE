import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import apiClient from '../api/api'; // Adjust import path
import Header from '../components/Header';

function RegistrationPage() {
    const [isVenueManager, setIsVenueManager] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = () => {
        const payload = {
            ...formData,
            venueManager: isVenueManager,
        };
        // Remove empty optional fields
        Object.keys(payload).forEach((key) =>
            payload[key] === '' || payload[key] === undefined ? delete payload[key] : null
        );

        apiClient.register(payload)
            .then(() => {
                setMessage('Registration successful!');
                setError('');
            })
            .catch((err) => {
                const errors = err.response?.data?.errors;
                if (errors && errors.some(e => e.message.includes('Profile already exists'))) {
                    setError('Profile already exists');
                } else {
                    setError('Registration failed. Please try again.');
                }
            });
    };

    return (
        <>
            <Header />

        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
                padding: 4,
            }}
        >





            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%',
                    maxWidth: 400,
                    padding: 2,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 3,
                }}
                onSubmit={(e) => { e.preventDefault(); handleRegister(); }}
            >
                <Typography
                    variant="h4" color="textPrimary"
                    sx={{ display: 'flex', justifyContent: 'center', }}>
                    Create Account
                </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{
                        marginTop: 1,
                    }} >
                        Select Account Type:
                    </Typography>
                <Box  sx={{ display: 'flex', justifyContent: 'center', }}>
                    <Button
                        variant={isVenueManager ? 'outlined' : 'contained'}
                        color={!isVenueManager ? 'primary' : 'secondary'}
                        onClick={() => setIsVenueManager(false)}
                        sx={{ width: 200 }}
                    >
                        Customer
                    </Button>
                    <Button
                        variant={isVenueManager ? 'contained' : 'outlined'}
                        color={isVenueManager ? 'secondary' : 'primary'}
                        onClick={() => setIsVenueManager(true)}
                        sx={{ width: 200 }}
                    >
                        Venue Manager
                    </Button>

                </Box>
                <Box>
                    {/* Conditional subtext */}
                    <Typography variant="h4" color="textPrimary" sx={{ marginTop: 2 }}>
                        {isVenueManager
                            ? 'Venue Manager Account'
                            : 'Customer Account '}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ marginTop: 1 }}>
                        {isVenueManager
                            ? 'Registering as a Venue Manager allows you to create and manage venues.'
                            : 'Registering as a Customer allows you to book venues and manage your bookings.'}
                    </Typography>
                </Box>
                {message && (
                    <Typography variant="body1" color="green" gutterBottom>
                        {message}
                    </Typography>
                )}
                {error && (
                    <Typography variant="body1" color="error" gutterBottom>
                        {error}
                    </Typography>
                )}
                {/* Name input */}
                <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    required
                    value={formData.name}
                    onChange={handleChange}
                />

                {/* Email input */}
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    variant="outlined"
                    required
                    value={formData.email}
                    onChange={handleChange}
                />

                {/* Password input */}
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    variant="outlined"
                    required
                    value={formData.password}
                    onChange={handleChange}
                />

                {/* Toggle buttons for role */}


                {/* Register button */}
                <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }} type="submit">
                    Register
                </Button>
            </Box>
        </Box>
        </>
    );
}

export default RegistrationPage;