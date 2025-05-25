import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function VenueCard({ venue }) {
    const { id, name, price, location, maxGuests, media } = venue;

    const imageUrl = media && media.length > 0 ? media[0].url : 'https://via.placeholder.com/300';

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/venues/${id}`);
    };

    return (
        <div className="venue-card-container">
            <Card
                className="venue-card"
                sx={{
                    width: '100%',
                    maxWidth: 350,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'transform 0.3s ease',
                }}
                onClick={handleCardClick}
            >
                <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                    <CardMedia
                        component="img"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                        }}
                        image={imageUrl}
                        alt={name}
                    />
                    <Box
                        className="guests-overlay"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            color: 'white',
                            fontWeight: 'bold',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                        }}
                    >
                        {maxGuests} Guests
                    </Box>
                </Box>

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
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                    >
                        <LocationOnIcon sx={{ fontSize: 20, mr: 0.5 }} />
                        {location.country}, {location.city}
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 1 }}
                    >
                        {price} nok
                        <Typography sx={{ ml: 1 }} component="span" color="textDisabled">
                            /night
                        </Typography>
                    </Typography>

                </CardContent>
            </Card>

            <style jsx>{`
              .venue-card-container:hover .guests-overlay {
                opacity: 1;
              }
              .venue-card {
                transition: transform 0.3s ease;
              }
              .venue-card:hover {
                transform: scale(1.02);
              }
            `}</style>
        </div>
    );
}

export default VenueCard;