const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const image = 'image here';
const Blog = require('../models/blog');
const BLOGS = [
	{
		id: 'b1',
		image: image,
		title: 'The Throne of the Sphinx',
		author: 'Aurora Barnuts',
		category: 'Javascript',
		created: 'Jan-14-12',
		updated: 'Jan-14-12',
		creator: 'u1',
		content:
			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
	},
	{
		id: 'b2',
		image: image,
		title: 'Wizard of Oz',
		author: 'Aurora Barnuts',
		category: 'Javascript',
		created: 'Jan-14-12',
		updated: 'Jan-14-12',
		creator: 'u1',
		content:
			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
	},
	{
		id: 'b3',
		image: image,
		title: 'The Throne of the Sphinx',
		author: 'Aurora Barnuts',
		category: 'Javascript',
		created: 'Jan-14-12',
		updated: 'Jan-14-12',
		creator: 'u1',
		content:
			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
	},
	{
		id: 'b4',
		image: image,
		title: 'Wizard of Oz',
		author: 'Aurora Barnuts',
		category: 'Javascript',
		created: 'Jan-14-12',
		updated: 'Jan-14-12',
		creator: 'u1',
		content:
			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
	},
	{
		id: 'b5',
		image: image,
		title: 'The Throne of the Sphinx',
		author: 'Aurora Barnuts',
		category: 'Javascript',
		created: 'Jan-14-12',
		updated: 'Jan-14-12',
		creator: 'u1',
		content:
			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
	},
	{
		id: 'b6',
		image: image,
		title: 'Wizard of Oz',
		author: 'Aurora Barnuts',
		category: 'Javascript',
		created: 'Jan-14-12',
		updated: 'Jan-14-12',
		creator: 'u1',
		content:
			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
	},
	{
		id: 'b7',
		image: image,
		title: 'The Throne of the Sphinx',
		author: 'Aurora Barnuts',
		category: 'Javascript',
		created: 'Jan-14-12',
		updated: 'Jan-14-12',
		creator: 'u1',
		content:
			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
	},
	{
		id: 'b8',
		image: image,
		title: 'Wizard of Oz',
		author: 'Aurora Barnuts',
		category: 'Javascript',
		created: 'Jan-14-12',
		updated: 'Jan-14-12',
		creator: 'u2',
		content:
			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
	},

	{
		id: 'b9',
		image: image,
		title: 'The Throne of the Sphinx',
		author: 'Aurora Barnuts',
		category: 'Javascript',
		created: 'Jan-14-12',
		updated: 'Jan-14-12',
		creator: 'u2',
		content:
			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
	},
	{
		id: 'b10',
		image: image,
		title: 'Wizard of Oz',
		author: 'Aurora Barnuts',
		category: 'Javascript',
		created: 'Jan-14-12',
		updated: 'Jan-14-12',
		creator: 'u2',
		content:
			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
	},
	{
		id: 'b11',
		image: image,
		title: 'The Throne of the Sphinx',
		author: 'Aurora Barnuts',
		category: 'Javascript',
		created: 'Jan-14-12',
		updated: 'Jan-14-12',
		creator: 'u2',
		content:
			'Sphinx of black quartz, judge my vow. Jackdaws love my big sphinx of quartz. Pack my box with five dozen liquor jugs. The quick onyx goblin jumps over the lazy dwarf.',
	},
];

const getBlogById = async (req, res, next) => {
	const blogId = req.params.bid;
	let blog;
	try {
		blog = await Blog.findById(blogId);
	} catch (error) {
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
	let blogs;
	try {
		blogs = await Blog.find({ creator: userId });
	} catch (error) {
		const error = new HttpError(
			'Fetching blogs failed, please try again later.',
			500
		);
		return next(error);
	}
	if (!blogs || blogs.length === 0) {
		return next(
			new HttpError('Could not find a blog for the provided id.', 404)
		);
	}

	res.json({ blogs: blogs.map((blog) => blog.toObject({ getters: true })) });
};

const createBlog = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		// res.json({ errors: errors });
		throw new HttpError('Invalid inputs passed, check your data.', 422);
	}

	const {
		image,
		title,
		author,
		category,
		created,
		updated,
		creator,
		content,
	} = req.body;

	const createdBlog = new Blog({
		title,
		image,
		author,
		category,
		created,
		updated,
		creator,
		content,
	});

	try {
		await createdBlog.save();
	} catch (err) {
		const error = new HttpError('Ceating blogs failed', 500);
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

	const { title, author, category, content } = req.body;
	const blogId = req.body.bid;

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

	blog.title = title;
	blog.author = author;
	blog.category = category;
	blog.content = content;

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
	const blogId = req.body.bid;

	let blog;

	try {
		blog = await Blog.findById(placeId);
	} catch (err) {
		const error = new HttpError('Something went wrong.', 500);
		return next(error);
	}
	res.status(200).json({ message: 'Blog deleted' });
};

exports.getBlogById = getBlogById;
exports.getBlogsByUserId = getBlogsByUserId;
exports.createBlog = createBlog;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;
