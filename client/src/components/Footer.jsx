import React from 'react';
import { SiInstagram } from "react-icons/si";
import { TbBrandYoutube } from "react-icons/tb";
import { BsTwitterX } from "react-icons/bs";




const Footer = () => {
	return (
		<footer className="fixed bottom-0  left-0 z-20 w-full flex justify-between items-center p-4 bg-stone-950 opacity-100 text-white">
			<p className="text-3xl text-slate-50 md:ml-20 mx-10">
				<strong>Rent</strong>Car
			</p>
			<div className="flex flex-row items-center md:mr-40 mx-10">
				<TbBrandYoutube className='m-2 w-5 h-6' />
				<BsTwitterX className='m-2' />
				<SiInstagram className='m-2' />
			</div>
		</footer>
	);
}

export default Footer;