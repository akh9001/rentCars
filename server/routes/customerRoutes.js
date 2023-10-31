const express = require("express");
const router = express.Router();

const {
  // there is one left I found difficulties to make it = < Validating a customer account.>
  register, //Creating a new customer account.
  verifyAccount,
  login, //Customer authentication.
  searchCustomerByName, //Searching for a customer.
  getCustomers, //Listing all the customers.
  getCustomerById, //Getting a customer by ID.
  updateCustomerById, //Updating the customer's data.
  deleteCustomerById, //Deleting the customer's account.
  searchCustomerProfile //Getting the customer's profile
} = require("../controllers/customerController");
const { verify } = require("jsonwebtoken");

// Register route
router.post("/register", register);

//Verify-account
router.post("/verify-account", verifyAccount)

// Login route
router.post("/login", login);

//getting customer's profile  => <http://localhost:3000/customers/searchprofile?first_name=<name>>
router.get("/profile", searchCustomerProfile);

//search for customer by name => http://localhost:3000/customers?first_name=name
router.get('/search', searchCustomerByName);

//get list of customers
router.get("/", getCustomers);

//get customer by id
router.get("/:id", getCustomerById);

//update customer by id
router.put("/:id", updateCustomerById);

//delete customer by id
router.delete("/:id", deleteCustomerById);

module.exports = router;
