import React, { useState, useEffect, useRef } from 'react';
import { BiSolidBell, BiLogOut } from 'react-icons/bi';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { IoIosHelpBuoy } from 'react-icons/io';
import { LuSettings } from 'react-icons/lu';
import { AiOutlineCloseSquare, AiOutlineMenu } from 'react-icons/ai';
import profil from '../../Assets/profile.jpg';
import SideBar from './SideBar';
import { Link } from 'react-router-dom';

export default function AdminNavbar() {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const profileMenuRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  const toggleProfileMenu = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  const toggleNotification = () => {
    setIsNotificationVisible(!isNotificationVisible);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleDocumentClick = (e) => {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(e.target)
    ) {
      setIsProfileVisible(false);
    }

    if (
      notificationRef.current &&
      !notificationRef.current.contains(e.target)
    ) {
      setIsNotificationVisible(false);
    }
  };

  return (
    <nav className="fixed bg-white shadow-sm z-40 border-b border-gray-300 w-full flex justify-between">
      <div className="flex">
        <button onClick={toggleSidebar} className="ml-4 z-50 p-4 cursor-pointer">
          {sidebarVisible ? (
            <AiOutlineCloseSquare size={25} color='#8c8c8c' className='relative left-48' />
          ) : (
            <AiOutlineMenu size={25}  />
          )}
        </button>
        <Link to="/dashboard">
          <p className="Logo" to="/dashboard">
        {sidebarVisible ? (<span className='relative right-12 small:right-14 z-50'><strong>Rent</strong>Car</span>
           ): (<span><strong>Rent</strong>Car</span>)
        }
        </p>
        </Link>
      </div>
      <ul className="flex items-center mx-8">
        <li className="relative cursor-pointer" onClick={toggleNotification}>
          <BiSolidBell size={25} />
          <span className="bg-red-500 border-white border-2 p-1 absolute bottom-4 left-3 rounded-full"></span>
        </li>
        <li
          className="rounded-full hover:shadow-md bg-gray-300 w-[40px] h-[40px] ml-4 cursor-pointer"
          onClick={toggleProfileMenu}
        >
          <img
            src={profil}
            alt="profil"
            className="rounded-full w-full h-full object-cover"
          />
        </li>
      </ul>

      {isProfileVisible && (
        <div
          className="bg-white absolute right-8 top-16 z-10 py-6 px-5 rounded-md shadow-md"
          ref={profileMenuRef}
        >
          <ul>
            <li className="flex items-center mb-4 px-4 rounded-sm">
              <img
                src={profil}
                alt="profil"
                className="rounded-full w-[40px] h-[40px] object-cover"
              />
              <div className="ml-2 text-sm">
                <h4 className="font-bold">Ayoub ES</h4>
                <p className="text-gray-500">ayoub@gmail.com</p>
              </div>
            </li>
            <Link to="/Commercial-terms" className="flex items-center text-sm my-2 py-1 px-4 rounded-md cursor-pointer hover:bg-zinc-100">
              <HiOutlineNewspaper size={20} color="#3E3E3E" className="mr-2" />{' '}
              Commercial terms
            </Link>
            <Link to="/seller-settings" className="flex items-center text-sm my-2 py-1 px-4 rounded-md cursor-pointer hover:bg-zinc-100">
              <LuSettings size={20} color="#3E3E3E" className="mr-2" />Settings
            </Link>
            <li className="flex items-center text-sm my-2 py-1 px-4 rounded-md cursor-pointer hover-bg-zinc-100">
              <IoIosHelpBuoy size={20} color="#3E3E3E" className="mr-2" />Help
            </li>
            <hr></hr>
            <li
              className="flex items-center text-sm my-2 px-4 rounded-md cursor-pointer py-1 hover:bg-zinc-100"
              onClick={toggleProfileMenu}
            >
              <BiLogOut size={20} color="#3E3E3E" className="mr-2" /> Log out
            </li>
          </ul>
        </div>
      )}
      {isNotificationVisible && (
        <div
          className="bg-white absolute right-8 top-16 z-10 py-2 px-4 rounded-md shadow-md"
          ref={notificationRef}
        >
          <ul>
            <li className="flex items-center text-sm my-2 px-4 rounded-md cursor-pointer py-1 hover-bg-zinc-100">
              No Notification for Now!
            </li>
          </ul>
        </div>
      )}
      <SideBar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
    </nav>
  );
}
