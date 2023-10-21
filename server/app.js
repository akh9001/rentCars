const express = require("express");
const app = express();
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes")
const port = process.env.PORT || 3000;
require("dotenv").config();

app.use(express.json());
app.use('/users', userRoutes);

// Connect to MongoDB
connectDB();

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
