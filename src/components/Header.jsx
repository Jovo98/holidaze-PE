import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/userSlice.jsx';

function Header() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Holidaze
                </Typography>
                {user.user ? (
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
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