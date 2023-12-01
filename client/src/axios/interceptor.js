import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Function to get the access token from localStorage
const getAccessToken = () => {
	return localStorage.getItem('token');
};

// Function to get the refresh token from localStorage
const getRefreshToken = () => {
	return localStorage.getItem('refresh_token');
};

// Function to save the new access token in localStorage
const saveAccessToken = (token) => {
	localStorage.setItem('token', token);
};

// Axios request interceptor to attach the access token to every request
axios.interceptors.request.use(
	(config) => {
		const accessToken = getAccessToken();
		if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Axios response interceptor to handle token expiration and refresh
axios.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		const navigate = useNavigate();

		// Check if the error is due to token expiration
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			// Get the refresh token
			const refreshToken = getRefreshToken();

			// Make a request to refresh the token
			try {
				const refreshResponse = await axios.post(
					process.env.REFRESH_TOKEN_URL,
					{ token: refreshToken }
				);

				// Save the new access token
				const newAccessToken = refreshResponse.data.access_token;
				saveAccessToken(newAccessToken);

				// Retry the original request with the new token
				originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
				return axios(originalRequest);
			} catch (refreshError) {
				// Handle refresh token error (e.g., redirect to login page)
				console.error('Error refreshing token:', refreshError);
				// You might want to redirect the user to the login page or handle this error appropriately
				navigate('/admin-login')
			}
		}

		return Promise.reject(error);
	}
);

// Example usage of Axios
const fetchData = async () => {
	try {
		const response = await axios.get(process.env.API_URL + '/data');
		console.log(response.data);
	} catch (error) {
		console.error('Error fetching data:', error.message);
	}
};

// Call the fetchData function
fetchData();
