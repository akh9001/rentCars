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