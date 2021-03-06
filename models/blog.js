const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	created: {
		type: String,
		required: true,
	},
	edited: {
		type: String,
		required: true,
	},
	likes: {
		type: String,
		required: true,
	},
	comments: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	creator: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'User',
	},
});

module.exports = mongoose.model('Blog', blogSchema);
