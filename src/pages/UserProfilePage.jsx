import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import AvatarEditModal from '../components/AvatarEdit'; // make sure this is the correct path
import { Box, Typography, Avatar } from '@mui/material';

function ProfilePage() {
    const user = useSelector((state) => state.user.data);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(user?.avatar?.url);

    if (!user) {
        return <Typography variant="body1" align="center" sx={{ mt: 8 }}>No user data. Please log in.</Typography>;
    }

    const { name, email, bio, avatar, banner, accessToken, accountType } = user;

    const handleAvatarClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleAvatarSave = (newUrl) => {
        // Replace this with your API call to upload and update the avatar
        // For demo, just set the new URL locally
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
                    src={avatar?.url}
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
                <Typography variant="body1">
                    <strong>Account Type:</strong> {accountType ? 'Venue Manager' : 'Customer'}
                </Typography>
            </Box>

            {/* Avatar Edit Modal */}
            <AvatarEditModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                avatarUrl={avatar?.url}
                onSave={handleAvatarSave}
            />
        </>
    );
}

export default ProfilePage;