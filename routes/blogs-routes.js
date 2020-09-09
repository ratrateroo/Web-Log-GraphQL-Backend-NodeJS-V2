const express = require('express');

const blogsControllers = require('../controllers/blogs-controller');

const usersControllers = require('../controllers/users-controller');
const router = express.Router();

const image = 'Images here';

router.get('/:bid', blogsControllers.getBlogById);

router.get('/user/:uid', blogsControllers.getBlogsByUserId);

router.post('/', blogsControllers.createBlog);

module.exports = router;
