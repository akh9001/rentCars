// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import carReducer from '../slices/carSlice'
import listCarsReducer from '../slices/listCarSlice'

const authStore = configureStore({
	reducer: {
		auth: authReducer,
		car: carReducer,
		listCars: listCarsReducer,
		// Add other reducers here if needed
	},
});

export default authStore;