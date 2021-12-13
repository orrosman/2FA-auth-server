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
	secret: {
		type: String,
		required: false,
	},
	uri: {
		type: String,
		required: false,
	},
	qr: {
		type: String,
		required: false,
	},
});

export const User = mongoose.model('User', UserSchema);
