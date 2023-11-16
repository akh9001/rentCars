import React from 'react';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GeneralDashboard from './containers/GeneralDashboard';
import './App.css';
import AdminNavbar from './components/Admin/AdminNavbar';
import SideBar from './components/Admin/SideBar';
import DashboardProducts from './containers/DashboardProducts';
import DashboardCategories from './containers/DashboardCategories';
import DashboardOrders from './containers/DashboardOrders';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={
          <>
            <AdminNavbar/>
            <SideBar/>
            <GeneralDashboard />
          </>
      
      } />
      <Route path="/dashboard-products" element={
          <>
            <AdminNavbar/>
            <SideBar/>
            <DashboardProducts/>
          </>
      
      } />

    <Route path="/dashboard-Categories" element={
              <>
                <AdminNavbar/>
                <SideBar/>
                <DashboardCategories/>
              </>
          
          } />

    <Route path="/dashboard-orders" element={
                  <>
                    <AdminNavbar/>
                    <SideBar/>
                    <DashboardOrders/>
                  </>
              
              } />
    <Route path="/login" element={
                    <Login/>
              } />
    <Route path="/register" element={
                    <register/>
              } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;