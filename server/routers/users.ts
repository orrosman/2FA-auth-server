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
		console.log(user);

		if (user.password === password) {
			res.json({ email: user.email });
		} else {
			res.status(401).json({ error: 'Password not valid' });
		}
	} else {
		res.status(404).json({ error: 'User not found' });
	}
});

module.exports = router;
