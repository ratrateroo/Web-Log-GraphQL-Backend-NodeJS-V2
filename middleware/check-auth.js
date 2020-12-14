const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}

	try {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) {
			throw new Error('Authentication failed.');
		}
		const decodedToken = jwt.verify(token, 'secretkey');
		req.userData = { userId: decodedToken.userId };
		next();
	} catch (err) {
		const error = new HttpError('Authentication failed.', 401);
		console.log(err);
		return next(error);
	}
};
