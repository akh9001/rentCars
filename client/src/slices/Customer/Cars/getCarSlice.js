import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const HOST_URL = 'http://localhost:3001/cars';
const SERVER_HOST = 'http://localhost:3001';

function createData(id, brand, name, category, gearType, passengerCapacity, fuelType, price, images) {
	// Ensure that images is an array
	const processedImages = Array.isArray(images)
		? images.map(image => `${SERVER_HOST}/${image}`)
		: [];

	return {
		id,
		brand,
		name,
		category,
		gearType,
		passengerCapacity,
		fuelType,
		price,
		images: processedImages,
	};
}

const initialState = {
	car: null,
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

export const carDetails = createAsyncThunk(
	"customers/cars/getCar",
	async (id) => {
		const response = await axios.get(`${HOST_URL}/${id}`, axiosConfig);
		const data = await response.data;
		console.log("response data Car Details", response.data);
		return data;
	}
);

const carDetailsSlice = createSlice({
	name: 'carDetails',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(carDetails.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(carDetails.fulfilled, (state, action) => {
				// debugger;
				const item = action.payload.data;
				state.status = 'succeeded';
				state.car = createData(item._id, item.brand, item.name, item.specifications["Vehicle Type"], item.specifications["Gear Type"], item.specifications["Passenger Capacity"], item.specifications["Fuel Type"], item.price, item.images)
			})
			.addCase(carDetails.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default carDetailsSlice.reducer;