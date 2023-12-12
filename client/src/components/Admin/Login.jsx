import React, { useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loginUser } from '../../slices/Admin/auth/authSlice'



export default function Login() {
	// States
	const [isPasswordVisible, setIsPasswordVisible] = useState(0);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function togglePasswordVisibility() {
		setIsPasswordVisible((prevState) => !prevState);
	}

	// Redux states
	const {loading, error} = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLoginEvent = (e) => {
		e.preventDefault();
		let userCredentials = {
			user_name: username,
			password: password,
		};
		dispatch(loginUser(userCredentials))
		.then((res) => {
			if (res.payload) {
				setUsername("");
				setPassword("");
				navigate('/dashboard')
			}
		})
	}

	return (
		<div className="flex flex-row-reverse bg-bg_sm md:bg-bg bg-cover bg-center h-screen items-center justify-center md:justify-start" >
			<div className="m-20 md:mr-30 xl:mr-40">
				{/* <h1 className="text-5xl text-slate-50 font-bold mb-10">
					Rentcar
				</h1> */}
				<p className="text-3xl text-slate-50 mb-8">
					<strong>Rent</strong>Car
				</p>
				<div className="flex bg-white rounded-xl p-6 md:p-10 ">
					<form className="flex flex-col w-60 md:w-80 2xl:w-96" onSubmit={handleLoginEvent}>
						<h1 className="text-2xl font-bold mb-4 md:text-4xl">Let's Sign You In</h1>
						<p className="font-light mb-4">Welcome back, <br /> You have been missed</p>
						<h2 className="text-xl mb-4">Sign in with</h2>
						<input
							type="text"
							name="user_name"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							className="border border-gray-300 rounded-md p-2  mb-4 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
						/>
						<div className='relative mb-20'>
							<input
								type={isPasswordVisible ? "text" : "password"}
								name="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="absolute border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
							/>
							<span
								className="absolute right-0 flex items-center px-3 py-3 text-black cursor-pointer"
								onClick={togglePasswordVisibility}
							>
								{isPasswordVisible ? (
									<FaRegEyeSlash />
								) : (
									<FaRegEye />
								)}
							</span>
						</div>
						<button className="bg-black font-semibold text-white rounded-md p-3 mb-4 hover:bg-stone-950 hover:bg-opacity-90 ">
							{loading ? "Loading..." : "Sign In"}
						</button>
						{error && (
							<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded " role="alert">
							<span>{error} !</span>
							
						</div>)}
					</form>
				</div>
			</div>
		</div>
	);
}