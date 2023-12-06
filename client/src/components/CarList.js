import React, { useState, useEffect } from 'react';
import LightNavBar from './Client/LightNavBar';
import CarsCard from './Client/LandingPage/Cars/CarsCard';
// import { useDispatch, useSelector } from "react-redux";
// import { addTocart } from "../redux/actions/cart";
// import { toast } from "react-toastify";
import car from '../assets/ElectricCar.jpg'

const carsData = [
  { id: 2, model: 'Mercedes', car: 'C-Class', description: 'Compact executive car with elegant design.', image: car},
  { id: 3, model: 'Volkswagen', car: 'Jetta', description: 'Sleek compact sedan with modern technology.', image: '/images/volkswagen_jetta.jpg' },
  { id: 4, model: 'Volkswagen', car: 'Passat', description: 'Comfortable midsize sedan with spacious interior.', image: '/images/volkswagen_passat.jpg' },
  { id: 5, model: 'Toyota', car: 'Camry', description: 'Reliable and fuel-efficient midsize sedan.', image: '/images/toyota_camry.jpg' },
  { id: 6, model: 'Toyota', car: 'Corolla', description: 'Popular compact car known for efficiency.', image: '/images/toyota_corolla.jpg' },
  { id: 7, model: 'Ford', car: 'Mustang', description: 'Iconic muscle car with powerful performance.', image: '/images/ford_mustang.jpg' },
  { id: 8, model: 'Ford', car: 'Escape', description: 'Compact SUV offering versatility and efficiency.', image: '/images/ford_escape.jpg' },
  { id: 9, model: 'Honda', car: 'Accord', description: 'Well-rounded midsize sedan with modern features.', image: '/images/honda_accord.jpg' },
  { id: 10, model: 'Honda', car: 'Civic', description: 'Compact car known for its efficiency and style.', image: '/images/honda_civic.jpg' },
  { id: 11, model: 'Chevrolet', car: 'Malibu', description: 'Midsize sedan with a comfortable ride and modern features.', image: '/images/chevrolet_malibu.jpg' },
  { id: 12, model: 'Chevrolet', car: 'Cruze', description: 'Compact car with a stylish design and fuel efficiency.', image: '/images/chevrolet_cruze.jpg' },
  { id: 13, model: 'Nissan', car: 'Altima', description: 'Midsize sedan offering a balance of comfort and performance.', image: '/images/nissan_altima.jpg' },
  { id: 14, model: 'Nissan', car: 'Maxima', description: 'Full-size sedan with a powerful engine and upscale features.', image: '/images/nissan_maxima.jpg' },
  { id: 15, model: 'BMW', car: '3 Series', description: 'Luxury compact car with sporty handling and advanced technology.', image: '/images/bmw_3_series.jpg' },
  { id: 16, model: 'BMW', car: '5 Series', description: 'Executive sedan known for its premium features and driving experience.', image: '/images/bmw_5_series.jpg' },
  { id: 17, model: 'Audi', car: 'A4', description: 'Compact luxury sedan with a refined interior and strong performance.', image: '/images/audi_a4.jpg' },
  { id: 18, model: 'Audi', car: 'Q5', description: 'Luxury compact SUV with advanced safety features and spacious interior.', image: '/images/audi_q5.jpg' },
  { id: 19, model: 'Hyundai', car: 'Sonata', description: 'Midsize sedan with a sleek design and user-friendly features.', image: '/images/hyundai_sonata.jpg' },
  { id: 20, model: 'Hyundai', car: 'Elantra', description: 'Compact car offering good fuel efficiency and modern technology.', image: '/images/hyundai_elantra.jpg' },
  // ... add more cars as needed
];


// CarList component
const CarList = (data) => {
  const [selectedModel, setSelectedModel] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

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
            // addToCartHandler={addToCartHandler}
            // data={data}
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
