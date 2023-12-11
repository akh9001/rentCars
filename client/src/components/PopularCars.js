// CarList component
import React, { useState } from 'react';
import CarDetailsPopup from './CarDetailsPopup'; // Adjust the import path accordingly
import jeep from '../assets/jeep.jpg'


const carsData = [
    { id: 1, model: 'Mercedes', car: 'C-Class', description: 'Compact executive car with elegant design.', image:jeep },
    { id: 2, model: 'Mercedes', car: 'C-Class', description: 'Compact executive car with elegant design.', image: './assets/carpic.jpg' },
    { id: 3, model: 'Volkswagen', car: 'Jetta', description: 'Sleek compact sedan with modern technology.', image: '/images/volkswagen_jetta.jpg' },
    { id: 4, model: 'Volkswagen', car: 'Passat', description: 'Comfortable midsize sedan with spacious interior.', image: '/images/volkswagen_passat.jpg' },
    { id: 5, model: 'Toyota', car: 'Camry', description: 'Reliable and fuel-efficient midsize sedan.', image: '/images/toyota_camry.jpg' },
    { id: 6, model: 'Toyota', car: 'Corolla', description: 'Popular compact car known for efficiency.', image: '/images/toyota_corolla.jpg' },
    { id: 7, model: 'Volkswagen', car: 'Passat', description: 'Comfortable midsize sedan with spacious interior.', image: '/images/volkswagen_passat.jpg' },
    { id: 8, model: 'Toyota', car: 'Camry', description: 'Reliable and fuel-efficient midsize sedan.', image: '/images/kia.jpg' },
  
    ];


const CarList = () => {
  const [selectedCar, setSelectedCar] = useState(null);

  const handleCarClick = (car) => {
    setSelectedCar(car);
  };

  const handleClosePopup = () => {
    setSelectedCar(null);
  };

  const handleRentNow = (car) => {
    // Implement the logic for renting the car
    console.log(`Renting ${car.model} ${car.car}`);
    handleClosePopup();
  };

  return (
    <div className="flex flex-col w-full">
      {/* Title for the popular cars section */}
      <h2 className="text-5xl font-bold my-8 text-center ">Popular Cars</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
        {carsData.map((car) => (
          <div key={car.id} className="p-8 border border-gray-300 rounded cursor-pointer" onClick={() => handleCarClick(car)}>
            <img src={car.image} alt={`${car.model} ${car.car}`} className="mb-4 max-h-40 rounded object-cover" />
            <p className='font-medium'>
              Car Model: {car.model}, Car Type: {car.car}
            </p>
            <p className='mt-3'>Description: {car.description}</p>

            {/* Rent Now button */}
            <button onClick={() => handleRentNow(car)} className="mt-4 bg-black text-white p-2 rounded hover:bg-gray-700 focus:outline-none">
              Rent Now
            </button>
          </div>
        ))}
      </div>

      {selectedCar && (
        <CarDetailsPopup car={selectedCar} onClose={handleClosePopup} onAddToCart={handleRentNow} />
      )}
    </div>
  );
};

export default CarList;
