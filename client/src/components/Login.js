import React, { useState } from 'react';
import google from "../../src/Assets/google.svg"
import facebook from "../../src/Assets/facebook.svg"
import carpicture from '../../src/Assets/carpicture.jpg'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
//min-h-screen
  return (
    <div className="min-h-screen p-2 md:p-3 lg:grid lg:grid-cols-2 items-center content-center	lg:gap-1 gap[0.25rem] ">
      <div className="lg:max-h-screen lg:flex hidden lg:pl-[11rem]">
        <img
          src={carpicture}
          alt="Carpicture"
          className="lg:rounded-lg w-full h-[90vh]"
        />
      </div>
      <div className="text-start ms-4 px-6  lg:pr-[10rem] ">
        <h1 className="text-4xl lg:text-4xl font-extrabold text-gray-800 mb-2">
          Let’s Sign you in
        </h1>
        <p className="text-base lg:text-lg text-gray-600 mb-1">
          Welcome Back, You have been missed
        </p>
        <p className="text-base lg:text-lg font-medium mt-2">Sign in with</p>
        <div className="flex items-center justify-center mt-2 space-x-4">
          <div className="bg-gray-100 p-2 flex justify-center w-full rounded shadow-md">
            <a href="https://www.google.com"><img src={google} alt="Google" className="w-12 lg:w-24 h-6" /></a>
          </div>
          <div className="bg-gray-100 p-2 flex justify-center w-full rounded shadow-md">
            <a href="https://www.facebook.com"><img src={facebook} alt="Facebook" className="w-12 lg:w-24 h-6" /></a>
          </div>
        </div>

        <div className="flex items-center justify-center mt-4 w-full">
          <hr className="w-full border-t-2 border-gray-300 my-2" />
          <p className="mx-4 text-gray-600">Or</p>
          <hr className="w-full border-t-2 border-gray-300 my-2" />
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label htmlFor="email" className="block text-left text-gray-600 text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray w-full border rounded p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
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
          <div>
            <button
              type="submit"
              className="w-full bg-[#0F0F0F] text-white font-semibold py-2 rounded hover:bg-gray-600"
            >
              Sign in
            </button>
          </div>
          <div className='text-start'>
            New customer?
            <a className='ml-2 underline opacity-100 font-medium' href="">Register</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
