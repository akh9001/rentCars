const bcrypt = require('bcryptjs');
// const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const User = require('../models/User')



const addUser = async (req, res) => {
	// Check for validation errors
	// const errors = validationResult(req);
	// if (!errors.isEmpty()) {
	// 	console.log(errors);
	// 	return res.status(400).json({ errors: errors.array() });
	// }

	const { user_name, first_name, last_name, email, password, role} = req.body;

	// Sanitize the user input
	  const sanitizedData = {
		user_name: xss(user_name),
		first_name: xss(first_name),
		last_name: xss(last_name),
	    email: xss(email),
	    password: xss(password),
	  };

	//! I should generate a username and a password.
	
	//! Check if the user who s making the req is an admin
	// ....

	// Check if the user already exist
	const userExist = await User.findOne({email: email});

	// res.render('register', { errors: [{ msg: "User already exist." }] });
	if (userExist)
		res.status(409).json({ message: "Email address is already in use." }); //! check for a better way to send the error msg
	else {
		try {
			
			// {
			// 	"status": 201,
			// 		"message": "user created successfully"
			// }

			const mailOptions = {
				from: process.env.EMAIL, // Your email address
				to: email, // User's email
				subject: 'Your Credentials',
				text: `Your username: ${user_name}\nYour password: ${password}`,
			};

			try {
				const newUser = new User({
					user_name,
					first_name,
					last_name,
					email,
					password,
					role
				});

				await newUser.save();

				res.status(201).json({ message: 'User registered successfully' });
				// Send the user's credentials
				await transporter.sendMail(mailOptions);
				res.status(200).json({ message: 'Email sent successfully' });
			} catch (error) {
				console.error(error);
				res.status(500).json({ error: 'Email sending failed' });
			}
		}
		catch (error) {
			res.status(400).json({ message : error.message });
		}c
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
