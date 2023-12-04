import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineHome,
  AiOutlineStar,
  AiOutlineBook,
  AiOutlineInfoCircle,
  AiOutlineUsergroupAdd,
  AiOutlineMail,
  AiOutlineMenu,
  AiOutlineClose,
} from 'react-icons/ai';
import Cart from '../../components/Layout/Cart';
import Sidebar from '../Layout/Sidebar';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
<nav className="flex items-center justify-between py-4 px-20 bg-black ">
      <AiOutlineUser onClick={toggleSidebar} size={20} className="cursor-pointer text-white hover:scale-150 duration-300" />
      {isSidebarVisible && <Sidebar />}

      <button onClick={toggleMenu} className="block large:hidden focus:outline-none text-white">
        {isOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </button>

      <div className="hidden large:flex space-x-12 mx-auto text-white">
        <Link to="/" className="text-xs font-light hover:bg-white hover:text-black rounded-full py-2 px-4 transition duration-300">
          Home
        </Link>
        <Link to="/best-selling" className="text-xs font-light hover:bg-white hover:text-black rounded-full py-2 px-4 transition duration-300">
          Best selling
        </Link>
        <Link to="/catalog" className="text-xs font-light hover:bg-white hover:text-black rounded-full py-2 px-4 transition duration-300">
          Catalog
        </Link>
        <div className="text-lg font-bold">
          <strong>Rent</strong>Car
        </div>
        <Link to="/faq" className="text-xs font-light hover:bg-white hover:text-black rounded-full py-2 px-4 transition duration-300">
          FAQ
        </Link>
        <Link to="/join-us" className="text-xs font-light hover:bg-white hover:text-black rounded-full py-2 px-4 transition duration-300">
          Join Us
        </Link>
        <Link to="/contact-us" className="text-xs font-light hover:bg-white hover:text-black rounded-full py-2 px-4 transition duration-300">
          Contact Us
        </Link>
      </div>

      {isOpen && (
        <div className="flex flex-col w-full large:hidden absolute top-16 left-0 bg-black text-white z-50 p-4">
          <Link to="/" className="flex items-center text-xs font-semibold py-2 px-4 hover:bg-white hover:text-black transition duration-300">
            <AiOutlineHome size={20} className="mr-2" />
            Home
          </Link>
          <Link to="/best-selling" className="flex items-center text-xs font-semibold py-2 px-4 hover:bg-white hover:text-black transition duration-300">
            <AiOutlineStar size={20} className="mr-2" />
            Best selling
          </Link>
          <Link to="/catalog" className="flex items-center text-xs font-semibold py-2 px-4 hover:bg-white hover:text-black transition duration-300">
            <AiOutlineBook size={20} className="mr-2" />
            Catalog
          </Link>
          <Link to="/about-us" className="flex items-center text-xs font-semibold py-2 px-4 hover:bg-white hover:text-black transition duration-300">
            <AiOutlineInfoCircle size={20} className="mr-2" />
            About Us
          </Link>
          <Link to="/join-us" className="flex items-center text-xs font-semibold py-2 px-4 hover:bg-white hover:text-black transition duration-300">
            <AiOutlineUsergroupAdd size={20} className="mr-2" />
            Join Us
          </Link>
          <Link to="/contact-us" className="flex items-center text-xs font-semibold py-2 px-4 hover:bg-white hover:text-black transition duration-300">
            <AiOutlineMail size={20} className="mr-2" />
            Contact Us
          </Link>
        </div>
      )}

      <AiOutlineShoppingCart onClick={toggleCart} size={20} className="cursor-pointer hover:scale-150 text-white duration-300" />
      {isCartVisible && <Cart toggleCart={toggleCart} />}
    </nav>
  );
};

export default NavBar;
