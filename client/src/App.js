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
import CarList from './components/CarList'
import CheckoutForm from './components/CheckoutForm';
import ShippingForm from './components/ShippingForm';
import ProductCard from './components/ProductCard';
// import OrdersList from './components/OrdersList'
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<LandingPage />
						</>
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
							{/* <Footer /> */}
						</>
					}
				/>
				<Route
					path="/add-car"
					element={
						<>
							<AddProduct />
							{/* <Footer /> */}
						</>
					}
				/>
				<Route
					path="/login"
					element={
						<>
							<LoginCustomer />
							{/* <Footer /> */}
						</>
					}
				/>
				<Route
					path="/register"
					element={
						<>
							<Register />
							{/* <Footer /> */}
						</>
					}
				/>

			
			
			<Route
          path="/car-list"
          element={
			
			  <CarList/>
              
          }
       		 />
		<Route
          path="/shipping"
          element={
			<>
		  <ShippingForm/>
		  <CheckoutForm/>
		  <ProductCard/>
		  </>
		}
		   
       		 />
			</Routes>
			 
			<Footer />
		</BrowserRouter>
	);
}

export default App;