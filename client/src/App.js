import React, { useEffect, useState } from "react";
import Login from './components/Admin/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GeneralDashboard from './containers/GeneralDashboard';
import DashboardProducts from './containers/DashboardProducts';
import DashboardCategories from './containers/DashboardCategories';
import DashboardOrders from './containers/DashboardOrders';
import DashboardSettings from './containers/DashboardSettings';
import AdminNavbar from './components/Admin/AdminNavbar';
import SideBar from './components/Admin/SideBar';
import Footer from './components/Footer';
import './App.css';
import DashboardCommercialTerms from "./containers/DashboardCommercialTerms";
import LandingPage from "./containers/Client/LandingPage";
import DashboardAddProduct from "./containers/DashboardAddProduct"
import LoginCustomer from "./components/Login";
import Register from "./components/Register";
import BestSelling from "./containers/Client/BestSelling";
import ProductPage from "./containers/Client/ProductPage";
import FAQPage from "./containers/Client/FAQPage";
import ContactUs from "./containers/Client/ContactUs";
import CarList from './components/CarList'
import ShippingForm from './components/ShippingForm';
import CheckoutForm from './components/CheckoutForm';
import ProfilePage from './containers/Client/ProfilePage';
import AdminDashboardUsers from './containers/Admin/AdminDashboardUsers';
import CheckoutPage from './containers/Client/CheckOutPage';
import PaymentPage from './containers/Client/PaymentPage'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import trackOrder from './components/Client/Profile/TrackOrder'

function App() {
	const [stripeApikey, setStripeApiKey] = useState(true);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<LandingPage />
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
							<DashboardSettings />
						</>
					}
				/>

				<Route
					path="/Commercial-terms"
					element={
						<>
							<AdminNavbar />
							<SideBar />
							<DashboardCommercialTerms />
						</>
					}
				/>
				<Route
					path="/admin-login"
					element={
						<>
							<Login />
						</>
					}
				/>
				<Route
					path="/dashboard-products/add-car"
					element={
						<>
							<DashboardAddProduct />
						</>
					}
				/>
				<Route
					path="/login"
					element={
						<>
							<LoginCustomer />
						</>
					}
				/>
				<Route
					path="/register"
					element={
						<>
							<Register />
						</>
					}
				/>

				<Route
					path="/product"
					element={
						<ProductPage />
					}
				/>

				{/* <Route
          path="/best-selling"
          element={
              <BestSelling/>
            }
        /> */}

				{/* <Route
          path="/catalog"
          element={
              <Catalog/>
            }
        /> */}

				<Route
					path="/faq"
					element={
						<FAQPage />
					}
				/>

				<Route
					path="/contact-us"
					element={
						<ContactUs />
					}
				/>

				<Route
					path="/car-list"
					element={

						<CarList />

					}
				/>
				 <Route
					path="/profile"
					element={
						<ProfilePage/>
					}
				/>
				  <Route
					path="/Admin-Dashboard-Users"
					element={
						<AdminDashboardUsers/>
					}
				/> 
				 <Route
					path="/checkout"
					element={
						<CheckoutPage/>
					}
				/> 
				
			</Routes>
			{stripeApikey && (
					<Elements stripe={loadStripe(stripeApikey)}>
					<Routes>
						<Route
						path="/payment"
						element={
							<PaymentPage />
						}
						/>
					</Routes>
					</Elements>
				)}
			<Footer/>
		</BrowserRouter>
	);
}

export default App;