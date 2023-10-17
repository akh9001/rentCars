const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Customer = require("../models/Customer");



const saltRounds = 10;
  //Register
  // Register route
router.post("/register", async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body;
    
      const existingCustomerByEmail = await Customer.findOne({ email });
      if (existingCustomerByEmail) {
        return res.status(400).json({ message: "Email already registered" });
      }
  
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const customer = new Customer({
        first_name,
        last_name,
        email,
        password: hashedPassword
      });

      await customer.save();
  
      res.status(201).json({ message: "Customer registered successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Login route
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Customer.findOne({ email }); // Using email to find user during login
  
      if (user && (await bcrypt.compare(password, user.password))) {
        res.json({ message: "Logged in successfully" });
      } else {
        res.status(401).json({ message: "email or password is incorrect" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
