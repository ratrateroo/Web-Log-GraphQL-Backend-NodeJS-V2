const express = require('express');
const { check } = require('express-validator');

const blogsControllers = require('../controllers/blogs-controller');

const router = express.Router();

const image = 'Images here';
router.get('/all', blogsControllers.getBlogs);
router.get('/:bid', blogsControllers.getBlogById);

router.get('/user/:uid', blogsControllers.getBlogsByUserId);

router.post('/', [check('title').not().isEmpty()], blogsControllers.createBlog);

router.patch('/:bid', blogsControllers.updateBlog);

router.delete('/:bid', blogsControllers.deleteBlog);

module.exports = router;
