var express = require('express');
var app = express();
import mongoose from 'mongoose';
import { User } from '../models/User';
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL);

export default app.use('/', (req, res, next) => {
	const { username, email, password } = req.body;
	User.findOne({ email: email }, (err, data) => {
		if (err) {
			res.json(err);
		}
		console.log(data);

		req.newUser = { username: username, email: email, password: password };
	});
	next();
});
