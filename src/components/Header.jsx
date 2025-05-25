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

    const accountType = user.accountType;

    return (
        <AppBar position="fixed" sx={{ width: '100%', top: 0, zIndex: 1200 }} >
            <Toolbar sx={{ minHeight: 80 }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Button
                        href="/"
                        color="inherit"
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            backgroundColor: 'transparent',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        Holidaze
                    </Button>
                </Typography>

                {user?.data ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex', flexDirection:'column',alignItems: 'center' }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                {user.data.name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                {accountType ? 'Venue Manager' : 'Customer'}
                            </Typography>
                        </Box>
                        {/* Avatar */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {user.data.avatar?.url && (
                                <Avatar
                                    src={user.data.avatar.url}
                                    alt={user.data.avatar.alt || 'Profile'}
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        cursor: 'pointer',
                                        border: '2px solid white',
                                    }}
                                    onClick={() => navigate('/profile')}
                                />
                            )}
                        </Box>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Button variant="body1" color="inherit" href="/register">Register</Button>
                        <Typography>or</Typography>
                        <Button variant="body1" color="inherit" href="/login">Login</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;
