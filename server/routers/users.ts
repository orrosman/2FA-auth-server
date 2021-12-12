import express from 'express';
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();
const router = express.Router();

mongoose.connect(process.env.DATABASE_URL);

router.post('/register', async (req, res) => {
	const { username, email, password } = req.body;
	const newUser = await User.create({ username, email, password });
	res.json(newUser.email);
});

module.exports = router;
