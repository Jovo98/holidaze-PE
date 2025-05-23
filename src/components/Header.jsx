import React from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../store/userSlice';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch(clearUser());
        navigate('/');
    };

    // Check accountType as boolean
    const isVenueManager = user?.accountType === true;

    // Use this for labels
    const accountTypeLabel = isVenueManager ? 'Venue Manager' : 'Customer';

    return (
        <AppBar position="fixed" sx={{ width: '100%', top: 0, zIndex: 1200 }} >
            <Toolbar sx={{ minHeight: 80 }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Button color="inherit" href="/">
                        Holidaze
                    </Button>
                </Typography>

                {user?.data ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {/* User info */}
                        <Box sx={{ display: 'flex', flexDirection:'column',alignItems: 'center' }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                {user.data.name}
                            </Typography>
                            {/* Account type label */}
                            <Typography variant="caption" color="textSecondary">
                                {accountTypeLabel}
                            </Typography>
                        </Box>
                        {/* Avatar */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {user.data.avatar?.url && (
                                <Avatar
                                    src={user.data.avatar.url}
                                    alt={user.data.avatar.alt || 'Profile'}
                                    sx={{
                                        width: 50, // bigger size
                                        height: 50,
                                        cursor: 'pointer',
                                        border: '2px solid white', // small white outline
                                    }}
                                    onClick={() => (window.location.href = '/profile')}
                                />
                            )}
                        </Box>
                        {/* Logout */}
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Button color="inherit" href="/login">Login</Button>
                        <Button color="inherit" href="/register">Register</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;