import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null,
    token: null,
    accountType: null,
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
            state.accountType = null;
        },
        updateAccountType(state, action) {
            state.accountType = action.payload;
        },
    },
});

export const { setUser, clearUser, updateAccountType } = userSlice.actions;
export default userSlice.reducer;
