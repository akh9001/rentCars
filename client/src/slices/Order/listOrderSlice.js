import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'


// Get the token from localStorage
const token = localStorage.getItem('token');
// Set up Axios headers to include the token
const axiosConfig = {
	headers: {
		'Authorization': `Bearer ${token}`,
		'Content-Type': 'application/json',
	},
};

function createData(id, FirstName, LastName, city, price, status, orderDate) {
	return { id, FirstName, LastName, city, price, status, orderDate };
}
const HOST_URL = 'http://localhost:3001/orders/';

export const getOrders = createAsyncThunk(
	'orders/getOrders',
	async () => {
		const response = await axios.get(HOST_URL, axiosConfig);
		const data = await response.data;
		console.log("orders/getOrders data",response.data);
		return data;
	},
);

export const orderSlice = createSlice({
	name: 'orders',
	initialState: {
		orders: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: 
		(buildCreateSlice) => {
			buildCreateSlice
			.addCase(getOrders.fulfilled, (state, action) => {
				state.loading = false;
				state.orders = action.payload.data.map((item, index) => createData(item._id, item.first_name, item.last_name, item.city, item.totalPrice,item.status, item.orderDate));
				})
			.addCase(getOrders.pending, (state, action) => {
				state.loading = true;
				})
			.addCase(getOrders.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				})
		}
	});


export default orderSlice.reducer;