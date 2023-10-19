const jwt = require('jsonwebtoken');

// * middleware function to protect routes that require authentication with JWT:

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
		console.log("The user : ",user)
		next();
	});
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

module.exports = { authentication, checkUserRole }