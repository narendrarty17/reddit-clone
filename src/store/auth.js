import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    googleId: '',
    name: '',
    email: '',
    photoURL: ''
}

const auth = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.googleId = action.payload.googleId;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.photoURL = action.payload.photoURL;
        },
        logout(state) {
            // Clear state on logout
            return initialAuthState;
        }
    }
})

export const authActions = auth.actions;

export default auth.reducer;