// src/api/api.jsx
import axios from 'axios';

const apiKey = process.env.REACT_APP_NOROFF_API_KEY; // your API key from env

const api = axios.create({
    baseURL: 'https://v2.api.noroff.dev/holidaze',
});

// Add request interceptor to attach headers dynamically
api.interceptors.request.use(
    (config) => {
        // Fetch token and add as Bearer if needed
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // Always add your custom 'X-Noroff-API-KEY' header
        if (apiKey) {
            config.headers['X-Noroff-API-KEY'] = apiKey;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Export your API functions
const getVenues = () => api.get('/venues');

// Correct interpolation for dynamic ID
const getVenueDetails = (id) => api.get(`/venues/${id}`);
const getBookings = () => api.get('/bookings');
const login = () => api.post('/auth/login');

const apiClient = {
    getVenues,
    getBookings,
    login,
    getVenueDetails,
};

export default apiClient;