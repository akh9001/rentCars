import React from 'react'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import AllUsers from "../../components/Admin/DashboardBody/AllUsers";

const AdminDashboardUsers = () => {
  return (
    <div>
    <AdminNavbar />
    <div className="w-full flex h-screen">
      <div className="flex items-start justify-between w-full ">
        <div className="w-[80px] 800px:w-[330px]">
        </div>
        <AllUsers />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardUsers