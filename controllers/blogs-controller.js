const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const image = 'image here';
const Blog = require('../models/blog');
const User = require('../models/user');
// const BLOGS = [
// 	{
// 		id: 'b1',
// 		image: image,
// 		title: 'The Throne of the Sphinx',
// 		author: 'Aurora Barnuts',
// 		category: 'Javascript',
// 		created: 'Jan-14-12',
// 		updated: 'Jan-14-12',
// 		creator: 'u1',
// 		content:
// 			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
// 	},
// 	{
// 		id: 'b2',
// 		image: image,
// 		title: 'Wizard of Oz',
// 		author: 'Aurora Barnuts',
// 		category: 'Javascript',
// 		created: 'Jan-14-12',
// 		updated: 'Jan-14-12',
// 		creator: 'u1',
// 		content:
// 			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
// 	},
// 	{
// 		id: 'b3',
// 		image: image,
// 		title: 'The Throne of the Sphinx',
// 		author: 'Aurora Barnuts',
// 		category: 'Javascript',
// 		created: 'Jan-14-12',
// 		updated: 'Jan-14-12',
// 		creator: 'u1',
// 		content:
// 			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
// 	},
// 	{
// 		id: 'b4',
// 		image: image,
// 		title: 'Wizard of Oz',
// 		author: 'Aurora Barnuts',
// 		category: 'Javascript',
// 		created: 'Jan-14-12',
// 		updated: 'Jan-14-12',
// 		creator: 'u1',
// 		content:
// 			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
// 	},
// 	{
// 		id: 'b5',
// 		image: image,
// 		title: 'The Throne of the Sphinx',
// 		author: 'Aurora Barnuts',
// 		category: 'Javascript',
// 		created: 'Jan-14-12',
// 		updated: 'Jan-14-12',
// 		creator: 'u1',
// 		content:
// 			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
// 	},
// 	{
// 		id: 'b6',
// 		image: image,
// 		title: 'Wizard of Oz',
// 		author: 'Aurora Barnuts',
// 		category: 'Javascript',
// 		created: 'Jan-14-12',
// 		updated: 'Jan-14-12',
// 		creator: 'u1',
// 		content:
// 			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
// 	},
// 	{
// 		id: 'b7',
// 		image: image,
// 		title: 'The Throne of the Sphinx',
// 		author: 'Aurora Barnuts',
// 		category: 'Javascript',
// 		created: 'Jan-14-12',
// 		updated: 'Jan-14-12',
// 		creator: 'u1',
// 		content:
// 			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
// 	},
// 	{
// 		id: 'b8',
// 		image: image,
// 		title: 'Wizard of Oz',
// 		author: 'Aurora Barnuts',
// 		category: 'Javascript',
// 		created: 'Jan-14-12',
// 		updated: 'Jan-14-12',
// 		creator: 'u2',
// 		content:
// 			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
// 	},

// 	{
// 		id: 'b9',
// 		image: image,
// 		title: 'The Throne of the Sphinx',
// 		author: 'Aurora Barnuts',
// 		category: 'Javascript',
// 		created: 'Jan-14-12',
// 		updated: 'Jan-14-12',
// 		creator: 'u2',
// 		content:
// 			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
// 	},
// 	{
// 		id: 'b10',
// 		image: image,
// 		title: 'Wizard of Oz',
// 		author: 'Aurora Barnuts',
// 		category: 'Javascript',
// 		created: 'Jan-14-12',
// 		updated: 'Jan-14-12',
// 		creator: 'u2',
// 		content:
// 			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
// 	},
// 	{
// 		id: 'b11',
// 		image: image,
// 		title: 'The Throne of the Sphinx',
// 		author: 'Aurora Barnuts',
// 		category: 'Javascript',
// 		created: 'Jan-14-12',
// 		updated: 'Jan-14-12',
// 		creator: 'u2',
// 		content:
// 			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
// 	},
// ];

const getBlogs = async (req, res, next) => {
	let blog;
	try {
		blogs = await Blog.find();
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not find a blog',
			500
		);
		return next(error);
	}
	console.log(blogs);
	res.json({
		blogs: blogs.map((blog) => blog.toObject({ getters: true })),
	});
};

const getBlogById = async (req, res, next) => {
	const blogId = req.params.bid;
	let blog;
	try {
		blog = await Blog.findById(blogId).exec();
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not find a blog',
			500
		);
		return next(error);
	}

	if (!blog) {
		const error = new HttpError(
			'Could not find a blog for the provided id.',
			404
		);
		return next(error);
	}

	res.json({ blog: blog.toObject({ getters: true }) });
};

const getBlogsByUserId = async (req, res, next) => {
	const userId = req.params.uid;

	let userWithBlogs;
	try {
		userWithBlogs = await User.findById(userId).populate('blogs');
	} catch (err) {
		const error = new HttpError(
			'Fetching blogs failed, please try again later.',
			500
		);
		return next(error);
	}
	if (!userWithBlogs || userWithBlogs.blogs.length === 0) {
		return next(
			new HttpError('Could not find a blog for the provided id.', 404)
		);
	}

	res.json({
		blogs: userWithBlogs.blogs.map((blog) =>
			blog.toObject({ getters: true })
		),
	});
};

const createBlog = async (req, res, next) => {
	console.log(req.body);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);

		return next(
			new HttpError('Invalid inputs passed, check your data.', 422)
		);
	}

	const {
		image,
		title,
		author,
		category,
		created,
		edited,
		content,
		likes,
		comments,
	} = req.body;

	const createdBlog = new Blog({
		title,
		image: req.file.path,
		author,
		category,
		created,
		edited,
		creator: req.userData.userId,
		content,
		likes,
		comments,
	});

	let user;

	try {
		user = await User.findById(req.userData.userId);
	} catch (err) {
		const error = new HttpError(
			'Creating blog failded, please try again',
			500
		);
		console.log(err);
		return next(error);
	}

	if (!user) {
		const error = new HttpError('Could not find user for provided id', 404);
		return next(error);
	}
	console.log(user);

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await createdBlog.save({ session: sess });
		user.blogs.push(createdBlog);
		await user.save({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		const error = new HttpError('Creating blogs failed', 500);
		console.log(err);
		return next(error);
	}

	// BLOGS.push(createdBlog);
	res.status(201).json({ blog: createdBlog });
};

const updateBlog = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		throw new HttpError(
			'Invalid inputs passed, please check your data.',
			422
		);
	}

	const { title, content, category, edited, created, author } = req.body;
	const blogId = req.params.bid;

	let blog;
	try {
		blog = await Blog.findById(blogId);
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not update blog.',
			500
		);
		return next(error);
	}
	//creator is ref object and needed to convert to string
	if (blog.creator.toString() !== req.userData.userId) {
		const error = new HttpError(
			'You are not allowed to update this blog.',
			401
		);
		return next(error);
	}

	// const newObject = {
	// 	...blog,
	// 	title: title,
	// 	content: content,
	// 	category: category,
	// 	edited: edited,
	// 	created: created,
	// 	author: author,
	// };
	blog.title = title;
	blog.content = content;
	blog.category = category;
	blog.edited = edited;
	blog.created = created;
	blog.author = author;
	console.log(blog.title);

	try {
		await blog.save();
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not update blog.',
			500
		);
		return next(error);
	}

	res.status(200).json({ blog: blog.toObject({ getters: true }) });
};

const deleteBlog = async (req, res, next) => {
	const blogId = req.params.bid;

	console.log('Request Body', req.params);

	let blog;
	try {
		blog = await Blog.findById(blogId).populate('creator');
	} catch (err) {
		const error = new HttpError('Something went wrong.', 500, err);
		console.log(err);
		return next(error);
	}

	if (!blog) {
		const error = new HttpError('Could not find blog for this id.', 404);
		return next(error);
	}

	if (blog.creator.id !== req.userData.userId) {
		const error = new HttpError(
			'You are not allowed to delete this blog.',
			401
		);
		return next(error);
	}

	const imagePath = blog.image;

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await blog.remove({ session: sess });
		blog.creator.blogs.pull(blog);
		await blog.creator.save({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not delete blog.',
			500
		);
		console.log(err);
		return next(error);
	}
	fs.unlink(imagePath, (err) => {
		console.log(err);
	});
	res.status(200).json({ message: 'Blog deleted' });
};
exports.getBlogs = getBlogs;
exports.getBlogById = getBlogById;
exports.getBlogsByUserId = getBlogsByUserId;
exports.createBlog = createBlog;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;
