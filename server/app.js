const express = require("express");
const app = express();
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes")
const customerRoutes = require("./routes/customerRoutes")
const carRoutes = require("./routes/carRoutes")
const multer = require('multer');
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes"); 
const orderRoutes = require("./routes/orderRoutes")
const port = process.env.PORT || 3000;
const cors = require('cors');
const path = require('path');
require("dotenv").config();

// Read allowed origins from environment variable
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
// If ALLOWED_ORIGINS is not set, it defaults to an empty array

const corsOptions = {
	origin: function (origin, callback) {
		if (allowedOrigins.length === 0 || allowedOrigins.indexOf(origin) !== -1 || !origin) {
			// console.log('Origin: ' + origin);
			callback(null, true);
		} else {
			console.log('not allowed: ' + origin);
			callback(new Error('Not allowed by CORS'));
		}
	},
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/users', userRoutes);
app.use("/customers", customerRoutes);
app.use("/cars", carRoutes);
app.use('/categories', categoryRoutes); 
app.use('/subcategories', subcategoryRoutes);
app.use("/orders", orderRoutes)
// Serve static files from the "images" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
