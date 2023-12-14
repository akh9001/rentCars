import React, { useEffect, useState } from "react";
import Login from './components/Admin/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
// import ShippingForm from './components/ShippingForm';
import CheckoutForm from './components/CheckoutForm';
import OrdersList from './components/OrdersList'
import ActivationPage from './components/verifyEmail'
import ProfilePage from './containers/Client/ProfilePage';
import AdminDashboardUsers from './containers/Admin/AdminDashboardUsers';
import CheckOutPage from './containers/Client/CheckOutPage';
import PaymentPage from './containers/Client/PaymentPage'
 import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios"
import AdminAddUser from "./containers/Admin/AdminAddUser";
import BookingPage from "./containers/Client/BookingPage";
// import trackOrder from './components/Client/Profile/TrackOrder'


const isAuthenticated = true;
const userRole = 'customer';


const PrivateRoute  = ({ roles, children }) => {
	return isAuthenticated && roles.includes(userRole) ? children : <Navigate to="/login" />;
};

const Dashboard = () => 
{
	return (
		<>
			<AdminNavbar />
			<SideBar />
			<GeneralDashboard />
		</>
	);
}
	
const DashboardProductsContainer = () =>
{
	return (
		<>
			<AdminNavbar />
			<SideBar />
			<DashboardProducts />
		</>
	);
}
	
const DashboardCategoriesContainer = () =>
{
	return (
		<>
			<AdminNavbar />
			<SideBar />
			<DashboardCategories />
		</>
	);
}
	
const DashboardOrdersContainer = () =>
{
	return (
		<>
			<AdminNavbar />
			<SideBar />
			<DashboardOrders />
		</>
	);
}
	
const DashboardSettingsContainer = () =>
{
	return (
		<>
			<AdminNavbar />
			<SideBar />
			<DashboardSettings />
		</>
	);
}
	
const DashboardCommercialTermsContainer = () =>
{
	return (
		<>
			<AdminNavbar />
			<SideBar />
			<DashboardCommercialTerms />
		</>
	);
}

const AdminAddUserContainer = () =>
{
	return (
		<>
			<AdminNavbar />
			<SideBar />
			<AdminAddUser />
		</>
	);
}


const App = () => {

	const [stripeApikey, setStripeApiKey] = useState("");

	async function getStripeApikey() {
		try {
		  const { data } = await axios.get("http://localhost:3001/payment/stripeapikey");
		  console.log('data:',data.stripeApikey)
		  setStripeApiKey(data.stripeApikey);
		} catch (error) {
		  console.error("Error fetching Stripe API key:", error);
		}
	  }
	
	useEffect(() => {
		getStripeApikey();
	  }, []);
	

	return(
		<BrowserRouter>
		<Routes>

			{/* Public routes */}
			<Route path="/" element={<LandingPage />} />
			<Route path="/admin-login" element={<Login />} />
			<Route path="/login" element={<LoginCustomer />} />
			<Route path="/register" element={<Register />} />
			<Route path="/product" element={<ProductPage />} />
			<Route path="/faq" element={<FAQPage />} />
			<Route path="/contact-us" element={<ContactUs />} />
			<Route path="/car-list" element={<CarList />} />
			<Route path="/verify-account/:token" element={<ActivationPage />} />
			<Route path="/best-selling" element={<BestSelling />} />
			{/* <Route path="/catalog" element={<Catalog />} /> */}

			{/* Admin routes */}
			<Route
				path="/dashboard"
				element={<PrivateRoute roles={['admin']} > <Dashboard /> </PrivateRoute>  }
			/>
			<Route
				path="/dashboard-products"
				element={<PrivateRoute roles={['admin']} ><DashboardProductsContainer /> </PrivateRoute>  }
			/>
			<Route
				path="/dashboard-categories"
				element={<PrivateRoute roles={['admin']} ><DashboardCategoriesContainer /> </PrivateRoute>  }
			/>
			<Route
				path="/dashboard-orders"
				element={<PrivateRoute roles={['admin']} ><DashboardOrdersContainer /> </PrivateRoute>  }
			/>
			<Route
				path="/admin-settings"
				element={<PrivateRoute roles={['admin']} ><DashboardSettingsContainer /> </PrivateRoute>  }
			/>
			<Route
				path="/Commercial-terms"
				element={<PrivateRoute roles={['admin']} ><DashboardCommercialTermsContainer /> </PrivateRoute>  }
			/>
			<Route
				path="/dashboard-products/add-car"
				element={<PrivateRoute roles={['admin']} ><DashboardAddProduct /> </PrivateRoute>  }
			/>
			<Route
				path="/Admin-Dashboard-Users"
				element={<PrivateRoute roles={['admin']} ><AdminDashboardUsers /> </PrivateRoute>  }
			/>
			<Route
				path="/Admin-Dashboard-Users/Admin-add-user"
				element={<PrivateRoute roles={['admin']}><AdminAddUserContainer /> </PrivateRoute>  }
			/>


			{/* Customer routes */}
			<Route
				path="/profile"
				element={<ProfilePage /> }
			/>
			{/* <Route
				path="/checkout"
				element={<PrivateRoute roles={['customer']}>< CheckoutPage /> </PrivateRoute>  }
			/> */}
			<Route
				path="/order-list"
				element={<PrivateRoute roles={['customer']}><OrdersList /> </PrivateRoute>  }
			/>

			<Route
				path="booking"
				element={<BookingPage/>}
			/>

			 <Route
				path="/checkout"
				element={  
					<Elements stripe={loadStripe(stripeApikey)}>
					 <CheckOutPage/>
					 </Elements>
				}
			/> 
			


		 {stripeApikey && (
          <Route
            path="/payment"
            element={
				<Elements stripe={loadStripe(stripeApikey)}>
                <PaymentPage />
             	</Elements>
            }
          />
        )}
			</Routes>

		<Footer />
	</BrowserRouter>

)};

export default App;