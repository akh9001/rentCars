import React, { useState } from "react";
import { BiPhotoAlbum } from "react-icons/bi";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const carBrands = [
  "Audi",
  "BMW",
  "Chevrolet",
  "Ford",
  "Honda",
  "Hyundai",
  "Kia",
  "Mercedes-Benz",
  "Nissan",
  "Toyota",
  "Volkswagen",
];

const fuelTypeOptions = ["Gasoline", "Diesel", "Electric", "Hybrid"];
const vehicleTypeOptions = ["Cabriolet", "CamperVan", "Coupe", "CUV", "Hatchback", "Micro", "MiniVan", "Pickup", "Roadstar", "Sedan", "Supercar", "SUV", "Van"];
const gearTypeOptions = ["Manual", "Automatic", "CVT", "Semi-Automatic"];
const engineTypeOptions = ["2", "4", "5", "7", "8"];
const passengerCapacityOptions = ["2", "3", "4", "5", "6", "7"];
const luggageCapacityOptions = ["Small", "Medium", "Large"];

export default function AddCar(props) {
  const [carData, setCarData] = useState({
    vin: "",
    name: "",
    brand: "",
    price: "",
    specifications: {
      fuelType: "",
      modelYear: "",
      vehicleType: "",
      gearType: "",
      engineType: "",
      passengerCapacity: "",
      luggageCapacity: "",
    },
    images: [],
    subcategory: "", // You should set this to the selected subcategory value
  });

  const handleSpecificationChange = (value, specType) => {
    setCarData((prevData) => ({
      ...prevData,
      specifications: {
        ...prevData.specifications,
        [specType]: value,
      },
    }));
  };

  const handleImageUpload = (e) => {
    const uploadedImages = e.target.files;

    // Use FormData to upload images (assuming you have an API endpoint for image uploads)
    const formData = new FormData();
    for (let i = 0; i < uploadedImages.length; i++) {
      formData.append("images", uploadedImages[i]);
    }
  };

  return (
    <form className="px-28 py-10">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">Add Your Car</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Please provide car details and an image of the car.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            {/* VIN Input */}
            <div className="sm:col-span-4">
              <label htmlFor="vin" className="block text-sm font-medium leading-6 text-gray-900">
                VIN (Vehicle Identification Number)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="vin"
                  id="vin"
                  value={carData.vin}
                  onChange={(e) => setCarData({ ...carData, vin: e.target.value })}
                  className="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="VIN"
                />
              </div>
            </div>

            {/* Car Name Input */}
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Car Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={carData.name}
                  onChange={(e) => setCarData({ ...carData, name: e.target.value })}
                  className="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Car Name"
                />
              </div>
            </div>

            {/* Car Brand Autocomplete */}
            <div className="sm:col-span-4">
              <label htmlFor="brand" className="block mb-2 text-sm font-medium leading-6 text-gray-900">
                Car Brand
              </label>
              <Autocomplete
                options={carBrands}
                getOptionLabel={(option) => option}
                value={carData.brand}
                onChange={(event, newValue) => setCarData({ ...carData, brand: newValue })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Car Brand"
                    variant="outlined"
                    placeholder="Car Brand"
                  />
                )}
              />
            </div>

            {/* Car Price Input */}
            <div className="sm:col-span-4">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={carData.price}
                  onChange={(e) => setCarData({ ...carData, price: e.target.value })}
                  className="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Price"
                />
              </div>
            </div>

            {/* Specifications Autocomplete */}
            <div className="sm:col-span-4">
              <label htmlFor="specifications" className="block text-sm mb-2 font-medium leading-6 text-gray-900">
                Specifications
              </label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { options: fuelTypeOptions, label: "Fuel Type" },
                  { options: vehicleTypeOptions, label: "Vehicle Type" },
                  { options: gearTypeOptions, label: "Gear Type" },
                  { options: engineTypeOptions, label: "Engine Type" },
                  { options: passengerCapacityOptions, label: "Passenger Capacity" },
                  { options: luggageCapacityOptions, label: "Luggage Capacity" },
                ].map((spec, index) => (
                  <Autocomplete
                    key={index}
                    options={spec.options}
                    getOptionLabel={(option) => option}
                    value={carData.specifications[spec.label.toLowerCase()]}
                    onChange={(event, newValue) => handleSpecificationChange(newValue, spec.label.toLowerCase())}
                    renderInput={(params) => (
                      <TextField {...params} label={spec.label} variant="outlined" placeholder={`Select ${spec.label}`} fullWidth />
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Car Images Upload */}
            <div className="col-span-full mt-4">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Car Images
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <BiPhotoAlbum className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleImageUpload}
                        multiple
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              {carData.images.length > 0 && (
                <div className="mt-4 flex space-x-2">
                  {carData.images.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Car Image ${index + 1}`}
                      className="w-20 h-20 rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Cancel and Save Buttons */}
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={props.toggleAddCarClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-zinc-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
