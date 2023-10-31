const express = require("express");
const app = express();
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes")
const customerRoutes = require("./routes/customerRoutes")
const carRoutes = require("./routes/carRoutes")
const multer = require('multer');
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes"); 
const port = process.env.PORT || 3000;
require("dotenv").config();

app.use(express.json());
app.use('/users', userRoutes);
app.use("/customers", customerRoutes);
app.use("/cars", carRoutes);
app.use('/v1/api', categoryRoutes); 
app.use('/v1/api', subcategoryRoutes);

// Catch-all route for invalid routes
app.all('*', (req, res) => {
	res.status(404).json({ message: 'Not Found' });
});

// Custom error handling middleware
app.use((err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		// Handle Multer errors
		res.status(400).json({ error: 'Multer Error: ' + err.message });
	} else {
		// Handle other errors
		res.status(500).json({ error: 'Server Error' });
	}
});

// Connect to MongoDB
connectDB();

// Start the server
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
