import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/userSlice.js';
import venueReducer from '../store/venueSlice.js';

const store = configureStore({
    reducer: {
        user: userReducer,
        venue: venueReducer,
    },
});

export default store
