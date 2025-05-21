import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import api from '../api/api';
import Header from "../components/Header";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            const response = await api.login();
            // Assuming response.data contains user info, token, role
            const { user, token, role } = response.data;
            localStorage.setItem('token', token);
            dispatch(login({ user, role, token }));
        } catch (err) {
            console.error('Login failed', err);
            // handle error
        }
    };

    return (
        <>
            <Header />
        <Container maxWidth="sm">

            <Typography variant="h4" gutterBottom>Login</Typography>
            <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                fullWidth
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
            </Button>
        </Container>
        </>
    );
}