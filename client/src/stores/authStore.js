// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import carReducer from '../slices/carSlice'

const authStore = configureStore({
	reducer: {
		auth: authReducer,
		car: carReducer,
		// Add other reducers here if needed
	},
});

export default authStore;