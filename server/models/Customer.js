const { default: mongoose } = require("mongoose");


const customerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    // select: false // To prevent the password from being returned in queries by default.
  },
  creation_date: {
    type: Date,
    default: Date.now
  },
  last_login: {
    type: Date,
    default: null
  },
  valid_account: {
    type: Boolean,
    default: true
  },
  active: {
    type: Boolean,
    default: true
  }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
