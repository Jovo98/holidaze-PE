import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import apiClient from '../api/api';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';

function RegistrationPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isVenueManager, setIsVenueManager] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [message] = useState('');
    const [error] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };



    const handleRegister = () => {
        const payload = {
            ...formData,
            venueManager: isVenueManager,
        };
        Object.keys(payload).forEach((key) =>
            payload[key] === '' || payload[key] === undefined ? delete payload[key] : null
        );

        apiClient.register(payload)
            .then((response) => {
                const userData = response.data.data;
                const accountType = userData.venueManager ?? false;

                dispatch(setUser({
                    name: userData.name,
                    email: userData.email,
                    bio: userData.bio,
                    avatar: userData.avatar,
                    banner: userData.banner,
                    accessToken: userData.accessToken,
                    accountType,
                }));

                localStorage.setItem('user', JSON.stringify({
                    name: userData.name,
                    email: userData.email,
                    bio: userData.bio,
                    avatar: userData.avatar,
                    banner: userData.banner,
                    accessToken: userData.accessToken,
                    accountType,
                    })
                );
                navigate('/profile');
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
                    <Typography variant="h4" color="textPrimary" sx={{ marginTop: 2 }}>
                        {isVenueManager
                            ? 'Venue Manager'
                            : 'Customer '}
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
                <TextField
                    label="Name"
                    name="name"
                    variant="outlined"
                    required
                    value={formData.name}
                    onChange={handleChange}
                />

                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    variant="outlined"
                    required
                    value={formData.email}
                    onChange={handleChange}
                />

                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    variant="outlined"
                    required
                    value={formData.password}
                    onChange={handleChange}
                />
                <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }} type="submit">
                    Register
                </Button>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection:'column'}}>
                    <Typography>
                        Already have account? <Link href="./login"> Log in here.</Link>
                    </Typography>

                </Box>
            </Box>
        </Box>
        </>
    );
}

export default RegistrationPage;
