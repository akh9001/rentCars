import React from "react";

export default function Login() {
	return (
		<div className="flex flex-row-reverse bg-bg bg-cover bg-center h-screen items-center justify-center md:justify-start" >
			<div className="m-20 md:mr-40">
				<h1 className="text-5xl text-slate-50 font-bold mb-10">
					Rentcar
				</h1>
				<div className="flex bg-slate-50 rounded-xl p-10 ">
					<form className="flex flex-col 2xl:w-96">
						<h1 className="text-2xl font-bold mb-4 md:text-4xl">Let's Sign You In</h1>
						<p className="font-light mb-4">Welcome back, <br /> You have been missed</p>
						<h2 className="text-xl mb-4">Sign in with</h2>
						<input
							type="text"
							name="username"
							placeholder="Username"
							className="border border-gray-300 rounded-md p-2  mb-4 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
						/>
						<input
							type="password"
							name="password"
							placeholder="Password"
							className="border border-gray-300 rounded-md p-2 mb-10 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" />
						<button className="bg-black font-semibold text-white rounded-md p-3 mb-4 hover:bg-slate-800 hover:bg-opacity-50 hover:text-black">
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}