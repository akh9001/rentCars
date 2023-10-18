const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'Gmail', // e.g., 'Gmail', 'Outlook', or use SMTP details for custom providers
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},
});

module.exports = transporter;