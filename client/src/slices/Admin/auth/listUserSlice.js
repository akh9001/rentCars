import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

function createData(id, name, vin, brand, discount_price, price) {
	return {
		id,
		name,
		vin,
		brand,
		discount_price,
		price,
	};
}

const initialState = {
	rows: [],
	cars: [],
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
const HOST_URL = 'http://localhost:3001/users';

export const listUsers = createAsyncThunk(
	"cars/getAllUsers",
	async (page) => {
		const response = await axios.get(`${HOST_URL}?page=${page}`, axiosConfig);
		const data = await response.data;
		console.log("response data", response.data);
		return data;
	}
);

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(listUsers.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(listUsers.fulfilled, (state, action) => {
				// debugger;
				state.status = 'succeeded';
				state.cars = action.payload.data;
			})
			.addCase(listUsers.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default usersSlice.reducer;