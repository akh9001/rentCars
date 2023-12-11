import React, { useState } from "react";
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
} from "react-icons/ai";

import Cart from '../../components/Layout/Cart'
import Sidebar from "../Layout/Sidebar";

const NavBar = ({active, setActive}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [isCartVisible, setIsCartVisible] = useState(false);
  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <nav className="relative flex items-center justify-between py-4 px-20 bg-black ">
      <AiOutlineUser onClick={toggleSidebar} color="#fff" size={20} className="cursor-pointer hover:scale-150 duration-300"/>
      
      {isSidebarVisible && <Sidebar active={active} setActive={setActive}/>}

      <button onClick={toggleMenu} className="block lg:hidden focus:outline-none">
        {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>

      <div className="hidden lg:flex space-x-12 mx-auto items-center justify-between text-white">
        <Link to="/" className="font-light text-xs hover:text-black hover:bg-white hover:rounded-full hover:py-2 hover:px-4 duration-300">
          Home
        </Link>
        <Link to="/car-list" className="font-light text-xs hover:text-black hover:bg-white hover:rounded-full hover:py-2 hover:px-4 duration-300">
          Best selling
        </Link>
        <Link to="/catalog" className="font-light text-xs hover:text-black hover:bg-white hover:rounded-full hover:py-2 hover:px-4 duration-300">
          Catalog
        </Link>
        <div className="Logo">
          <strong>Rent</strong>Car
        </div>
        <Link to="/faq" className="font-light text-xs hover:text-black hover:bg-white hover:rounded-full hover:py-2 hover:px-4 duration-300">
          FAQ
        </Link>
        <Link to="/register" className="font-light text-xs hover:text-black hover:bg-white hover:rounded-full hover:py-2 hover:px-4 duration-300">
          Sign In
        </Link>
        <Link to="/contact-us" className="font-light text-xs hover:text-black hover:bg-white hover:rounded-full hover:py-2 hover:px-4 duration-300">
          Contact Us
        </Link>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} lg:hidden absolute text-left rounded-md top-16 bg-black shadow-md z-50 w-4/6 lg:w-auto`}>
        <Link to="/" className="flex items-center text-xs py-2 px-4 hover:text-black hover:bg-white duration-300">
          <AiOutlineHome size={20} className="mr-2" />
          Home
        </Link>
        <Link to="/best-selling" className="flex items-center text-xs py-2 px-4 hover:text-black hover:bg-white duration-300">
          <AiOutlineStar size={20} className="mr-2" />
          Best selling
        </Link>
        <Link to="/catalog" className="flex items-center text-xs py-2 px-4 hover:text-black hover:bg-white duration-300">
          <AiOutlineBook size={20} className="mr-2" />
          Catalog
        </Link>
        <Link to="/faq" className="flex items-center text-xs py-2 px-4 hover:text-black hover:bg-white duration-300">
          <AiOutlineInfoCircle size={20} className="mr-2" />
          FAQ
        </Link>
        <Link to="/register" className="flex items-center text-xs py-2 px-4 hover:text-black hover:bg-white duration-300">
          <AiOutlineUsergroupAdd size={20} className="mr-2" />
          Join Us
        </Link>
        <Link to="/contact-us" className="flex items-center text-xs py-2 px-4 hover:text-black hover:bg-white duration-300">
          <AiOutlineMail size={20} className="mr-2" />
          Contact Us
        </Link>
      </div>

      <AiOutlineShoppingCart color="#fff" size={20} className="cursor-pointer hover:scale-150 duration-300" onClick={toggleCart} />
      
      {isCartVisible && <Cart toggleCart={toggleCart} />}
    </nav>
  );
};

export default NavBar;
