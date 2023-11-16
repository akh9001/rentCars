import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { FiArrowRight } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
import InputAdornment from '@mui/material/InputAdornment';



const cities = ["Casablanca", "Rabat", "Marrakech", "Tangier", "Fes", "Agadir", "Essaouira", "Chefchaouen", "Ouarzazate"];

export default function SearchFilter() {
  const [pickUpLocation, setPickUpLocation] = React.useState(null);
  const [dropOffLocation, setDropOffLocation] = React.useState(null);
  const [pickUpDate, setPickUpDate] = React.useState(null);
  const [dropOffDate, setDropOffDate] = React.useState(null);

  const handleFindVehicle = () => {
    // Handle the logic when the user clicks "Find a Vehicle"
    console.log("Find a Vehicle clicked!");
  };

  return (
<div className="flex items-center justify-center space-x-4 bg-white shadow-md h-full py-4 w-10/12 bg-white-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-80 border border-gray-100 mx-auto
    ">
      <div className="w-48 bg-white p-3 rounded-md">
        <Autocomplete
          options={cities}
          getOptionLabel={(option) => option}
          value={pickUpLocation}
          onChange={(event, newValue) => setPickUpLocation(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              
              label="Pick-up Location"
              variant="standard"
              placeholder="Select Pick-up Location"
              style={{ width: '100%' }}
            />
          )}
        />
      </div>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="w-48 bg-white p-3 rounded-md">
          <KeyboardDatePicker
            disableToolbar
            variant="standard"
            format="MM/dd/yyyy"
            margin="normal"
            id="pick-up-date"
            label="Pick-up Date"
            value={pickUpDate}
            style={{ width: '100%' }}
            onChange={(date) => setPickUpDate(date)}
            KeyboardButtonProps={{
              "aria-label": "change pick-up date",
            }}
          />
        </div>

        <div className="w-48 bg-white p-3 rounded-md">
          <Autocomplete
            options={cities}
            getOptionLabel={(option) => option}
            value={dropOffLocation}
            onChange={(event, newValue) => setDropOffLocation(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Drop-off Location "
                variant="standard"
                placeholder="Select Drop-off Location"
                style={{ width: '100%' }}
               
              />
            )}
          />
        </div>

        <div className="w-48 bg-white px-3 rounded-md">
          <KeyboardDatePicker
            disableToolbar
            variant="standard"
            format="MM/dd/yyyy"
            margin="normal"
            id="drop-off-date"
            label="Drop-off Date"
            value={dropOffDate}
            style={{ width: '100%' }}
            onChange={(date) => setDropOffDate(date)}
            KeyboardButtonProps={{
              "aria-label": "change drop-off date",
            }}
          />
        </div>
      </MuiPickersUtilsProvider>

      <button
        onClick={handleFindVehicle}
        className="flex items-center font-medium text-sm bg-black text-white px-6 py-7 hover:bg-zinc-900 duration-300 rounded-md cursor-pointer"
      >
        Find a Vehicle
        <FiArrowRight className="ml-2" />
      </button>
    </div>
  );
}
