const mongoose = require('mongoose');

// const connectDB = async () => {
// 	try
// 	{

// 		const connect = await mongoose.connect(process.env.MONGO_URI)
// 		console.log(`MongoDB Connected: ${connect.connection.host}`);
// 	}
// 	catch (error) {
// 		//! Exit process with failure
// 		console.log(`Error : ${error.message}`);
// 		// process.exit(1);
// 	}
// }
const connectDB = async () => {
	const maxRetries = 25;
	let currentRetry = 0;

	while (currentRetry < maxRetries) {
		try {
			const connect = await mongoose.connect(process.env.MONGO_URI);
			console.log(`MongoDB Connected: ${connect.connection.host}`);
			break; // If successful, break out of the loop
		} catch (error) {
			console.error(`Error: ${error.message}`);
			currentRetry++;
			console.log(`Retrying connection... (attempt ${currentRetry}/${maxRetries})`);

			// Wait for a short delay before the next retry
			await new Promise(resolve => setTimeout(resolve, 3000)); // 5 seconds delay, adjust as needed
		}
	}

	if (currentRetry === maxRetries) {
		console.error('Failed to connect to MongoDB after multiple attempts. Exiting process.');
		// process.exit(1);
	}
};
module.exports = connectDB