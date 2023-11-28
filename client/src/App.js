import { BrowserRouter, Routes, Route } from "react-router-dom";
import GeneralDashboard from './containers/GeneralDashboard';
import DashboardProducts from './containers/DashboardProducts';
import DashboardCategories from './containers/DashboardCategories';
import DashboardOrders from './containers/DashboardOrders';
import DashboardSettings from './containers/DashboardSettings';
import AdminNavbar from './components/Admin/AdminNavbar';
import SideBar from './components/Admin/SideBar';
import { Footer } from './components/Footer';
import styles from './styles/styles';
import './App.css';
import DashboardCommercialTerms from "./containers/DashboardCommercialTerms";
import LandingPage from "./containers/Client/LandingPage";
import ProductPage from "./containers/Client/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route
          path="/"
          element={
              <LandingPage/>
          }
        />

        <Route
          path="/dashboard"
          element={
            <>
              <AdminNavbar />
              <SideBar />
              <GeneralDashboard />
            </>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <>
              <AdminNavbar />
              <SideBar />
              <DashboardProducts />
            </>
          }
        />

        <Route
          path="/dashboard-categories"
          element={
            <>
              <AdminNavbar />
              <SideBar />
              <DashboardCategories />
            </>
          }
        />

        <Route
          path="/dashboard-orders"
          element={
            <>
              <AdminNavbar />
              <SideBar />
              <DashboardOrders />
            </>
          }
        />

        <Route
          path="/seller-settings"
          element={
            <>
            <AdminNavbar />
            <SideBar />
            <DashboardSettings/>
            </>
            }
        />

        <Route
          path="/Commercial-terms"
          element={
            <>
            <AdminNavbar />
            <SideBar />
            <DashboardCommercialTerms/>
            </>
            }
        />

        <Route
          path="/product"
          element={
               <ProductPage/>
            }
        />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
