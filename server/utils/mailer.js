const nodemailer = require('nodemailer');
require("dotenv").config();

console.log("email", process.env.EMAIL)
console.log("email password", process.env.EMAIL_PASSWORD)	
const transporter = nodemailer.createTransport({
	service: 'Gmail', // e.g., 'Gmail', 'Outlook', or use SMTP details for custom providers
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},
});

module.exports = transporter;