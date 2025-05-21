import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    venues: [], // array to hold all venues
    // you can add more state if needed
};

const venueSlice = createSlice({
    name: 'venue',
    initialState,
    reducers: {
        setVenues(state, action) {
            state.venues = action.payload; // payload will be array of venues
        },
        // optionally add more reducers like clearVenues or addVenue
    },
});

export const { setVenues } = venueSlice.actions;
export default venueSlice.reducer;