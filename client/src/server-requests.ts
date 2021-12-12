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
	const response = await axios.post(`${BASE_API_URL}/user/2FA`, {
		email: email,
	});
	return response;
};
