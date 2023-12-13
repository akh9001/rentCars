import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// function createData({ user_name, first_name, last_name, email, image, role, created_at, updated_at }) {
// 	return { user_name, first_name, last_name, email, image, role, created_at, updated_at };
// }

const initialState = {
	customers: [],
	status: 'idle',
	error: null,
};

// Get the token from localStorage
const token = localStorage.getItem('token');
// Set up Axios headers to include the token
const axiosConfig = {
	headers: {
		'Authorization': `Bearer ${token}`,
		'Content-Type': 'application/json',
	},
};
const HOST_URL = 'http://localhost:3001/customers';

export const listCustomers = createAsyncThunk(
	"customers/getAllCusers",
	async (page) => {
		const response = await axios.get(`${HOST_URL}?page=${page}`, axiosConfig);
		const data = await response.data;
		return data;
	}
);

const customerSlice = createSlice({
	name: 'customers',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(listCustomers.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(listCustomers.fulfilled, (state, action) => {
				// debugger;
				state.status = 'succeeded';
				state.customers = action.payload;
			})
			.addCase(listCustomers.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default customerSlice.reducer;