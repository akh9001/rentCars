// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/Admin/auth/authSlice';
// import { user } from "../redux/reducers/user";
import carReducer from '../slices/Admin/Cars/carSlice'
import cartSlice from '../slices/cartSlice'
import listCarsReducer from '../slices/Admin/Cars/listCarSlice'
import orderReducer from '../slices/Order/listOrderSlice'
import authCustomerReducer from '../slices/Customer/loginSlice'
import registerReducer from '../slices/Customer/registerSlice'
import userReducer from '../slices/userSlice';

const store = configureStore({
	reducer: {
		// user: user,
		user: userReducer,
		cart:cartSlice,
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