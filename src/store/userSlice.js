import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null,
    token: null,
    accountType: null,  // new field
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.data = {
                name: action.payload.name,
                email: action.payload.email,
                bio: action.payload.bio,
                avatar: action.payload.avatar,
                banner: action.payload.banner,
            };
            state.token = action.payload.accessToken;
            state.accountType = action.payload.accountType;
        },
        clearUser(state) {
            state.data = null;
            state.token = null;
            state.accountType = null; // reset account type
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;