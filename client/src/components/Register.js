import React, { useState } from 'react';
import google from "../../src/Assets/google.svg"
import facebook from "../../src/Assets/facebook.svg"
import carpicture from '../../src/Assets/carpicture.jpg'

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen p-2 md:p-3 lg:grid lg:grid-cols-2 items-center content-center 	lg:gap-2 gap[0.25rem] py-5">
      <div className='lg:max-h-screen lg:flex hidden lg:pl-[11rem]'>
          <img
           src={carpicture}
            alt=""
        className='lg:rounded-lg w-full h-[90vh]'
             />
      </div>
      <div className="text-start px-3 py-5  ms-4  lg:pr-[10rem] flex-row">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Welcome 
        </h1>
        <p className="text-lg text-left text-gray-600 mb-1">
          Let’s help ourselves and make happiness
        </p>
        <p className="text-lg font-medium mt-2">Sign up with</p>

        <div className="flex items-center justify-start mt-2 space-x-4">
          <div className="bg-gray-100 p-3 flex justify-center rounded shadow-md w-full">
          <a href="https://www.google.com"><img src={google} alt="Google" className="w-24 h-6" /></a>
          </div>
          <div className="bg-gray-100 p-3 flex justify-center rounded shadow-md w-full">
          <a href="https://www.facebook.com"><img src={facebook} alt="Facebook" className="w-24 h-6" /></a>
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <hr className="w-full border-t-2 border-gray-300 my-2" />
          <p className="mx-4 text-gray-600">Or</p>
          <hr className="w-full border-t-2 border-gray-300 my-2" />
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="mt-4">
            <label htmlFor="firstName" className="block text-left text-gray-600 text-sm mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full border rounded p-2"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="lastName" className="block text-left text-gray-600 text-sm mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full border rounded p-2"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="col-span-2 mt-2">
            <label htmlFor="email" className="block text-left text-gray-600 text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border rounded p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-span-2 mt-2">
            <label htmlFor="password" className="block text-left text-gray-600 text-sm mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border rounded p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-span-2 mt-2">
            <button
              type="submit"
              className="w-full bg-[#0F0F0F] text-white font-semibold py-2 rounded hover:bg-gray-600"
            >
              Create Account
            </button>
          </div>
          <div className='text-start'>
            Already have an account?
            <a className='ml-1 underline opacity-100 font-medium' href="">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
