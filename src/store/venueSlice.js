import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    venues: [],
};

const venueSlice = createSlice({
    name: 'venue',
    initialState,
    reducers: {
        setVenues(state, action) {
            state.venues = action.payload;
        },
    },
});

export const { setVenues } = venueSlice.actions;
export default venueSlice.reducer;
