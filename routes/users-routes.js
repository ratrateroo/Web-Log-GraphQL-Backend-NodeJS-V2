const express = require('express');

const usersControllers = require('../controllers/users-controller');
const router = express.Router();

const image = 'Images here';

router.get('/', usersControllers.getUsers); //     /users/

router.get('/friends/:uid', usersControllers.getUserFriends); //     /users/friends/:uid

router.get('/profile/:uid', usersControllers.getUserProfile); //     /users/profile/:uid

router.patch('/:uid', usersControllers.updateUserProfile); // PATCH    /users/:uid

router.post('/', usersControllers.createUserProfile); // POST - Sign Up   /users/

router.get('/:bid', usersControllers.getBlogById);

router.get('/user/:uid', usersControllers.getBlogsByUserId);

router.post('/', usersControllers.createBlog);

router.patch('/:bid', usersControllers.updateBlog);

router.delete('/:bid', usersControllers.deleteBlog);

module.exports = router;
