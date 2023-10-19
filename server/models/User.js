const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require("validator")

// Define the user schema
const userSchema = new mongoose.Schema({
	user_name: {
		type: String,
		minlength: 3,
		maxlength: 15,
		unique: true,
		required: true
	},
	first_name: {
		type: String,
		minlength: 3,
		maxlength: 15,
		required: true
	},
	last_name: {
		type: String,
		minlength: 3,
		maxlength: 15,
		required: true
	},
	email: {
		type: String,
		validate: [isEmail, 'Invalid Email'],
		unique: true,
		required: true,
	},
	password: {
		type: String,
		minlength: 8,
		maxlength: 15,
		required: true,
		select: false
	},
	// address: {
	// 	type: String,
	// },
	// city: {
	// 	type: String,
	// },
	// country: {
	// 	type: String,
	// },
	// phone_number: {
	// 	type: String,
	// },
	// avatar: {
	// 	type: String,
	// 	//! I should add a default image
	// },
	role:
	{
		type: String,
		enum: ['admin', 'manager'],
		default: 'manager'
	},
	last_login: {
		type: Date,
		default: Date.now,
	},
	last_update: {
		type: Date,
		default: Date.now,
	},
	creation_date: {
		type: Date,
		default: Date.now,
	},
	active: {
		type: Boolean,
		default: true,
	}
});


// Add a pre-save hook to hash the password before saving it
userSchema.pre('save', async function (next) {
	try {
		// only hash the password if it has been modified (or is new)
		if (this.isModified('password'))
		{
			// You can adjust the number of salt rounds for security
			const saltRounds = 10;
			// Hash the password
			const salt = await bcrypt.genSalt(saltRounds);
			console.log(this.password)
			this.password = await bcrypt.hash(this.password, salt)
		}
		next();
	}
	catch (err) {
		console.log(err);
		next(err);
		// res.render('register', { errors: [{ msg: err.message }] });
	}
});

// Add a method to the schema to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {

	const result = await bcrypt.compare(enteredPassword, this.password);
	console.log("result", result)
	//compare pwd entered and from the db
	return result;
}

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in your application
module.exports = User;