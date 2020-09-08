const HttpError = require('../models/http-error');

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

exports.getBlogById = getBlogById;
