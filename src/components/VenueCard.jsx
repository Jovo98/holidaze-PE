import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Box } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

function VenueCard({ venue }) {
    const { name, price, location, rating, maxGuests, media } = venue;

    const images = media && media.length > 0 ? media : [{ url: 'https://via.placeholder.com/300' }];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const showNavigation = images.length > 1;

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleDotClick = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <Card
            sx={{
                width: '100%',          // fill parent (e.g., grid cell)
                maxWidth: 350,          // fixed maximum width
                height: 400,            // fixed height or auto
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            {/* Image section */}
            <Box sx={{ position: 'relative', height: 200, flexShrink: 0 }}>
                <CardMedia
                    component="img"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    image={images[currentImageIndex].url}
                    alt={name}
                />

                {showNavigation && (
                    <>
                        {/* Left arrow */}
                        <IconButton
                            onClick={handlePrevImage}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: 8,
                                transform: 'translateY(-50%)',
                                backgroundColor: 'transparent',
                                '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' },
                                zIndex: 1,
                            }}
                        >
                            <ArrowBackIos />
                        </IconButton>
                        {/* Right arrow */}
                        <IconButton
                            onClick={handleNextImage}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                right: 8,
                                transform: 'translateY(-50%)',
                                backgroundColor: 'transparent',
                                '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' },
                                zIndex: 1,
                            }}
                        >
                            <ArrowForwardIos />
                        </IconButton>
                        {/* Dots inside image bottom center */}
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 8,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                display: 'flex',
                                gap: 1,
                                backgroundColor: 'rgba(0,0,0,0.3)',
                                padding: '4px 8px',
                                borderRadius: 4,
                            }}
                        >
                            {images.map((_, index) => (
                                <Box
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: '50%',
                                        backgroundColor: currentImageIndex === index ? 'primary.main' : 'grey.400',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s',
                                    }}
                                />
                            ))}
                        </Box>
                    </>
                )}
            </Box>

            {/* Info section */}
            <CardContent
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <div>
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
                </div>
            </CardContent>
        </Card>
    );
}

export default VenueCard;