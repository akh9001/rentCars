const express = require("express");
const app = express();
const connectDB = require("./config/database");
const port = process.env.PORT || 3000;
require("dotenv").config();
const router = require("./routes/customerRoutes")

// Example route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Connect to MongoDB
connectDB();
app.use(express.json())
app.use("/customers",router)

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
