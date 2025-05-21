// src/api/api.jsx
import axios from 'axios';

const apiKey = process.env.REACT_APP_NOROFF_API_KEY; // your API key from env

const api = axios.create({
    baseURL: 'https://v2.api.noroff.dev',
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
const getVenues = () => api.get('/holidaze/venues');
const register = (userData) => api.post('/auth/register', userData);
// Correct interpolation for dynamic ID
const getVenueDetails = (id) => api.get(`/holidaze/venues/${id}`);
const getBookings = () => api.get('/holidaze/bookings');
const login = (credentials) => api.post('/auth/login', credentials);

const apiClient = {
    getVenues,
    getBookings,
    login,
    getVenueDetails,
    register,
};

export default apiClient;