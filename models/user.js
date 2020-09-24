const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 },
	image: { type: String, required: true },
	firstname: { type: String, required: true },
	middlename: { type: String, required: true },
	lastname: { type: String, required: true },
	blogs: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Blog' }],
	friends: [
		{
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
