const jwt = require('jsonwebtoken');
require("dotenv").config();

// * function to protect routes that require authentication with JWT:

const authentication = (req, res, next) =>{
	// console.log(req.headers);
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token)
		return res.status(401).json({ "message": "invalid credentials" })
	// jtw 
	jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
		if (err) return res.status(403).json({ message: 'Forbidden'});
		req.user = user;
		next();
	});
}

const refreshToken = async (req, res) => {

	const refreshToken = req.body.token;
	if (!refreshToken) return res.status(401);

	try {

		jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, (err, user) => {
			if (err) return res.status(403);
			const accessToken = jwt.sign(user, process.env.JWT_TOKEN_SECRET, { expiresIn: '15h' });
			res.status(200).json({ access_token: accessToken });
		});
	} catch (err) {
		// Handle any errors that might occur during the verification process
		console.error('Error during token verification:', err);
		res.status(500); // Or use a different HTTP status code as needed
	}
}

// * middleware function to protect routes that require authorization with JWT:

const checkUserRole = (requiredRoles) => {
	return (req, res, next) => {
		// Check if the user is authenticated and has a role (you need to define this logic)
		const user = req.user; // Assuming you have user information in req.user

		if (!user || !user.role) {
			return res.status(403).json({ message: "Access denied. User has no role." });
		}

		// Check if the user's role matches one of the required roles
		if (!requiredRoles.includes(user.role)) {
			return res.status(403).json({ message: "Access denied. Insufficient privileges." });
		}
		// User has the required role, so allow them to proceed
		next();
	}
}

module.exports = { authentication, checkUserRole, refreshToken }