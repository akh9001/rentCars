import React, { useState } from 'react';

const carsData = [
  { id: 2, model: 'Mercedes', car: 'C-Class', description: 'Compact executive car with elegant design.', image: '/images/mercedes_c_class.jpg' },
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
const CarList = () => {
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
        <div className="grid grid-cols-4 md:grid-row-2  m-4">
          {filteredCars.map((car) => (
            <div key={car.id} className="p-8 m-2 border border-gray-300 rounded">
              {/* Display car information */}
              <img src={car.image} alt={`${car.model} ${car.car}`} className="mb-4 max-h-40 object-cover" />
              <p>
                Car Model: {car.model}, Car Type: {car.car}
              </p>
              <p>Description: {car.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Export the component
export default CarList;
