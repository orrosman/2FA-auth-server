const twofactor = require('node-2fa');
import express from 'express';
const router = express.Router();

interface Options {
	name: string;
	account: string;
}

router.post('/generate', (req, res) => {
	const { name, account }: Options = req.body;

	let newSecret: Object;
	if (name && account) {
		newSecret = generateSecret({ name: name, account: account });
	} else {
		newSecret = generateSecret();
	}

	res.json(newSecret);
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

module.exports = router;
