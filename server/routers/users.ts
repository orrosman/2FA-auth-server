import express from 'express';
const mongoose = require('mongoose');
import { User } from '../models/User';
require('dotenv').config();
const router = express.Router();

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
	const { email } = req.body;
	const newUser = await User.findOneAndUpdate({ email: email }, [
		{ $set: { '2FA': { $eq: [false, '$2FA'] } } },
	]);
	res.json({ email: newUser.email });
});

module.exports = router;
