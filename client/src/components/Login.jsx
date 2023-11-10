import React from "react";
import imageUrl from "../assets/login_background.jpg";



export default function Login() {
	return (
		<div className="relative flex">
			<div className="bg-center w-full h-screen transform scale-x-[-1]" style={{backgroundImage: `url(${imageUrl})`}}></div>
			<div className="absolute z-10 right-20 items-start flex flex-col self-center">
				<div>
					<h1 className="text-5xl text-slate-50 font-bold mb-10">
						Rentcar
					</h1>
				</div>
				<div className="basis-1/2 bg-slate-50 p-10 rounded-xl">
					<form className="flex flex-col  ">
							<h1 className="text-4xl font-bold mb-4">Let's Sign You In</h1>
							<h2 className="font-light mb-4">Welcome back, <br/> You have been missed</h2>
						<h2 className="text-xl mb-4">Sign in with</h2>
							<input
								type="text"
								name="username"
								placeholder="Username"
							className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 h-[50px] w-[400px]"
							/>
							<input
								type="password"
								name="password"
								placeholder="Password"
							className="border border-gray-300 rounded-md p-2 mb-10 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 h-[50px]"/>
							<button className="bg-black font-semibold text-white rounded-md p-3 mb-4">
								Login
							</button>
						</form>
				</div>
			</div>
		</div>
	);
}