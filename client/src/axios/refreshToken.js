// path-to-authThunks.js

import axios from 'axios';

// Replace 'your-refresh-endpoint' with the actual endpoint to refresh the access token
const refreshEndpoint = `${process.env.HOST_URL}/users/refresh-token`;

export const refreshAccessToken = async (token) => {
	try {
		// Perform a request to your server to refresh the access token
		const response = await axios.post(refreshEndpoint,token);

		// Extract and return the new access token from the response
		const newAccessToken = response.data.access_token;
		return newAccessToken;
	} catch (error) {
		// Handle errors during token refresh
		console.error('Failed to refresh access token', error);
		throw error;
	}
};
