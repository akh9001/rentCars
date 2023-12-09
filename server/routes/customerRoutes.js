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
const { authentication, checkUserRole } = require('../middleware/authMiddleware');

// Register route
router.post("/register", register);

//Verify-account
router.post("/verify-account", verifyAccount)

// Login route
router.post("/login", login);

//getting customer's profile  => <http://localhost:3000/customers/searchprofile?first_name=<name>>
router.get("/profile", searchCustomerProfile);

//search for customer by name => http://localhost:3000/customers?first_name=name
router.get('/search', authentication, checkUserRole(["admin", "manager"]), searchCustomerByName);

//get list of customers
router.get("/", authentication, checkUserRole(["admin", "manager"]), getCustomers);

//get customer by id
router.get("/:id", authentication, getCustomerById);

//update customer by id
router.put("/:id", authentication, updateCustomerById);

//delete customer by id
router.delete("/:id", authentication, checkUserRole(["admin"]), deleteCustomerById);

module.exports = router;
