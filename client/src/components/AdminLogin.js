import React from 'react';
import carpic from '../Assets/carpic.jpg'


const AdminLogin = () => {
  return (
    <div className=" relative min-h-screen flex items-center justify-center bg-gray-50 rounded">
      <div className="absolute inset-0 bg-cover bg-center z-0">
		<img src={carpic} alt="" className='object-cover h-full w-full  brightness-50	'/>
	  </div>
      <div className=" z-10 max-w-md w-full lg:mx-3 space-y-8 p-8 pt-2 bg-white rounded-md shadow-md">
	     <p className='text-black text-center text-5xl font-extrabold mt-8 tracking-wide'>Rent<span className='text-4xl font-bold'>Car</span></p>
        <form className="mt-8 space-y-6">
          <div>
            <label htmlFor="username" className="block autofill text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="mt-1 p-2 w-full border rounded-md outline-none	"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 p-2 w-full border rounded-md outline-none	"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg- focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-slate-700"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
