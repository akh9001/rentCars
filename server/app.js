const express = require("express");
const app = express();
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes"); 
const port = process.env.PORT || 3000;
require("dotenv").config();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/customers', customerRoutes);
app.use('/v1/api', categoryRoutes); 
app.use('/v1/api', subcategoryRoutes); 
connectDB();
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
