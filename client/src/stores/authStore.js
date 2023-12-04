// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/Admin/auth/authSlice';
import carReducer from '../slices/Admin/Cars/carSlice'
import listCarsReducer from '../slices/Admin/Cars/listCarSlice'

const authStore = configureStore({
	reducer: {
		auth: authReducer,
		car: carReducer,
		listCars: listCarsReducer,
		// Add other reducers here if needed
	},
});

export default authStore;