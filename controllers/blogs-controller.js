const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');
const image = 'image here';
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
	},
];

const getBlogById = (req, res, next) => {
	const blogId = req.params.bid;
	const blog = BLOGS.find((blog) => {
		return blog.id === blogId;
	});
	if (!blog) {
		return new HttpError('Could not find a blog for the provided id.', 404);
	}

	res.json({ blog });
};

const getBlogsByUserId = (req, res, next) => {
	const userId = req.params.uid;
	const blog = BLOGS.find((blog) => {
		return blog.creator === userId;
	});

	if (!blog) {
		return next(
			new HttpError('Could not find a blog for the provided user id.', 404)
		);
	}
	res.json({ blog: blog });
};

const createBlog = (req, res, next) => {
	const {
		image,
		title,
		author,
		category,
		created,
		updated,
		creator,
	} = req.body;

	const createdBlog = {
		id: uuidv4(),
		image,
		title,
		author,
		category,
		created,
		updated,
		creator,
	};

	BLOGS.push(createdBlog);
	res.status(201).json({ blog: createdBlog });
};

const updateBlog = (req, res, next) => {
	const { title, author, category } = req.body;
	const blogId = req.body.bid;

	const updatedBlog = { ...BLOGS.find((blog) => blog.id === blogId) };
	const blogIndex = BLOGS.findIndex((blog) => blog.id === blogId);
	updatedBlog.title = title;
	updatedBlog.author = author;
	updatedBlog.category = category;
	BLOGS[blogIndex] = updatedBlog;
	res.status(200).json({ blog: updatedBlog });
};

const deleteBlog = (req, res, next) => {};

exports.getBlogById = getBlogById;
exports.getBlogsByUserId = getBlogsByUserId;
exports.createBlog = createBlog;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;
