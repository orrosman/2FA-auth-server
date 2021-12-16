import axios from 'axios';

const BASE_API_URL = 'http://localhost:3001';

export interface UserCredentials {
	email: string;
	password: string;
}

export const register = async (credentials: UserCredentials) => {
	const response = await axios.post(
		`${BASE_API_URL}/user/register`,
		credentials
	);
	return response;
};

export const login = async (credentials: UserCredentials) => {
	const response = await axios.post(`${BASE_API_URL}/user/login`, credentials);
	return response;
};

export const twoFactorAuth = async (email: string) => {
	console.log(email);

	const response = await axios.post(`${BASE_API_URL}/user/2FA`, {
		email: email,
	});
	return response;
};

export const verifyToken = async (email: string, code: string) => {
	const response = await axios.post(`${BASE_API_URL}/auth/verify`, {
		token: code,
		email: email,
	});
	return response;
};
