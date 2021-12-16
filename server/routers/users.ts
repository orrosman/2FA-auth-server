import express from 'express';
const mongoose = require('mongoose');
import { User } from '../models/User';
require('dotenv').config();
const router = express.Router();
const { generateSecret } = require('./auth');

mongoose.connect(process.env.DATABASE_URL);

router.post('/register', async (req, res) => {
	const { email, password } = req.body;
	const newUser = await User.create({ email, password });
	res.json({ email: newUser.email });
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({
		email: email,
	});

	if (user) {
		if (user.password === password) {
			res.json(user);
		} else {
			res.status(401).json({ error: 'Password not valid' });
		}
	} else {
		res.status(404).json({ error: 'User not found' });
	}
});

router.post('/2FA', async (req, res) => {
	console.log(req.body);

	const { email } = req.body;
	const user = await User.findOneAndUpdate({ email: email }, [
		{ $set: { '2FA': { $eq: [false, '$2FA'] } } },
	]);
	if (user['2FA']) {
		const info = await generateSecret({
			name: user.email,
			account: 'My 2FA App',
		});

		res.json(info.qr);
	} else {
		res.send('2FA disabled');
	}
});

module.exports = router;
