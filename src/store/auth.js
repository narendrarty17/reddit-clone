import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    displayName: '',
    email: '',
    photoURL: '',
    emailVerified: false,
    phoneNumber: ''
}

const auth = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.photoURL = action.payload.photoURL;
            state.emailVerified = action.payload.emailVerified;
            state.phoneNumber = action.payload.phoneNumber;
        },
        logout(state) {
            // Clear state on logout
            return initialAuthState;
        }
    }
})

export const authActions = auth.actions;

export default auth.reducer;