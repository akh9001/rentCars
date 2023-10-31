const bcrypt = require('bcryptjs');
// const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const generateRandomPassword = require(('../utils/generatePassword'))
const generateUniqueUsername = require('../utils/generateUsername')
const transporter = require('../utils/mailer')
const { ObjectId } = require('mongodb');

const addUser = async (req, res) => {
	const { first_name, last_name, email, role } = req.body;
	// TODO Data validation
	// TODO Sanitize the user input
	// * Check if the user already exist
	const userExist = await User.findOne({email: email});

	if (userExist)
		res.status(409).json({ message: "Email address is already in use." });
	else {
		try {
			const users = await User.find({},"user_name")
			const username_list = users?.map(user => user.user_name);
			const user_name = generateUniqueUsername(first_name, last_name, username_list)
			const password = generateRandomPassword(10);
			console.log("password", password);
			//* Create a new user and save it to the database
			const newUser = new User({
				user_name: user_name,
				first_name,
				last_name,
				email,
				password: password,
				role,
				active:true
			});
			await newUser.save();

			//* Send the user's credentials to the user's email address
			const mailOptions = {
				from: process.env.EMAIL, // Your email address
				to: email, // User's email
				subject: 'Your Credentials',
				text: `Your username: ${user_name} \n Your password: ${password}`,
			};
			await transporter.sendMail(mailOptions);
			// * Send the response
			res.status(201).json({ message: 'User created successfully' });
		}
		catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
};

const login = async (req, res) => {
	try
	{
		const {user_name, password} = req.body;
	
		// * Check if the user already exist
		const userExist = await User.findOne({ user_name: user_name }).select('+password');
		if (!userExist || !userExist.comparePassword(password))
			res.status(401).json({
				message: "invalid credentials" });
		else{
			id = userExist._id;
			user = {
				id: userExist._id,
				user_name : userExist.user_name,
				role: userExist.role
			};
			const accessToken = jwt.sign(user, process.env.JWT_TOKEN_SECRET,{ expiresIn: '15m' })
			const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET);
			userExist.last_login = Date.now();
			await userExist.save();
			res.status(200).json({
				access_token: accessToken,
				token_type: "Bearer Token",
				expires_in: "15min",
				refresh_token: refreshToken,
				message: "login success",
				user : userExist
			})
		}
	}
	catch(error)
	{
		console.error(error.message)
		res.status(500).json({message: error.message})
	}
}

const generateAccessToken = async (user) =>{
	return jwt.sign(user, process.env.JWT_TOKEN_SECRET, { expiresIn: '15m' });
}

const generateRefreshToken = async (user) => {
	return jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET);
}

const deleteUser = async (req, res) => {
	try{
		const deletedUser = await User.findOneAndDelete({ _id: new ObjectId(req.params.id) });

		if (deletedUser) {
			res.status(200).json({ message: 'User deleted successfully' })
		}
		else {
			res.status(404).json({ message: 'User not found' })
		}
	}
	catch (error)
	{
		console.log("Error :", error.message)
		res.status(500);
	}
}

const getAllUsers = async (req, res) => {
	const page = parseInt(req.query.page) || 1; // Get the page number from query params
	const perPage = 10; // Number of users per page
	// Sort direction based on the 'sort' query parameter (default is ascending)
	const sortDirection = req.query.sort === 'DESC' ? -1 : 1;

	try {
		const users = await User.find()
			.sort({ user_name: sortDirection, first_name: sortDirection, last_name: sortDirection })
			.skip((page - 1) * perPage)
			.limit(perPage);
		// console.log(users)
		res.status(200).json({ data: users });
	} catch (error) {
		res.status(500).json({ message: 'Error while fetching users' });
	}
}

const getUSerById = async (req, res) => {
	const userId = req.params.id;
	try {
		const user = await User.findById(userId);

		if (user) {
			res.status(200).json({ data: user });
		} else {
			res.status(404).json({ message: 'User not found with the provided ID' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Error while fetching the user' });
	}
};

const search = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = 10;
	const startIndex = (page - 1) * limit;

	// * Get the search query from the 'query' query parameter
	const searchQuery = req.query.query || '';

	// * Sort direction based on the 'sort' query parameter (default is ascending)
	const sortDirection = req.query.sort === 'DESC' ? -1 : 1;

	try {
		const users = await User.find({
			// Define your search criteria based on the 'searchQuery' parameter
			$or: [
				{ user_name: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive username search
				// Add more search criteria as needed
			],
		})
		.sort({ user_name: sortDirection, first_name: sortDirection, last_name: sortDirection })
		.skip(startIndex)
		.limit(limit);
		res.status(200).json({ data: users });
	} catch (error) {
		console.error('Error while fetching users:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const updateUser = async (req, res) => {
		const userId = req.params.id;
		const updatedData = req.body;

		try {
			// * Check if the user with the specified ID exists
			const user = await User.findById(userId);

			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}
			
			// * Check for username and email uniqueness
			if (updatedData.user_name)
			{
				const existingUserWithUsername = await User.findOne({ username: updatedData.user_name });
				if (existingUserWithUsername && existingUserWithUsername.id !== userId)
					return res.status(400).json({ message: 'Username is already in use' });
			}
			if (updatedData.email)
			{
				const existingUserWithEmail = await User.findOne({ email: updatedData.email });
				if ( existingUserWithEmail && existingUserWithEmail.id !== userId)
					return res.status(400).json({ message: 'Email is already in use' });
			}

			// * Update the user data and lastUpdate date
			user.user_name = updatedData.user_name ? updatedData.user_name : user.user_name;
			user.email = updatedData.email ? updatedData.email : user.email;
			user.role = updatedData.role ? updatedData.role : user.role;
			user.active = updatedData.active !== undefined ? updatedData.active : user.active;
			user.first_name = updatedData.first_name ? updatedData.first_name : user.first_name;
			user.last_name = updatedData.last_name ? updatedData.last_name : user.last_name;
			user.last_update = new Date(); // Update lastUpdate date
			try {
				const savedUser = await user.save();
				res.status(200).json({ message: savedUser });
			}
			catch (error) {
				console.error('Error while updating user:', error);
				res.status(500).json({ message: error.message});
			}
		} catch (error) {
			console.error('Error while updating user:', error);
			res.status(500).json({ message: 'Internal server error' });
		}
}

module.exports = {
	addUser,
	login,
	deleteUser,
	getAllUsers,
	getUSerById,
	updateUser,
	search
};
