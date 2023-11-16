import {React, useState} from "react";
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

const NavBar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <nav className="flex items-center justify-between py-4 px-20 bg-black">
        <AiOutlineUser  color="#fff" size={20}/>
          <button
          onClick={toggleMenu}
          className="block large:hidden text-white focus:outline-none"
        >
          {
          isOpen ?
           <AiOutlineClose/> : <AiOutlineMenu/> }
        </button>
   
        <div className=" large:flex hidden  space-x-12 mx-auto items-center justify-between">
          <a href="#" className="text-white font-light  text-xs hover:text-black hover:bg-white hover:rounded-full hover:py-2 hover:px-4 duration-300">
            Home
          </a>
          <a href="#" className="text-white font-light text-xs hover:text-black hover:bg-white hover:rounded-full hover:py-2 hover:px-4 duration-300">
            Best selling
          </a>
          <a href="#" className="text-white font-light text-xs hover:text-black hover:bg-white hover:rounded-full hover:py-2 hover:px-4 duration-300">
            Catalog
          </a>
          <a className="Logo text-white" >
            <strong>Rent</strong>Car
          </a>
          <a href="#" className="text-white font-light text-xs hover:text-black hover:bg-white hover:rounded-full hover:py-2 hover:px-4 duration-300">
            About Us
          </a>
          <a href="#" className="text-white font-light text-xs hover:text-black hover:bg-white hover:rounded-full hover:py-2 hover:px-4 duration-300">
            Join Us
          </a>
          <a href="#" className="text-white font-light text-xs hover:text-black hover:bg-white hover:rounded-full hover:py-2 hover:px-4 duration-300">
            Contact Us
          </a>
        </div>

        <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden w-4/6 md:w-auto absolute text-left rounded-md top-16 bg-white shadow-md z-50`}
      >
        <a
          href="#"
          className=" flex items-center text-black font-semibold text-xs py-2 px-4 hover:text-white hover:bg-black duration-300"
        >
          <AiOutlineHome size={20} className="mr-2" />
          Home
        </a>

        <a
          href="#"
          className=" flex items-center text-black font-semibold text-xs py-2 px-4 hover:text-white hover:bg-black duration-300"
        >
          <AiOutlineStar size={20} className="mr-2" />
          Best selling
        </a>

        <a
          href="#"
          className=" flex items-center text-black font-semibold text-xs py-2 px-4 hover:text-white hover:bg-black duration-300"
        >
          <AiOutlineBook size={20} className="mr-2" />
          Catalog
        </a>

        <a
          href="#"
          className=" flex items-center text-black font-semibold text-xs py-2 px-4 hover:text-white hover:bg-black  duration-300"
        >
          <AiOutlineInfoCircle size={20} className="mr-2" />
          About Us
        </a>

        <a
          href="#"
          className=" flex items-center text-black font-semibold text-xs py-2 px-4 hover:text-white hover:bg-black duration-300"
        >
          <AiOutlineUsergroupAdd size={20} className="mr-2" />
          Join Us
        </a>

        <a
          href="#"
          className=" flex items-center text-black font-semibold text-xs py-2 px-4 hover:text-white hover:bg-black  duration-300"
        >
          <AiOutlineMail size={20} className="mr-2" />
          Contact Us
        </a>
      </div>


      <AiOutlineShoppingCart color="#fff" size={20}/>
    </nav>
  );
};

export default NavBar;
