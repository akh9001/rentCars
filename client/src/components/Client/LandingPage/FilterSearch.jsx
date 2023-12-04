import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { FiArrowRight } from 'react-icons/fi';

const useStyles = makeStyles({
  customInput: {
    '& .MuiOutlinedInput-root': {
      padding: 0,
      '& .MuiOutlinedInput-input': {
        padding: '10px 14px',
      },
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px, 14px) scale(1)',
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
  },
});

const cities = [
  "Casablanca", "Rabat", "Marrakech", "Tangier", "Fes", "Agadir",
  "Essaouira", "Chefchaouen", "Ouarzazate",
];

export default function SearchFilter() {
  const classes = useStyles();
  const [pickUpLocation, setPickUpLocation] = React.useState(null);
  const [dropOffLocation, setDropOffLocation] = React.useState(null);
  const [pickUpDate, setPickUpDate] = React.useState(null);
  const [dropOffDate, setDropOffDate] = React.useState(null);

  const handleFindVehicle = () => {
    console.log('Find a Vehicle clicked!');
  };

  return (
    <div className="flex flex-wrap justify-center items-center space-x-2 space-y-2 sm:space-y-0 bg-white shadow-md py-4 px-4 sm:px-8 rounded-md m-8">
    
      <div className="flex-1 min-w-[200px] border-solid border border-zinc-500 p-3 rounded-md">
          <Autocomplete
            options={cities}
            getOptionLabel={(option) => option}
            value={dropOffLocation}
            onChange={(event, newValue) => setDropOffLocation(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Pick-up Location"
                variant="standard"
                placeholder="Select Pick-up Location"
                InputProps={{ ...params.InputProps, classes: { root: classes.customInput } }}
              />
            )}
          />
        </div>

        


      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="flex-1 min-w-[200px] border-solid border border-zinc-500 px-3 rounded-md">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="pick-up-date"
            label="Pick-up Date"
            value={pickUpDate}
            fullWidth
            onChange={setPickUpDate}
            KeyboardButtonProps={{
              'aria-label': 'change pick-up date',
            }}
            InputProps={{ className: classes.customInput }}
            inputProps={{ style: { padding: '10px 14px' } }}
          />
        </div>

        <div className="flex-1 min-w-[200px] border-solid border border-zinc-500 p-3 rounded-md">
          <Autocomplete
            options={cities}
            getOptionLabel={(option) => option}
            value={dropOffLocation}
            onChange={(event, newValue) => setDropOffLocation(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Drop-off Location"
                variant="standard"
                placeholder="Select Drop-off Location"
                InputProps={{ ...params.InputProps, classes: { root: classes.customInput } }}
              />
            )}
          />
        </div>

        <div className="flex-1 min-w-[200px] border-solid border border-zinc-500 px-3 rounded-md">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="drop-off-date"
            label="Drop-off Date"
            value={dropOffDate}
            fullWidth
            onChange={setDropOffDate}
            KeyboardButtonProps={{
              'aria-label': 'change drop-off date',
            }}
            InputProps={{ className: classes.customInput }}
            inputProps={{ style: { padding: '10px 14px' } }}
          />
        </div>
      </MuiPickersUtilsProvider>

      <div className="flex-1 min-w-[200px]">
        <button
          onClick={handleFindVehicle}
          className="w-full flex items-center justify-center font-medium text-sm bg-black text-white p-6 hover:bg-zinc-900 duration-300 rounded-md cursor-pointer"
        >
          Find a Vehicle
          <FiArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
}
