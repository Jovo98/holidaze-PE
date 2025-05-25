import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import AvatarEditModal from '../components/AvatarEdit';
import EditVenues from '../components/EditVenues';
import ViewBookings from "../components/ViewBookings";
import CreateVenue from '../components/CreateVenue';
import { Box, Typography, Avatar, CircularProgress, Button } from '@mui/material';
import apiClient from '../api/api';
import EditIcon from '@mui/icons-material/Edit';

function ProfilePage() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');
    const [canCreateVenue, setCanCreateVenue] = useState(false);
    const [isVenueModalOpen, setIsVenueModalOpen] = useState(false);
    const [openEditVenues, setOpenEditVenues] = useState(false);
    const username = useSelector((state) => state.user.data?.name);
    const [openBookings, setOpenBookings] = useState(false);

    const handleOpenCreateVenue = () => {
        setIsVenueModalOpen(true);
    };

    const handleCloseCreateVenue = () => {
        setIsVenueModalOpen(false);
    };
    useEffect(() => {
        if (user && user.data) {
            setAvatarUrl(user.data.avatar?.url);
            setBannerUrl(user.data.banner?.url);
        } else {
            const storedUserStr = localStorage.getItem('user');
            if (storedUserStr) {
                try {
                    const storedUser = JSON.parse(storedUserStr);
                    storedUser.venueManager = storedUser.venueManager === 'true';

                    dispatch({ type: 'user/setUser', payload: storedUser });
                    setAvatarUrl(storedUser.avatar?.url);
                    setBannerUrl(storedUser.banner?.url);
                } catch (err) {
                }
            }
        }
        if (user && user.data && user.data.accountType !== undefined) {
            setCanCreateVenue(user.data.accountType === 'true');
        } else {
            const storedUserStr = localStorage.getItem('user');
            if (storedUserStr) {
                try {
                    const storedUser = JSON.parse(storedUserStr);
                    if (storedUser.accountType !== undefined) {
                        setCanCreateVenue(storedUser.accountType === 'true');
                    }
                } catch (err) {
                }
            }
        }
    }, [dispatch, user]);

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

    const { name, email, bio} = user.data;

    const handleAvatarClick = () => {
        setIsModalOpen(true);
    };

    const fetchAndSyncProfile = async () => {
        try {
            const response = await apiClient.getProfile(user.data.name);
            const profileData = response.data.data;

            const storedUserStr = localStorage.getItem('user');
            let storedUser = {};

            if (storedUserStr) {
                try {
                    storedUser = JSON.parse(storedUserStr);
                } catch (err) {
                    console.error('Error parsing stored user:', err);
                }
            }

            const accessToken = storedUser.accessToken;

            localStorage.setItem(
                'user',
                JSON.stringify({
                    ...profileData,
                    accessToken,
                    accountType: storedUser.accountType || 'false',
                    venueManager: profileData.venueManager ? 'true' : 'false',
                })
            );

            dispatch({
                type: 'user/setUser',
                payload: { ...profileData, venueManager: profileData.venueManager, accessToken },
            });

            setAvatarUrl(profileData.avatar?.url);
            setBannerUrl(profileData.banner?.url);
        } catch (err) {
            console.error('Failed to fetch profile:', err);
        }
    };

    const handleSave = async ({ avatarUrl: newAvatar, bannerUrl: newBanner }) => {
        const data = {};
        if (newAvatar && newAvatar.trim() !== '') {
            data.avatar = { url: newAvatar, alt: 'Avatar' };
        }
        if (newBanner && newBanner.trim() !== '') {
            data.banner = { url: newBanner, alt: 'Banner' };
        }

        if (Object.keys(data).length === 0) {
            alert('Please provide at least one image URL to update.');
            return;
        }

        try {
            await apiClient.updateProfile(user.data.name, data);
            await fetchAndSyncProfile();
        } catch (err) {
            console.error('Error updating profile:', err);
        }

        setIsModalOpen(false);
    };


    return (
        <>
            <Header />
            <Box sx={{ maxWidth: '100%', margin: '50px auto', padding: '20px', textAlign: 'center' }}>
                {user.data.banner?.url && (
                    <Box
                        component="img"
                        src={user.data.banner.url}
                        alt={user.data.banner?.alt || 'Banner'}
                        sx={{
                            width: '100%',
                            maxHeight: '200px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                        }}
                    />
                )}

                <Box
                    sx={{
                        position: 'relative',
                        display: 'inline-block',
                        ':hover .edit-icon': { opacity: 1 },
                    }}
                >
                    <Avatar
                        src={avatarUrl}
                        alt={user.data.avatar?.alt || 'Avatar'}
                        sx={{
                            width: 200,
                            height: 200,
                            marginTop: '-75px',
                            border: '4px solid white',
                            marginX: 'auto',
                            cursor: 'pointer',
                        }}
                        onClick={handleAvatarClick}
                    />
                    <EditIcon
                        className="edit-icon"
                        sx={{
                            position: 'absolute',
                            top: '15%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'rgba(255,255,255,0.7)',
                            borderRadius: '50%',
                            padding: '4px',
                            fontSize: 30,
                            opacity: 0,
                            cursor: 'pointer',
                            transition: 'opacity 0.3s',
                        }}
                        onClick={handleAvatarClick}
                    />
                </Box>

                <Typography variant="h4" mt={2}>{name}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {email}</Typography>
                <Typography variant="body1"><strong>Bio:</strong> {bio || 'No bio provided.'}</Typography>
                <Box sx={{ display:'flex', gap: 2, justifyContent:'center', mb: 2,}}>
                {canCreateVenue && (
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                        onClick={handleOpenCreateVenue}
                    >
                        Create Venue
                    </Button>


                )}
                <CreateVenue open={isVenueModalOpen} onClose={handleCloseCreateVenue} />
                {canCreateVenue && (
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: 2 }}
                        onClick={() => setOpenEditVenues(true)}>
                        Edit venues
                    </Button>
                )}

                <EditVenues
                    open={openEditVenues}
                    handleClose={() => setOpenEditVenues(false)}
                    username={username}
                />
                </Box>

                <Box>
                {/* other profile content */}
                <Button variant="contained" onClick={() => setOpenBookings(true)}>
                    View Upcoming Bookings
                </Button>
                <ViewBookings
                    open={openBookings}
                    handleClose={() => setOpenBookings(false)}
                    username={username}
                />
                </Box>
            </Box>

            <AvatarEditModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                avatarUrl={avatarUrl}
                bannerUrl={bannerUrl}
                onSave={handleSave}
            />
        </>
    );
}

export default ProfilePage;
