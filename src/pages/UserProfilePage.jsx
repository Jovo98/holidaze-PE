import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import AvatarEditModal from '../components/AvatarEdit';
import { Box, Typography, Avatar, CircularProgress } from '@mui/material';

function ProfilePage() {
    const user = useSelector((state) => state.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        console.log('ProfilePage useEffect - user:', user);
        if (user && user.data && user.data.avatar) {
            setAvatarUrl(user.data.avatar.url);
        }
    }, [user]);

    if (!user || !user.data) {
        return (
            <>
                <Header />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <CircularProgress />
                </Box>
            </>
        );
    }

    const { name, email, bio, avatar, banner } = user.data;
    const accountType = user.accountType;

    const handleAvatarClick = () => {
        setIsModalOpen(true);
    };

    const handleAvatarSave = (newUrl) => {
        setAvatarUrl(newUrl);
        // You should also dispatch an update to your Redux store here
    };

    return (
        <>
            <Header />

            {/* Main profile container */}
            <Box sx={{ maxWidth: '100%', margin: '50px auto', padding: '20px', textAlign: 'center' }}>
                {/* Banner Image */}
                {banner?.url && (
                    <Box
                        component="img"
                        src={banner.url}
                        alt={banner.alt || 'Banner'}
                        sx={{
                            width: '100%',
                            maxHeight: '200px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                        }}
                    />
                )}

                {/* Avatar image that opens modal on click */}
                <Avatar
                    src={avatarUrl}
                    alt={avatar?.alt || 'Avatar'}
                    sx={{
                        width: 150,
                        height: 150,
                        marginTop: '-75px',
                        border: '4px solid white',
                        marginX: 'auto',
                        cursor: 'pointer',
                    }}
                    onClick={handleAvatarClick}
                />

                {/* User Info */}
                <Typography variant="h4" mt={2}>{name}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {email}</Typography>
                <Typography variant="body1"><strong>Bio:</strong> {bio || 'No bio provided.'}</Typography>
                <Typography variant="body1"><strong>Account Type:</strong> {accountType ? 'Venue Manager' : 'Customer'}</Typography>
            </Box>

            {/* Avatar Edit Modal */}
            <AvatarEditModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                avatarUrl={avatarUrl}
                onSave={handleAvatarSave}
            />
        </>
    );
}

export default ProfilePage;