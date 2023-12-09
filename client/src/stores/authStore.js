// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/Admin/auth/authSlice';
import { user } from "../redux/reducers/user";
import carReducer from '../slices/Admin/Cars/carSlice'
import cartSlice from '../slices/cartSlice'
import listCarsReducer from '../slices/Admin/Cars/listCarSlice'

const authStore = configureStore({
	reducer: {
		user: user,
		cart:cartSlice,
		auth: authReducer,
		car: carReducer,
		listCars: listCarsReducer,
	},
});

export default authStore;