const HttpError = require('../models/http-error');

const getUserById = (req, res, next) => {
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
