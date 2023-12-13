// carSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
	loading: false, // Add loading field to initial state
	data: null, // Add data field to initial state
	error: null, // Add error field to initial state
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
const HOST_URL = 'http://localhost:3001/users/';
// console.log("process.env.HOST_URL",process.env.HOST_URL);
export const addUser = createAsyncThunk(
	'users/addUser',
	async (userData) => {
		// console.log("carData", userData);
		const response = await axios.post(HOST_URL, userData, axiosConfig);
		const data = await response.data;
		return data;
	},
);

const carSlice = createSlice({
	name: 'addUser',
	initialState,
	reducers: {},
	extraReducers:
		(builder) => {
			builder
				.addCase(addUser.fulfilled, (state, action) => {
					state.loading = false;
					state.error = null;
					state.data = action.payload.message;
				})
				.addCase(addUser.pending, (state, action) => {
					state.loading = true;
					state.error = null;
				})
				.addCase(addUser.rejected, (state, action) => {
					state.loading = false;
					if (action.error.message === "Request failed with status code 409")
						state.error = "User already exists! Please try again with another email";
					else
						state.error = action.error.message;
				})
		}
});

// export const selectCarData = (state) => state.car.carData;
//Request failed with status code 409
export default carSlice.reducer;
