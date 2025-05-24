import axios from 'axios';

const apiKey = process.env.REACT_APP_NOROFF_API_KEY;

const api = axios.create({
    baseURL: 'https://v2.api.noroff.dev',
});

api.interceptors.request.use(
    (config) => {
        const userString = localStorage.getItem('user');
        if (userString) {
            try {
                const user = JSON.parse(userString);
                const token = user.accessToken;
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
            } catch (err) {
                console.error('Error parsing user data:', err);
            }
        }

        if (apiKey) {
            config.headers['X-Noroff-API-Key'] = apiKey;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

const getVenues = () => api.get('/holidaze/venues');
const register = (userData) => api.post('/auth/register', userData);
const getVenueDetails = (id) => api.get(`/holidaze/venues/${id}`);
const getBookings = () => api.get('/holidaze/bookings');
const login = (credentials) => api.post('/auth/login', credentials);
const updateProfile = (username, data) => api.put(`holidaze/profiles/${username}`, data);
const createBooking = (data) => api.post('/holidaze/bookings', data);
const getProfile = (username) => api.get(`holidaze/profiles/${username}`);
const createVenue = (data) => api.post('/holidaze/venues', data)

const getUserVenues = (username) => api.get(`/holidaze/profiles/${username}/venues`);

const apiClient = {
    getVenues,
    getBookings,
    login,
    getVenueDetails,
    register,
    updateProfile,
    getProfile,
    createBooking,
    createVenue,
    getUserVenues,
};

export default apiClient;