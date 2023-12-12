import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
// import { addUser } from '../slices/Admin/Users/userSlice'; // Update the path as necessary

const userRoles = ["Admin", "Manager"]; // Removed "User" from the roles

const AdminAddUser = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  });
  
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the logic to add a new user
    console.log(userData);
    // dispatch(addUser(userData)); // Uncomment to dispatch the action
  };

  return (
    <div className="container mx-auto p-6 h-screen">
      <div className="mb-6 mt-20">
        <h2 className="text-2xl font-semibold">Add New User</h2>
        <p className="text-gray-600 mt-2">Enter the user details below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-4 shadow rounded">
        <TextField
          label="First Name"
          name="firstName"
          variant="outlined"
          fullWidth
          required
          value={userData.firstName}
          onChange={handleInputChange}
          className="mb-4"
        />

        <TextField
          label="Last Name"
          name="lastName"
          variant="outlined"
          fullWidth
          required
          value={userData.lastName}
          onChange={handleInputChange}
          className="mb-4"
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          fullWidth
          required
          value={userData.email}
          onChange={handleInputChange}
          className="mb-4"
        />

        <Autocomplete
          options={userRoles}
          getOptionLabel={(option) => option}
          renderInput={(params) => <TextField {...params} label="Role" variant="outlined" required />}
          value={userData.role}
          onChange={(event, newValue) => setUserData({ ...userData, role: newValue })}
          fullWidth
        />

        <div className="flex justify-end">
          <Link to="../Admin-Dashboard-Users" className="mr-4 px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-100">
            Cancel
          </Link>
          <Button type="submit" variant="contained" color="primary">
            Add User
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddUser;
