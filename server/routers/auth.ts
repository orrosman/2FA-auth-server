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

	let newSecret: Object;
	if (name && account) {
		newSecret = generateSecret({ name: name, account: account });
	} else {
		newSecret = generateSecret();
	}

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
	const secret = await User.findOne({ email: email }).secret;
	console.log(secret);

	let isValid = verifyToken(secret, token);

	res.json(isValid);
});

export const generateSecret = (options?: Options) => {
	if (options) {
		return twofactor.generateSecret({
			name: options.name,
			account: options.account,
		});
	} else {
		return twofactor.generateSecret();
	}
};

const generateToken = (secret: string): string => {
	return twofactor.generateToken(secret);
};

const verifyToken = (secret: string, token: string) => {
	return twofactor.verifyToken(secret, token);
};

module.exports = router;
