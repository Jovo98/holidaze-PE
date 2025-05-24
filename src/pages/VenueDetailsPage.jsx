import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import apiClient from '../api/api';
import Header from '../components/Header';
import { Container, Typography, Box, CircularProgress } from '@mui/material';

function VenueDetailPage() {
    const { id } = useParams();
    const [venue, setVenue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        apiClient.getVenueDetails(id)
            .then((response) => {
                if (response.data && response.data.data) {
                    setVenue(response.data.data);
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

    if (loading)
        return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 8 }} />;
    if (error)
        return <Typography color="error" align="center" sx={{ mt: 8 }}>{`Error: ${error}`}</Typography>;

    return (
        <>
            <Header />
            <Container maxWidth="md" sx={{ pt: 12, pb: 4 }}>
                {/* Venue Name */}
                <Typography variant="h4" gutterBottom>
                    {venue.name}
                </Typography>
                {/* Description */}
                {venue.description && (
                    <Typography variant="body1" paragraph>
                        {venue.description}
                    </Typography>
                )}
                {/* Media Image */}
                {venue.media && venue.media.length > 0 && (
                    <Box mb={3} sx={{ width: '100%', textAlign: 'center' }}>
                        <img
                            src={venue.media[0].url}
                            alt={venue.media[0].alt}
                            style={{ width: '100%', height: 'auto', borderRadius: 8 }}
                        />
                    </Box>
                )}
                {/* Details List */}
                <Box component="ul" sx={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: 2 }}>
                    <li>
                        <strong>Price:</strong> ${venue.price}
                    </li>
                    <li>
                        <strong>Max Guests:</strong> {venue.maxGuests}
                    </li>
                    <li>
                        <strong>Rating:</strong> {venue.rating} / 5
                    </li>
                    <li>
                        <strong>Location:</strong> {venue.location.address}, {venue.location.city}
                    </li>
                </Box>
            </Container>
        </>
    );
}

export default VenueDetailPage;