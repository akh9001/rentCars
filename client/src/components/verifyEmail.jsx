import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const HOST_URL = 'http://localhost:3001/customers/verify-account';

const ActivationPage = () => {
	const { token } = useParams();
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		console.log("token :  ", token);
		if (token) {
			const sendRequest = async () => {
				await axios
					.post(`${HOST_URL}`, {
						token,
					})
					.then((res) => {
						navigate('/login')
						console.log(res);
					})
					.catch((err) => {
						setError(true);
					});
			};
			sendRequest();
		}
	}, []);

	return (
		<div
			style={{
				width: "100%",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{error ? (
				<p>Your token is expired!</p>
			) : (
				<p>Your account has been created suceessfully!</p>
			)}
		</div>
	);
};

export default ActivationPage;