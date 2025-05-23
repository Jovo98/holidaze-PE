import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import { Box, Typography, Avatar } from '@mui/material';

function ProfilePage() {
    const user = useSelector((state) => state.user.data);
    console.log('User data from redux:', user);

    if (!user) {
        return <Typography variant="body1" align="center">No user data. Please log in.</Typography>;
    }

    const { name, email, bio, avatar, banner } = user;

    return (
        <>
            <Header />
            <Box sx={{ maxWidth: '100%', margin: '50px auto', padding: '20px', textAlign: 'center' }}>
                {banner?.url && (
                    <Box
                        component="img"
                        src={banner.url}
                        alt={banner.alt || 'Banner'}
                        sx={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                        }}
                    />
                )}
                {avatar?.url && (
                    <Avatar
                        src={avatar.url}
                        alt={avatar.alt || 'Avatar'}
                        sx={{
                            width: 150,
                            height: 150,
                            marginTop: '-75px',
                            border: '4px solid white',
                            marginX: 'auto',
                        }}
                    />
                )}
                <Typography variant="h4">{name}</Typography>
                <Typography variant="body1">
                    <strong>Email:</strong> {email}
                </Typography>
                <Typography variant="body1">
                    <strong>Bio:</strong> {bio || 'No bio provided.'}
                </Typography>
            </Box>
        </>
    );
}

export default ProfilePage;