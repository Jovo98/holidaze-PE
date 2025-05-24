import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

function VenueCard({ venue }) {
    const { id, name, price, location, rating, maxGuests, media } = venue;

    const imageUrl = media && media.length > 0 ? media[0].url : 'https://via.placeholder.com/300';

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/venues/${id}`);
    };

    return (
        <Card
            sx={{
                width: '100%',
                maxWidth: 350,

                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                cursor: 'pointer',

            }}
            onClick={handleCardClick}
        >
            {/* Image section */}
            <Box sx={{ height: 200 }}>
                <CardMedia
                    component="img"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    image={imageUrl}
                    alt={name}
                />
            </Box>

            {/* Info section */}
            <CardContent
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography gutterBottom variant="h6" component="div" noWrap>
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: ${price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Location: {location.country}, {location.city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Rating: {rating} / 5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Max Guests: {maxGuests}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default VenueCard;