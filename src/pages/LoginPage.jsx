import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {TextField, Button, Box, Typography, Switch, FormControlLabel, Link} from '@mui/material';
import api from '../api/api';
import { setUser } from '../store/userSlice';
import Header from '../components/Header';

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isVenueManager, setIsVenueManager] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.login({ email, password, venueManager: isVenueManager });
            const userData = response.data.data;

            const accountTypeBool = isVenueManager;

            dispatch(setUser({
                name: userData.name,
                email: userData.email,
                bio: userData.bio,
                avatar: userData.avatar,
                banner: userData.banner,
                accessToken: userData.accessToken,
                accountType: accountTypeBool,
            }));

            localStorage.setItem('user', JSON.stringify({
                name: userData.name,
                email: userData.email,
                bio: userData.bio,
                avatar: userData.avatar,
                banner: userData.banner,
                accessToken: userData.accessToken,
                accountType: accountTypeBool ? 'true' : 'false',
            }));

            navigate('/profile');
        } catch (err) {
            console.error(err);
            setError('Login failed. Please check your credentials.');
        }
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
                    backgroundColor: '#f0f0f0',
                    padding: 4,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Log In
                </Typography>
                {error && (
                    <Typography color="error" gutterBottom>
                        {error}
                    </Typography>
                )}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: '100%',
                        maxWidth: 400,
                        padding: 2,
                        backgroundColor: 'white',
                        borderRadius: 2,
                    }}
                >
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={isVenueManager}
                                onChange={(e) => setIsVenueManager(e.target.checked)}
                                color="primary"
                            />
                        }
                        label={isVenueManager ? 'Venue Manager' : 'Customer'}
                        sx={{ marginLeft: 0 }}
                    />

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Log In
                    </Button>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection:'column'}}>
                        <Typography>
                            Do not have an account? <Link href="./register"> Register here.</Link>
                        </Typography>

                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default LoginPage;
