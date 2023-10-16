const mongoose = require('mongoose');

const connectDB = async () => {
	try
	{

		const connect = await mongoose.connect(process.env.MONGO_URI)
		console.log(`MongoDB Connected: ${connect.connection.host}`);
	}
	catch (error) {
		//! Exit process with failure
		console.log(`Error : ${error.message}`);
		process.exit(1);
	}
}

module.exports = connectDB