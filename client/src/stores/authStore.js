// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';

const authStore = configureStore({
	reducer: {
		auth: authReducer
		// Add other reducers here if needed
	},
});

export default authStore;