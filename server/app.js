const express = require("express");
const app = express();
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes")
const port = process.env.PORT || 3000;
require("dotenv").config();

app.use('/users', userRoutes);

// Example route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Connect to MongoDB
connectDB();

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
