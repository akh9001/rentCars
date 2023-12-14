import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { FiArrowDownRight, FiSearch } from 'react-icons/fi';
import { BiCar } from 'react-icons/bi'; // Example of using a react-icon for cars
import { FaCogs } from 'react-icons/fa'; // Example of using a react-icon for gear types
import { MdPeople } from 'react-icons/md'; // Example of using a react-icon for passenger capacities
import { makeStyles } from '@mui/styles';

  const useStyles = makeStyles({
    customInput: {
      '& .MuiOutlinedInput-root': {
        padding: 0,
        '& .MuiOutlinedInput-input': {
          padding: '10px 14px',
        },
      },
    },
  });

export default function SearchFilter() {
  const classes = useStyles();
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [modelYear, setModelYear] = useState('');
  const [gearType, setGearType] = useState('');
  const [passengerCapacity, setPassengerCapacity] = useState('');

  // Lists of brands, gear types, and passenger capacities
  const carBrands = ['Brand1', 'Brand2', 'Brand3', 'Brand4'];
  const gearTypes = ['Automatic', 'Manual', 'Semi-Automatic'];
  const passengerCapacities = ['2', '4', '5', '7'];
  const modelYears = ['2020', '2021', '2022']; // Replace with your actual model years

  const handleSearch = () => {
    console.log('Search clicked!', { brand, price, modelYear, gearType, passengerCapacity });
  };

  return (
    <div className="flex flex-wrap justify-center items-center space-x-2 space-y-2 sm:space-y-0 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90 border rounded-xl border-gray-100 bg-white shadow-md py-4 px-4 sm:px-8 m-8">
      {/* Brand */}
      <div className="flex-1 bg-white min-w-[200px] m-3 rounded-md">
        <Autocomplete
          options={carBrands}
          getOptionLabel={(option) => option}
          value={brand}
          onChange={(event, newValue) => setBrand(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Brand"
              variant="outlined"
              placeholder="Select Brand"
              InputProps={{
                ...params.InputProps,
                classes: { root: classes.customInput },
              }}
            />
          )}
        />
      </div>

      {/* Price */}
      <div className="flex-1 bg-white min-w-[200px] m-3 rounded-md">
        <TextField
          label="Price"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder="Enter Price"
          InputProps={{
            className: classes.customInput,
          }}
          fullWidth
        />
      </div>

      {/* Model Year */}
      <div className="flex-1 bg-white min-w-[200px] m-3 rounded-md">
        <Autocomplete
          options={modelYears}
          getOptionLabel={(option) => option}
          value={modelYear}
          onChange={(event, newValue) => setModelYear(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Model Year"
              variant="outlined"
              placeholder="Select Year"
              InputProps={{
                ...params.InputProps,
                classes: { root: classes.customInput },
              }}
            />
          )}
        />
      </div>

      {/* Gear Type */}
      <div className="flex-1 bg-white min-w-[200px] m-3 rounded-md">
        <Autocomplete
          options={gearTypes}
          getOptionLabel={(option) => option}
          value={gearType}
          onChange={(event, newValue) => setGearType(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Gear Type"
              variant="outlined"
              placeholder="Select Gear Type"
              InputProps={{
                ...params.InputProps,
                classes: { root: classes.customInput },
              }}
            />
          )}
        />
      </div>

      {/* Passenger Capacity */}
      <div className="flex-1 bg-white min-w-[200px] m-3 rounded-md">
        <Autocomplete
          options={passengerCapacities}
          getOptionLabel={(option) => option}
          value={passengerCapacity}
          onChange={(event, newValue) => setPassengerCapacity(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Passenger Capacity"
              variant="outlined"
              placeholder="Select Capacity"
              InputProps={{
                ...params.InputProps,
                classes: { root: classes.customInput },
              }}
            />
          )}
        />
      </div>

      {/* Search Button */}
      <div className="w-full mx-auto">
        <button
          onClick={handleSearch}
          className="w-full flex items-center my-4 justify-center font-medium text-sm bg-black text-white p-6 hover:bg-zinc-900 duration-300 rounded-md cursor-pointer"
        >
          Find your Vehicule
          <FiArrowDownRight size={25} className="ml-2" />
        </button>
      </div>
    </div>
  );
}
