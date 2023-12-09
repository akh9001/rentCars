import React, { useState, useEffect } from 'react';
import LightNavBar from './Client/LightNavBar';
import CarsCard from './Client/LandingPage/Cars/CarsCard';
// import { useDispatch, useSelector } from "react-redux";
// import { addTocart } from "../redux/actions/cart";
// import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import {addToCart} from '../slices/cartSlice'
import { useSelector } from 'react-redux';
import car from '../assets/ElectricCar.jpg'

const carsData = [
  { id: 2, model: 'Mercedes', car: 'C-Class', price:200, description: 'Compact executive car with elegant design.', image: car},
  { id: 3, model: 'Volkswagen', car: 'Jetta', price:200, description: 'Sleek compact sedan with modern technology.', image: '/images/volkswagen_jetta.jpg' },
  { id: 4, model: 'Volkswagen', car: 'Passat', price:200, description: 'Comfortable midsize sedan with spacious interior.', image: '/images/volkswagen_passat.jpg' },
  { id: 5, model: 'Toyota', car: 'Camry', price:200, description: 'Reliable and fuel-efficient midsize sedan.', image: '/images/toyota_camry.jpg' },
  { id: 6, model: 'Toyota', car: 'Corolla', price:200, description: 'Popular compact car known for efficiency.', image: '/images/toyota_corolla.jpg' },
  { id: 7, model: 'Ford', car: 'Mustang', price:200, description: 'Iconic muscle car with powerful performance.', image: '/images/ford_mustang.jpg' },
  { id: 8, model: 'Ford', car: 'Escape', price:200, description: 'Compact SUV offering versatility and efficiency.', image: '/images/ford_escape.jpg' },
  { id: 9, model: 'Honda', car: 'Accord', price:200, description: 'Well-rounded midsize sedan with modern features.', image: '/images/honda_accord.jpg' },
  { id: 10, model: 'Honda', car: 'Civic', price:200, description: 'Compact car known for its efficiency and style.', image: '/images/honda_civic.jpg' },
  { id: 11, model: 'Chevrolet', car: 'Malibu', price:200, description: 'Midsize sedan with a comfortable ride and modern features.', image: '/images/chevrolet_malibu.jpg' },
  { id: 12, model: 'Chevrolet', car: 'Cruze', price:200, description: 'Compact car with a stylish design and fuel efficiency.', image: '/images/chevrolet_cruze.jpg' },
  { id: 13, model: 'Nissan', car: 'Altima', price:200, description: 'Midsize sedan offering a balance of comfort and performance.', image: '/images/nissan_altima.jpg' },
  { id: 14, model: 'Nissan', car: 'Maxima', price:200, description: 'Full-size sedan with a powerful engine and upscale features.', image: '/images/nissan_maxima.jpg' },
  { id: 15, model: 'BMW', car: '3 Series', price:200, description: 'Luxury compact car with sporty handling and advanced technology.', image: '/images/bmw_3_series.jpg' },
  { id: 16, model: 'BMW', car: '5 Series', price:200, description: 'Executive sedan known for its premium features and driving experience.', image: '/images/bmw_5_series.jpg' },
  { id: 17, model: 'Audi', car: 'A4', price:200, description: 'Compact luxury sedan with a refined interior and strong performance.', image: '/images/audi_a4.jpg' },
  { id: 18, model: 'Audi', car: 'Q5', price:200, description: 'Luxury compact SUV with advanced safety features and spacious interior.', image: '/images/audi_q5.jpg' },
  { id: 19, model: 'Hyundai', car: 'Sonata', price:200, description: 'Midsize sedan with a sleek design and user-friendly features.', image: '/images/hyundai_sonata.jpg' },
  { id: 20, model: 'Hyundai', car: 'Elantra', price:200, description: 'Compact car offering good fuel efficiency and modern technology.', image: '/images/hyundai_elantra.jpg' },
  // ... add more cars as needed
];


// CarList component
const CarList = (data) => {
  const [selectedModel, setSelectedModel] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const addToCartHandler = (id, carImage, carModel, transmission, price, fuelType) => {
    dispatch(addToCart({
      _id:id,
      carImage: carImage,
      carModel: carModel,
      transmission: transmission,
      price: price,
      fuelType: fuelType,
    }));
  }

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
    return (
      (selectedModel === 'All' || car.model === selectedModel) &&
      (searchTerm === '' ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.car.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Render the component
  return (
    <div className='bg-[#F2F2F2]'>
      <LightNavBar/>
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
          {Array.from(new Set(carsData.map((car) => car.model))).map((model) => (
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
            carModel={`${car.model} ${car.car}`}
            transmission="Manual" 
            seats="5" 
            fuelType="Petrol" 
            addToCartHandler={() => addToCartHandler(car.id, car.image, `${car.model} ${car.car}`, "Manual", car.price, "Petrol")}
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
