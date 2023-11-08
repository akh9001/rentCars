import React, { useState } from "react";
import {
  CiGrid42,
  CiBoxList,
  CiBookmark,
  CiBoxes,
  CiReceipt,
  CiBullhorn,
} from "react-icons/ci";

import { Link } from "react-router-dom";


import styles from "../../styles/styles";

export default function SideBar(props) {
  
  const sidebarVisible= props.sidebarVisible;
  const toggleSidebar = props.toggleSidebar;

  return (
  <div className={`fixed grid grid-cols-5 h-full sm:grid-cols-5 ${
    sidebarVisible ? "w-full" : "w-0"
  }`}>
    <div
      className='large:col-span-1 col-span-2 bg-white shadow-md pt-10 border-r border-gray-300 sidebar'
     
    >
       
      {sidebarVisible && (
        <>
          <ul className="mt-8">
            
            <Link to="/dashboard"className={styles.AdminSideList}>
              <CiGrid42 size={25} className="mr-4" /> Dashboard
            </Link>
            <Link to="/dashboard-products"  className={styles.AdminSideList}>
              <CiBoxList size={25} className="mr-4" /> Product
            </Link>
            <Link to="/dashboard-categories" className={styles.AdminSideList}>
              <CiBookmark size={25} className="mr-4" /> Categories
            </Link>
            <Link to="/dashboard-orders" className={styles.AdminSideList}>
              <CiBoxes size={25} className="mr-4" /> Orders
            </Link>
            <Link className={styles.AdminSideList}>
              <CiReceipt size={25} className="mr-4" /> Coupons
            </Link>
          </ul>
          <ul className="mt-8 border-t border-gray-300 opacity-50">
            <Link className={styles.AdminSideList}>
              <CiBullhorn size={25} className="mr-4" /> FeedBack
            </Link>
          </ul>
        </>
      )}
    
      </div>
      <div className="large:col-span-4 col-span-1 bg-black opacity-40" onClick={toggleSidebar}></div>
    </div>
  );
}
