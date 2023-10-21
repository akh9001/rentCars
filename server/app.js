const express = require("express");
const app = express();
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes")
const port = process.env.PORT || 3000;
require("dotenv").config();
const router = require("./routes/customerRoutes")

app.use(express.json());
app.use('/users', userRoutes);

// Connect to MongoDB
connectDB();
app.use(express.json())
app.use("/customers",router)

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
