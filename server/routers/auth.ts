const mongoose = require('mongoose');
import { User } from '../models/User';
require('dotenv').config();
const twofactor = require('node-2fa');
import express from 'express';
const router = express.Router();

mongoose.connect(process.env.DATABASE_URL);

interface Options {
	name: string;
	account: string;
}

router.post('/generateSecret', async (req, res) => {
	const { name, account }: Options = req.body;

	const newSecret = generateSecret({ name: name, account: account });

	const response = await User.findOneAndUpdate(
		{ email: account },
		{ ...newSecret }
	);

	res.json({ qr: response.qr });
});

router.post('/generateToken', (req, res) => {
	const { secret } = req.body;

	let newToken: string = generateToken(secret);

	res.json(newToken);
});

router.post('/verify', async (req, res) => {
	const { email, token } = req.body;
	const user = await User.findOne({ email: email });

	let isValid = verifyToken(user.secret, token);

	res.json(isValid);
});

const generateSecret = async (options: Options) => {
	const newSecret = twofactor.generateSecret({
		name: options.name,
		account: options.account,
	});

	return await User.findOneAndUpdate({ email: options.name }, { ...newSecret });
};

const generateToken = (secret: string): string => {
	return twofactor.generateToken(secret);
};

const verifyToken = (secret: string, token: string) => {
	return twofactor.verifyToken(secret, token);
};

module.exports = { router, generateSecret };
