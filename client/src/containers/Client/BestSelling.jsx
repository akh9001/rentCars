import React, { useState, useEffect } from 'react';
import LightNavBar from '../../components/Client/LightNavBar';
import CarsCard from '../../components/Client/LandingPage/Cars/CarsCard';
// import { useDispatch, useSelector } from "react-redux";
// import { addTocart } from "../redux/actions/cart";
// import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/cartSlice'
import { useSelector } from 'react-redux';
import { listCars } from '../../slices/Customer/Cars/listCarsSlice';

// CarList component
const CarList = (data) => {
	const [selectedModel, setSelectedModel] = useState('All');
	const [searchTerm, setSearchTerm] = useState('');
	const dispatch = useDispatch();
	//! Add to cart
	const addToCartHandler = (id, carImage, carModel, transmission, price, fuelType) => {
		dispatch(addToCart({
			_id: id,
			carImage: carImage,
			carModel: carModel,
			transmission: transmission,
			price: price,
			fuelType: fuelType,
		}));
	}
	// * List cars
	const carsData = useSelector(state => state.customerListCars.carsData);

	useEffect(() => {
		dispatch(listCars(1));
		console.log("carsData", carsData);
	}, [dispatch]);

	// Event handler for changing the selected model filter
	const handleFilterChange = (e) => {
		setSelectedModel(e.target.value);
	};

	// Event handler for changing the search term
	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	// const addToCartHandler = (id) => {
	//   const isItemExists = cart && cart.find((i) => i._id === id);
	//   if (isItemExists) {
	//     toast.error("Item already in cart!");
	//   } else {
	//     if (data.stock < 1) {
	//       toast.error("Product stock limited!");
	//     } else {
	//       const cartData = { ...data, qty: 1 };
	//       dispatch(addTocart(cartData));
	//       toast.success("Item added to cart successfully!");
	//     }
	//   }
	// };
	// const { cart } = useSelector((state) => state.cart);
	// const dispatch = useDispatch();

	// Filter the cars based on selected model and search term
	const filteredCars = carsData.filter((car) => {
		console.log("$$$$$$$$$$$ car : ", car);
		return (
			(selectedModel === 'All' || car.brand === selectedModel) &&
			(searchTerm === '' ||
				car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
				car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				car.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
				car.gearType.toLowerCase().includes(searchTerm.toLowerCase()) ||
				car.fuelType.toLowerCase().includes(searchTerm.toLowerCase()))
		);
	});

	// Render the component
	return (
		<div className='bg-[#F2F2F2]'>
			<LightNavBar />
			<div className="flex flex-col w-full">
				<div className="flex items-center space-x-4 p-8 bg-[#F2F2F2]">
					<input
						type="text"
						placeholder="Search by Car Name"
						value={searchTerm}
						onChange={handleSearchChange}
						className="p-2 border border-gray-300 rounded outline-white w-full"
					/>
					<select
						value={selectedModel}
						onChange={handleFilterChange}
						className="p-2 border border-gray-300 rounded"
					>
						<option value="All">Car Models</option>
						{Array.from(new Set(carsData.map((car) => car.brand))).map((model) => (
							<option key={model} value={model}>
								{model}
							</option>
						))}
					</select>
				</div>

				{filteredCars.length === 0 ? (
					<p className="mt-12 text-black text-lg font-bold text-center">
						Sorry, No matching cars found.
					</p>
				) : (
					<div className="grid grid-cols-3 md:grid-row-2 gap-4 m-14">
						{filteredCars.map((car) => (
							<CarsCard
								key={car.id}
								carImage={car.image}
								carModel={`${car.brand} ${car.name}`}
								transmission={car.gearType}
								seats={car.passengerCapacity}
								fuelType={car.fuelType}
								category={car.category}
								price={car.price}
								addToCartHandler={() => addToCartHandler(car.id, car.image, `${car.brand} ${car.name}`, car.gearType, car.price, car.fuelType, car.category)}
								data={data}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

// Export the component
export default CarList;
