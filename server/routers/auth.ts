const twofactor = require('node-2fa');
import express from 'express';
const router = express.Router();

interface Options {
	name: string;
	account: string;
}

router.post('/generateSecret', (req, res) => {
	const { name, account }: Options = req.body;

	let newSecret: Object;
	if (name && account) {
		newSecret = generateSecret({ name: name, account: account });
	} else {
		newSecret = generateSecret();
	}

	res.json(newSecret);
});

router.post('/generateToken', (req, res) => {
	const { secret } = req.body;

	let newToken: string = generateToken(secret);

	res.json(newToken);
});

router.post('/verify', (req, res) => {
	const { secret, token } = req.body;

	let isValid = verifyToken(secret, token);

	res.json(isValid);
});

const generateSecret = (options?: Options) => {
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
