const express = require('express');
const { check } = require('express-validator');
const fileUpload = require('../middleware/file-upload');
const blogsControllers = require('../controllers/blogs-controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const image = 'Images here';
router.get('/all', blogsControllers.getBlogs);
router.get('/:bid', blogsControllers.getBlogById);

router.get('/user/:uid', blogsControllers.getBlogsByUserId);

router.use(checkAuth);

router.post(
	'/',
	fileUpload.single('image'),
	[check('title').not().isEmpty()],
	blogsControllers.createBlog
);

router.patch(
	'/:bid',
	[check('title').not().isEmpty(), check('content').isLength({ min: 5 })],
	blogsControllers.updateBlog
);

router.delete('/:bid', blogsControllers.deleteBlog);

module.exports = router;
