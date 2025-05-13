import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    role: null,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.role = action.payload.role;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.role = null;
            state.token = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;