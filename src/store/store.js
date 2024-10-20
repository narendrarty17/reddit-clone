import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth';

// Load presisted data from localstorage
const localState = () => {
    try {
        const serializedState = localStorage.getItem('authState');
        if (serializedState === null) {
            return undefined;
        }
        return { auth: JSON.parse(serializedState) }; // Return persisted state
    } catch (error) {
        console.error('Error occured while loading auth state', error);
    }
}

const preloadedState = localState();


const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState
});

export default store;