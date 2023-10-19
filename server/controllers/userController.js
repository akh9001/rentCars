const bcrypt = require('bcryptjs');
// const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const generateRandomPassword = require(('../utils/generatePassword'))
const generateUniqueUsername = require('../utils/generateUsername')
const transporter = require('../utils/mailer')
const { ObjectId } = require('mongodb');

const addUser = async (req, res) => {
	// Check for validation errors
	// const errors = validationResult(req);
	// if (!errors.isEmpty()) {
	// 	console.log(errors);
	// 	return res.status(400).json({ errors: errors.array() });
	// }

	const { first_name, last_name, email, role } = req.body;

	// * Sanitize the user input
	//   const {first_name, last_name, email, role} = {
	// 	first_name: xss(fname),
	// 	last_name: xss(lname),
	//     email: xss(_email),
	// 	role: xss(_role)
	//   };

	
	//! Check if the user who s making the req is an admin
	// ....
	if (false)
		res.status(403).json({ "message": "you don't have enough privilege" })

	// * Check if the user already exist
	const userExist = await User.findOne({email: email});

	if (userExist)
		res.status(409).json({ message: "Email address is already in use." }); //! check for a better way to send the error msg
	else {
		try {
			
			const users = await User.find({},"user_name")
			//! then you should check if the instruction bellow is necessary or not.
			const username_list = users?.map(user => user.user_name);
			const user_name = generateUniqueUsername(first_name, last_name, username_list)
			const password = generateRandomPassword(10);
			// console.log("password", password)
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
			console.log("new user", newUser)
			
			const mailOptions = {
				from: process.env.EMAIL, // Your email address
				to: email, // User's email
				subject: 'Your Credentials',
				text: `Your username: ${user_name} \n Your password: ${password}`,
			};
			// console.log("mailoption", mailOptions)
			//* Send the user's credentials
			await transporter.sendMail(mailOptions);

			res.status(201).json({ message: 'User created successfully' });
		}
		catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
};

const login = async (req, res) => {
	// * Authentication :

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
		res.status(500).json({message: error.message})
	}
}

const generateAccessToken = async (user) =>{
	return jwt.sign(user, process.env.JWT_TOKEN_SECRET, { expiresIn: '15m' });
}

const generateRefreshToken = async (user) => {
	return jwt.sign(user, process.env.JWT_REFRESH_TOKEN_SECRET);
}

const refreshToken = async (req, res) => {

	const refreshToken = req.body.token;
	if (!refreshToken) return res.status(401);

	try {

		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
			if (err) return res.status(403);
			const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
			res.json({ access_token: accessToken });
		});
	} catch (err) {
		// Handle any errors that might occur during the verification process
		console.error('Error during token verification:', err);
		res.status(500); // Or use a different HTTP status code as needed
	}
}

const deleteUser = async (req, res) => {
	try{
		//! only admin can delete a user
			// res.status(403).json({ message: 'you don\'t have enough privilege' })
		
		const deletedUser = await User.findOneAndDelete({ _id: new ObjectId(req.params.id) });

		if (deletedUser) {
			// console.log('User deleted:', deletedUser);
			res.status(200).json({ message: 'User deleted successfully' })
		}
		else {
			// console.log('User not found with the provided ID.');
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
	try{
		const users = await User.find({});
		res.status(400).json({data: users});
	}
	catch(error)
	{
		res.status(500).json({message: error.message})
	}
}

module.exports = {
	addUser,
	login,
	refreshToken,
	deleteUser,
	getAllUsers
};
