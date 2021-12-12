const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	'2FA': {
		type: Boolean,
		default: false,
		required: true,
	},
});

export const User = mongoose.model('User', UserSchema);
