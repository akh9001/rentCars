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
import AddProduct from './components/Admin/DashboardBody/AddProduct'
import './App.css';
import DashboardCommercialTerms from "./containers/DashboardCommercialTerms";
import LandingPage from "./containers/Client/LandingPage";
import LoginCustomer from "./components/Login";
import Register from "./components/Register";
// import BestSelling from "./containers/Client/BestSelling";
import ProductPage from "./containers/Client/ProductPage";
import FAQPage from "./containers/Client/FAQPage";
import ContactUs from "./containers/Client/ContactUs";
import CarList from './components/CarList'
// import ShippingForm from './components/ShippingForm';
import CheckoutForm from './components/CheckoutForm';
import OrdersList from './components/OrdersList'
import ActivationPage from './components/verifyEmail'
function App() {
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
					path="/add-car"
					element={
						<>
							<AddProduct />
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
				{/* 
					// TODO   
					is this the right one ?

				*/}
				<Route
					path="/checkout"
					element={

						<CheckoutForm />

					}
				/>
				<Route
					path="/order-list"
					element={

						<OrdersList />

					}
				/>
				<Route
					path="/verify-account/:token"
					element={

						<ActivationPage />

					}
				/>
			</Routes>
			{/* <Footer /> */}
		</BrowserRouter>
	);
}

export default App;