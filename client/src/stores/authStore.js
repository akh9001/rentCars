// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/Admin/auth/authSlice';
import carReducer from '../slices/Admin/Cars/carSlice'
import listCarsReducer from '../slices/Admin/Cars/listCarSlice'
import orderReducer from '../slices/Order/listOrderSlice'

const authStore = configureStore({
	reducer: {
		auth: authReducer,
		car: carReducer,
		listCars: listCarsReducer,
		orders: orderReducer,
		// Add other reducers here if needed
	},
});

export default authStore;