// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/Admin/auth/authSlice';
import carReducer from '../slices/Admin/Cars/carSlice'
import listCarsReducer from '../slices/Admin/Cars/listCarSlice'
import orderReducer from '../slices/Order/listOrderSlice'
import authCustomerReducer from '../slices/Customer/loginSlice'
import registerReducer from '../slices/Customer/registerSlice'

const store = configureStore({
	reducer: {
		auth: authReducer,
		car: carReducer,
		listCars: listCarsReducer,
		orders: orderReducer,
		authCustomer: authCustomerReducer,
		register: registerReducer,
		// Add other reducers here if needed
	},
});

export default store;