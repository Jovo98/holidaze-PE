import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import apiClient from '../api/api';
import Header from '../components/Header';
import BookingForm from "../components/BookingForm";
import {
    Container,
    Typography,
    CircularProgress,
    IconButton,
    Card,
    CardMedia,
    CardContent,
    Stack,
    Box,
    Divider
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function VenueDetailPage() {
    const { id } = useParams();
    const [venue, setVenue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        apiClient.getVenueDetails(id)
            .then((response) => {
                if (response.data && response.data.data) {
                    setVenue(response.data.data);
                    setCurrentImageIndex(0);
                } else {
                    throw new Error('Invalid data format');
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handlePrevImage = () => {
        if (venue.media.length > 0) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? venue.media.length - 1 : prevIndex - 1
            );
        }
    };

    const handleNextImage = () => {
        if (venue.media.length > 0) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === venue.media.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    if (loading)
        return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 8 }} />;
    if (error)
        return <Typography color="error" align="center" sx={{ mt: 8 }}>{`Error: ${error}`}</Typography>;

    return (
        <>
            <Header />
            <Container maxWidth="lg" sx={{ pt: 12, pb: 4 }}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                    {venue.media && venue.media.length > 0 && (
                        <Box sx={{ position: 'relative' }}>
                            <Box sx={{ position: 'relative' }}>
                                <IconButton
                                    onClick={handlePrevImage}
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: 10,
                                        transform: 'translateY(-50%)',
                                        zIndex: 1,
                                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    }}
                                    aria-label="Previous Image"
                                >
                                    <ArrowBackIos />
                                </IconButton>
                                <CardMedia
                                    component="img"
                                    image={venue.media[currentImageIndex].url}
                                    alt={venue.media[currentImageIndex].alt}
                                    sx={{
                                        width: '100%',
                                        height: 500,
                                        objectFit: 'cover',
                                        borderTopLeftRadius: 8,
                                        borderTopRightRadius: 8,
                                    }}
                                />
                                <IconButton
                                    onClick={handleNextImage}
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        right: 10,
                                        transform: 'translateY(-50%)',
                                        zIndex: 1,
                                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    }}
                                    aria-label="Next Image"
                                >
                                    <ArrowForwardIos />
                                </IconButton>
                                {venue.media.length > 1 && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 8,
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            display: 'flex',
                                            gap: 1,
                                            px: 1,
                                            borderRadius: 4,
                                        }}
                                    >
                                        {venue.media.map((_, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: '50%',
                                                    backgroundColor:
                                                        index === currentImageIndex
                                                            ? 'primary.main'
                                                            : 'grey.400',
                                                    cursor: 'pointer',
                                                    transition: 'background-color 0.3s',
                                                }}
                                                onClick={() => setCurrentImageIndex(index)}
                                            />
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    )}
                    <CardContent>

                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {venue.name}
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Entire venue for rent in {venue.location.city}, {venue.location.country}
                        </Typography>
                        <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                        {/* Venue details */}
                        <Box spacing={1} sx={{ display: 'flex', flexDirection: 'column', mb: 4, gap: 2}}>
                            <Typography
                                variant="body1"
                                color="text.primary"
                                sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 1 }}
                            >
                                {venue.price} nok
                                <Typography sx={{ ml: 1 }} component="span" color="textDisabled">
                                    /night
                                </Typography>
                            </Typography>
                            <Typography>
                                <GroupIcon sx={{ verticalAlign: 'top', mr: 0.2 }} />
                                {venue.maxGuests}
                            </Typography>
                            <Typography>
                                <StarIcon sx={{ verticalAlign: 'top', mr: 0.2 }} />
                                {venue.rating} / 5
                            </Typography>
                            <Typography>
                                <LocationOnIcon sx={{ verticalAlign: 'top', mr: 0.2 }} />
                                {venue.location.address}
                            </Typography>
                        </Box>
                        <BookingForm />
                        </Box>

                        <Divider sx={{mb: 2}} >
                        </Divider>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Amenities
                        </Typography>
                        <Stack spacing={1} sx={{ mb: 4 }}>
                            <Typography>
                                <strong>WiFi: </strong> {venue.meta.wifi ? 'Available' : 'Not Available'}
                            </Typography>
                            <Typography>
                                <strong>Parking: </strong> {venue.meta.parking ? 'Available' : 'Not Available'}
                            </Typography>
                            <Typography>
                                <strong>Breakfast: </strong> {venue.meta.breakfast ? 'Included' : 'Not Included'}
                            </Typography>
                            <Typography>
                                <strong>Pets Allowed: </strong> {venue.meta.pets ? 'Yes' : 'No'}
                            </Typography>

                        </Stack>
                        <Divider sx={{mb: 2}} >
                        </Divider>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                About this venue
                            </Typography>
                            {venue.description && (
                                <Typography variant="body2" paragraph sx={{ mb: 3 }}>
                                    {venue.description}
                                </Typography>
                            )}

                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}

export default VenueDetailPage;
