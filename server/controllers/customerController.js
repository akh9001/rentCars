const bcrypt = require("bcrypt");
const Customer = require("../models/Customer");
const nodemailer = require('nodemailer')
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const { v4: uuidv4 } = require("uuid");
const SECRET_KEY = "JWT_SECRET";

//Register
const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const existingCustomerByEmail = await Customer.findOne({ email });

    if (existingCustomerByEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const customer = new Customer({
      uuid: uuidv4(),
      first_name,
      last_name,
      email,
      password: hashedPassword,
      isActive: false,
    });

    await customer.save();

    // Set up email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationToken = jwt.sign(
      { customerId: customer._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const verificationLink = `https://localhost:3000/verify-account?token=${verificationToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Please verify your account",
      text: `Click on the link to verify your account: ${verificationLink}`,
      html: `<a href="${verificationLink}">Click here to verify your account</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Verification email sent: " + info.response);
      }
    });

    res.status(201).json({
      message:
        "Customer registered successfully. Please activate your email to activate your account.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//verify account

const verifyAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer = await Customer.findById(decoded.customerId);

    if (!customer) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    // customer.isActive = true;
    await customer.save();
    res.status(200).json({ message: "Account successfully activated!" });
  } catch (error) {
    console.error("Error detail:", error);
    res.status(500).json({ message: "Error activating your account." });
  }
};


//Login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email }); // Using email to find user during login

    if (customer && (await bcrypt.compare(password, customer.password))) {
      // User authenticated, generate a JWT token
      const tokenPayload = { customerId: customer._id };
      const token = jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: "10h" }); // 10h means the token expires in 10 hours
      res.status(200).json({ message: "Logged in successfully", token: token });
    } else {
      res.status(401).json({ message: "email or password is incorrect" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// find customer by name
const searchCustomerByName = async (req, res) => {
  try {
    const { query, page = 1, sort = "ASC" } = req.query; //ASC

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    // Find customers by first name or last name
    const customersQuery = Customer.find({
      $or: [
        { first_name: new RegExp(query, "i") },
        { last_name: new RegExp(query, "i") },
      ],
    });

    // Sort customers  DESC
    if (sort === "DESC") {
      customersQuery.sort("-first_name"); // Assuming you want to sort by first_name. Adjust field if needed.
    } else {
      customersQuery.sort("first_name");
    }

    // Pagination logic
    const limit = 10; // Or any number you prefer per page
    customersQuery.skip((page - 1) * limit).limit(limit);

    const customers = await customersQuery.exec();

    if (customers.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all customers
const getCustomers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 2;
    const sortDirection = req.query.sort === 'DESC'? -1 : 1;
    const customers = await Customer.find()
    .sort({first_name: sortDirection, last_name: sortDirection })
    .skip((page - 1) * perPage)
    .limit(perPage);
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a specific customer by ID
const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE a specific customer by ID
const updateCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const customer = await Customer.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res
      .status(200)
      .json({ message: "Customer updated successfully", customer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE a specific customer by ID
const deleteCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Customer.findByIdAndRemove(id);

    if (!result) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Getting the customer's profile
const searchCustomerProfile = async (req, res) => {
  try {
    const { first_name } = req.query;

    if (!first_name) {
      return res
        .status(400)
        .json({ message: "First name query parameter is required" });
    }

    const filter = { first_name: new RegExp(first_name, "i") };
    const customer = await Customer.findOne(filter);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  verifyAccount,
  login,
  searchCustomerByName,
  getCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
  searchCustomerProfile,
};
