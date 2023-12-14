import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { RxPerson } from 'react-icons/rx';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { AiOutlineMessage, AiOutlineLogin } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { TbAddressBook } from 'react-icons/tb';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios
      .get(`${'http://localhost:3000/'}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate('/login');
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="w-full bg-white text-black p-2 mx-4">
      <div className="single_item flex items-center cursor-pointer w-full  mb-6"  onClick={() => navigate("/profile")} >
        <RxPerson size={20}/>
        <span className="pl-3">Profil</span>
       </div>
     
       <div className="single_item flex items-center cursor-pointer w-full" onClick={logoutHandler}>
        <AiOutlineLogin size={20} />
        <span className="pl-3">Log out</span>
       </div>
     
    </div>
  );
};

const UserProfileCard = () => {
  return (
    <div className="flex items-center bg-white rounded-lg shadow p-4 ">
      <Avatar src="path_to_kate_russell_image.jpg" alt="Kate Russell" className="mr-4" />
      <div className="flex-grow">
        <p className="text-sm font-semibold text-gray-700">Kate Russell</p>
        <p className="text-xs text-gray-500">Car Shop</p>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="flex flex-col p-4 bg-white border-r rounded-xl shadow-lg top-16 absolute z-50 w-64 dark:bg-gray-800 dark:border-gray-600">
    {true ? (
      <>
        <UserProfileCard />
        <nav className="mt-2 flex-1">
          <ProfileSidebar />
        </nav>
      </>
    ) : (
      <p className="text-sm text-gray-700 p-8">
        Hello there,Please <Link to="/login" className="text-blue-500 text-bold">sign in</Link>
      </p>
    )}
  </div>
  );
};

export default Sidebar;
