const bcrypt = require('bcryptjs');
// const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const generateRandomPassword = require(('../utils/generatePassword'))



const addUser = async (req, res) => {
	// Check for validation errors
	// const errors = validationResult(req);
	// if (!errors.isEmpty()) {
	// 	console.log(errors);
	// 	return res.status(400).json({ errors: errors.array() });
	// }

	const {fname, lname, _email, _role} = req.body;

	// * Sanitize the user input
	  const {first_name, last_name, email, role} = {
		first_name: xss(fname),
		last_name: xss(lname),
	    email: xss(_email),
		role: xss(_role)
	  };

	
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
			
			const users = User.find({},"user_name")
			const username_list = users.map(user => user.user_name);
			const user_name = generateUniqueUsername(first_name, last_name, username_list)
			const password = generateRandomPassword();
			
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
			
			const mailOptions = {
				from: process.env.EMAIL, // Your email address
				to: email, // User's email
				subject: 'Your Credentials',
				text: `Your username: ${user_name}\nYour password: ${password}`,
			};

			//* Send the user's credentials
			await transporter.sendMail(mailOptions);

			res.status(201).json({ message: 'User created successfully' });
		}
		catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
};

// const findUser = (email, filePath) => {
// 	let users = readDataFromFile(filePath);

// 	return users?.find(element => element.email === email)
// }

// const login = async (req, res) => {
// 	const { email, password } = req.body;
// 	let user = findUser(email, usersFilePath);

// 	// ! You should redo it using the middleware
// 	if (!user)
// 		res.render('login', { errors: [{ msg: "User Not Found! Please check your email" }] })
// 	else {
// 		try {
// 			if (await bcrypt.compare(password, user.password)) {
// 				const payload = { email: email }
// 				const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
// 				// //* How to pass the access token from the middleware ??
// 				// res.json({accessToken: accessToken})
// 				// * Set the token as a cookie with a specific name (e.g., 'token').
// 				res.cookie('authToken', accessToken,
// 					{
// 						maxAge: 3600000, // maxAge is in milliseconds (1 hour in this example)
// 						httpOnly: true, // Cookie is accessible only via HTTP/HTTPS
// 						secure: false, // Set to true in a production environment with HTTPS
// 					});
// 				res.render('home', { email: email, accessToken: accessToken })
// 			}
// 			else
// 				throw new Error("Not Allowed")
// 		} catch (error) {
// 			console.log(error.message)
// 			res.render('login', { errors: [{ msg: "Wrong email or Password" }] })
// 		}
// 	}
// }

const logout = (req, res) => {
	// Clear the 'token' cookie by setting it to an empty string and setting an expiration date in the past.
	res.cookie('authToken', '', { expires: new Date(0) });
	// ? Or you can use this method
	//    res.clearCookie('authToken');
}

module.exports = {
	addUser,
	login,
	logout
};
