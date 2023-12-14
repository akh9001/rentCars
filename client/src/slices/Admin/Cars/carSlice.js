// carSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
	// carData: {
	// 	vin: "",
	// 	name: "",
	// 	brand: "",
	// 	price: "",
	// 	specifications: {
	// 		"Fuel Type": "",
	// 		"Model Year": "",
	// 		"Vehicle Type": "",
	// 		"Gear Type": "",
	// 		"Engine Type": "",
	// 		"Luggage Capacity": "",
	// 		"Passenger Capacity": "",
	// 	},
	// 	images: [],
	// },
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
		'Content-Type': 'multipart/form-data',
	},
};
const HOST_URL = 'http://localhost:3001/cars/';
// console.log("process.env.HOST_URL",process.env.HOST_URL);
export const addCar = createAsyncThunk(
	'car/cars',
	async (carData) => {
		const response = await axios.post(HOST_URL, carData, axiosConfig);
		const data = await response.data;
		console.log("response data",response.data);
		console.log("carData",carData);
		return data;
	},
);

const carSlice = createSlice({
	name: 'car',
	initialState,
	reducers: {},
	extraReducers:
	 (builder) => {
		builder
		.addCase(addCar.fulfilled, (state, action) => {
			state.loading = false;
			state.error = null;
			// state.message = action.payload.message;
			state.data = action.payload;
		})
		.addCase(addCar.pending, (state, action) => {
			state.loading = true;
			state.error = null;
		})
		.addCase(addCar.rejected, (state, action) => {
			state.loading = false;
			if (action.error.message === "Request failed with status code 400")
				state.error = "The VIN already exists!";
			else if (action.error.message === "Request failed with status code 403")
				state.error = "Forbidden";
			else
				state.error = action.error.message;
		})
	}
});

// export const selectCarData = (state) => state.car.carData;

export default carSlice.reducer;
