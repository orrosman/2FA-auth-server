import express from 'express';
const mongoose = require('mongoose');
import { User } from '../models/User';
require('dotenv').config();
const router = express.Router();

mongoose.connect(process.env.DATABASE_URL);

router.post('/register', async (req, res) => {
	const { username, email, password } = req.body;
	const newUser = await User.create({ username, email, password });
	res.json({ username: newUser.username });
});

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({
		username: username,
	});

	if (user) {
		if (user.password === password) {
			res.json({ email: user.email });
		} else {
			res.json({ error: 'Password not valid' });
		}
	} else {
		res.json({ error: 'User not found' });
	}
});

module.exports = router;
