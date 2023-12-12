// Axios configuration file
import axios from 'axios';
import { refreshAccessToken } from './refreshToken';

const api = axios.create({
	baseURL: process.env.HOST_URL,
});

const getAccessToken = () => {
	return localStorage.getItem('accessToken');
}

const setAccessToken = (token) => {
	localStorage.setItem('accessToken', token);
}

// Add a request interceptor to attach the access token to every outgoing request
api.interceptors.request.use(
	(config) => {
		const accessToken = getAccessToken(); // Replace with your function to retrieve the access token
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Add a response interceptor to handle token expiration errors
api.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		// Check if the error is due to an expired token
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			// Refresh the access token
			try {
				const newAccessToken = await refreshAccessToken();
				setAccessToken(newAccessToken); // Replace with your function to set the new access token

				// Retry the original request with the new access token
				return api(originalRequest);
			} catch (refreshError) {
				// Handle refresh token failure (e.g., redirect to login page)
				console.error('Failed to refresh access token', refreshError);
				throw refreshError;
			}
		}

		return Promise.reject(error);
	}
);

export default api;
