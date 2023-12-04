import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// const initialState = {
// 	_id: null,
// 	vin: '',
// 	name: '',
// 	brand: '',
// 	available: false,
// 	price: 0,
// 	discount_price : 0,
// 	specifications : {
// 		"Fuel Type": "",
// 		"Model Year": "",
// 		"Vehicle Type": "",
// 		"Gear Type": "",
// 		"Engine Type": "",
// 		"Luggage Capacity": "",
// 		"Passenger Capacity": "",
// 	},
// 	subcategory: {
// 		_id: null,
// 		subcategory_name: '',
// 		category_id: {
// 			_id: null,
// 			category_name: '',
// 		},
// 	},
// };

function createData(_id, name, vin, brand, discount_price, price) {
	return {
		_id,
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
const HOST_URL = 'http://localhost:3001/cars';

export const listCars = createAsyncThunk(
	"cars/getAllCars",
	async (page) => {
		const response = await axios.get(`${HOST_URL}?page=${page}`, axiosConfig);
		const data = await response.data;
		console.log("response data",response.data);
		return data;
	}
);

// async (page) => {
// 	try {
// 		const response = await axios.get(`/api/cars?page=${page}`);
// 		return response.data;
// 	} catch (error) {
// 		throw error.response.data;
// 	}
// }

const carsSlice = createSlice({
	name: 'cars',
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
				state.rows = action.payload.data.map((item, index) => createData(item._id, item.name, item.vin, item.brand, item.discount_price, item.price))
			})
			.addCase(listCars.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default carsSlice.reducer;