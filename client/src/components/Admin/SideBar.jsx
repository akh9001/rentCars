import React from "react";
import {
  CiGrid42,
  CiBoxList,
  CiBookmark,
  CiBoxes,
  CiReceipt,
  CiBullhorn,
} from "react-icons/ci";

import { Link } from "react-router-dom";
import { MdOutlineAdminPanelSettings } from "react-icons/md"
import styles from "../../styles/styles";

export default function SideBar(props) {
  
  const sidebarVisible= props.sidebarVisible;
  const toggleSidebar = props.toggleSidebar;
  const isAdmin = true;

  return (
  <div className={`fixed grid large:grid-cols-5 h-full small:grid-cols-4 ${
    sidebarVisible ? "w-full" : "w-0"
  }`}>
    <div
      className='small:col-span-2 large:col-span-1 bg-white shadow-md pt-10 border-r border-gray-300 sidebar'
     
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
            {isAdmin &&

                <>
                 <Link to="/Admin-Dashboard-Users" className={styles.AdminSideList}>
                   <MdOutlineAdminPanelSettings size={25} className="mr-4" /> All Users
                 </Link>
                </>

            }
          </ul>
          <ul className="mt-8 border-t border-gray-300 opacity-50">
            <Link className={styles.AdminSideList}>
              <react-icons size={25} className="mr-4" /> FeedBack
            </Link>
          </ul>
        </>
      )}
    
      </div>
      <div className="large:col-span-4 small:col-span-2 bg-black opacity-40" onClick={toggleSidebar}></div>
    </div>
  );
}
