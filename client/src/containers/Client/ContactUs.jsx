import React, { useState } from 'react';
import CarImage from '../../assets/imageContact.jpg';
import { TextField, Typography, Box } from '@mui/material';
import LightNavBar from '../../components/Client/LightNavBar'
import style from '../../styles/styles'

const ContactUs = () => {

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		// Process form submission here (e.g., send data to an API)
	};

	return (
		<div className='bg-[#F2F2F2]'>
			<LightNavBar/>
			<div className="min-h-screen lg:flex items-stretch">
				<div className="flex-1 hidden lg:block">
					<img
						src={CarImage}
						alt="Contact Image"
						className="h-full w-full object-cover rounded-tr-2xl"
					/>
				</div>
				<div className="flex-1 flex items-center justify-center ">
					<Box className="p-16 bg-transparent rounded-r-lg ">
						<Typography variant="h4" className="mb-6 font-extrabold text-gray-800">
							Get in Touch
						</Typography>
						<Typography className="mb-6 text-gray-600">
							We're here to help and answer any question you might have.
						</Typography>
						<form onSubmit={handleSubmit} className="space-y-6 mt-6">
							<TextField
								fullWidth
								label="Name"
								variant="outlined"
								name="name"
								value={formData.name}
								onChange={handleChange}
							/>
							<TextField
								fullWidth
								label="Email"
								variant="outlined"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
							/>
							<TextField
								fullWidth
								label="Message"
								variant="outlined"
								name="message"
								multiline
								rows={4}
								value={formData.message}
								onChange={handleChange}
							/>
							<button className={`${style.button} px-10 mx-auto`}>
								Send Message
							</button>
						</form>
					</Box>
				</div>
			</div>
		</div>

	);
};

export default ContactUs;
