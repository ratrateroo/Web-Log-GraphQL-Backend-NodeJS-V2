const express = require('express');
const bodyParser = require('body-parser');

const blogsRoutes = require('./routes/blogs-routes');

const app = express();

app.use(bodyParser.json());

app.use('/blogs', blogsRoutes);

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown error occured!' });
});

app.listen(5000);
