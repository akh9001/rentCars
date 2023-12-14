import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

function createData(id, brand, name, category, gearType, passengerCapacity, fuelType, price, image) {
	return {
		id, brand, name, category, gearType, passengerCapacity, fuelType, price, image
	};
}

const initialState = {
	carsData: [],
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
const HOST_URL = 'http://localhost:3001/cars';
const SERVER_HOST = 'http://localhost:3001';

export const listCars = createAsyncThunk(
	"customers/cars/getAllCars",
	async (page) => {
		const response = await axios.get(`${HOST_URL}?page=${page}`, axiosConfig);
		const data = await response.data;
		console.log("response data", response.data);
		return data;
	}
);

const carsSlice = createSlice({
	name: 'customerListCars',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(listCars.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(listCars.fulfilled, (state, action) => {
				// debugger;
				state.status = 'succeeded';
				state.cars = action.payload.data;
				state.carsData = action.payload.data.map((item, index) => createData(item._id, item.brand, item.name, item.specifications["Vehicle Type"], item.specifications["Gear Type"], item.specifications["Passenger Capacity"], item.specifications["Fuel Type"], item.price, `${SERVER_HOST}/${item.images[0]}`))
			})
			.addCase(listCars.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default carsSlice.reducer;