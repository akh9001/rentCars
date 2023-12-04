import React, { useState } from 'react';
import { Avatar, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { CiShoppingCart, CiSettings } from "react-icons/ci";
import { ExpandLess, ExpandMore, Person, Language, Payment, Notifications, Lock, HelpOutline } from '@mui/icons-material';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const UserProfileCard = () => {
    const [openProfile, setOpenProfile] = useState(false);
    
    return (
      <div className="flex items-center bg-white rounded-lg shadow p-4">
        <Avatar src="path_to_kate_russell_image.jpg" alt="Kate Russell" className="mr-4" />
            <div className="flex-grow">
                <p className="text-sm font-semibold text-gray-700">Kate Russell</p>
                <p className="text-xs text-gray-500">Car Shop</p>
            </div>
       
       </div> 
    
    );
  };


const Sidebar = () => {
  const [openSettings, setOpenSettings] = useState(false);

  const handleClickSettings = () => {
    setOpenSettings(!openSettings);
  };

  return (
    <div className="flex flex-col h- p-4 bg-white border-r rounded-xl shadow-lg top-16 absolute z-50 w-64 dark:bg-gray-800 dark:border-gray-600">
      <UserProfileCard/>

      <nav className="mt-6 flex-1 ">
        <List>
          <ListItem button>
            <ListItemIcon>
              <CiShoppingCart size={30} className='text-black'/>
            </ListItemIcon>
            <ListItemText primary="Shop" />
          </ListItem>
          <ListItem button onClick={handleClickSettings}>
            <ListItemIcon>
               <CiSettings size={30} className='text-black' />
            </ListItemIcon>
            <ListItemText primary="Settings" />
            {openSettings ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSettings} timeout="auto" unmountOnExit className='ml-2 border-l-2 border-zinc-200'>
            <List component="div" disablePadding className='ml-8'>
              <ListItem button className="pl-8">
                <ListItemIcon>
                  <Person className="text-gray-600  " />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
              </ListItem>
              <ListItem button className="pl-8">
                <ListItemIcon>
                  <Language className="text-gray-600 " />
                </ListItemIcon>
                <ListItemText primary="Language" />
              </ListItem>
              <ListItem button className="pl-8">
                <ListItemIcon>
                  <Payment className="text-gray-600 " />
                </ListItemIcon>
                <ListItemText primary="Payments" />
              </ListItem>
              <ListItem button className="pl-8">
                <ListItemIcon>
                  <Notifications className="text-gray-600 " />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>
              <ListItem button className="pl-8">
                <ListItemIcon>
                  <Lock className="text-gray-600 " />
                </ListItemIcon>
                <ListItemText primary="Password" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button>
            <ListItemIcon>
              <HelpOutline className="text-gray-600 " />
            </ListItemIcon>
            <ListItemText primary="Help Center" />
          </ListItem>
        </List>
      </nav>
    </div>
  );
};

export default Sidebar;
