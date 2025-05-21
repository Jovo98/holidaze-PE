import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import apiClient from '../api/api';
import Header from '../components/Header';
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

    if (loading) return <div>Loading venue details...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Header />
        <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
            <h1>{venue.name}</h1>
            {venue.description && <p>{venue.description}</p>}

            {venue.media && venue.media.length > 0 && (
                <img
                    src={venue.media[0].url}
                    alt={venue.media[0].alt}
                    style={{ width: '100%', height: 'auto', marginBottom: '20px' }}
                />
            )}

            <ul>
                <li><strong>Price:</strong> ${venue.price}</li>
                <li><strong>Max Guests:</strong> {venue.maxGuests}</li>
                <li><strong>Rating:</strong> {venue.rating} / 5</li>
                <li>
                    <strong>Location:</strong> {venue.location.address}, {venue.location.city}
                </li>
            </ul>
        </div>
        </>
    );
}

export default VenueDetailPage;