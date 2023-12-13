import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import AdminNavbar from '../../components/Admin/AdminNavbar'
import AllUsers from "../../components/Admin/DashboardBody/AllUsers";
import { IoAddOutline } from 'react-icons/io5';
import AllCustomers from '../../components/Admin/DashboardBody/AllCustomer';

const AdminDashboardUsers = () => {
const [selectedComponent, setSelectedComponent]	= useState('users');

const handleToggleComponent = () => {
	setSelectedComponent(selectedComponent === 'users' ? 'customers' : 'users');
};
  return (
    <div>
    <AdminNavbar />
    <div className="w-full h-screen">
      <div className="flex items-Center justify-between w-full  ">
		<button onClick={handleToggleComponent}>
			{selectedComponent === 'users' ? 'Users' : 'Customers'}	
		</button>
       
				  {selectedComponent === 'users' ? <AllUsers /> : <AllCustomers />}
      
      </div>
      <div className='m-8'>
        <Link 
					type='button'
					to="/Admin-Dashboard-Users/Admin-add-user" 
					className="bg-zinc-800 float-right large:w-1/6 small:w-1/3 justify-center flex items-center hover:bg-zinc-600 duration-300 text-white small:text-xs large:text-sm  font-medium small:py small:px-1 py-2 px-4 border border-gray-400 rounded shadow">
						<IoAddOutline size={18} className='mr-2' />   Add a User
				</Link>
        </div>
    </div>
 
  </div>
  )
}

export default AdminDashboardUsers