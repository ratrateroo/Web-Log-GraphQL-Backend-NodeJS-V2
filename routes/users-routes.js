const express = require('express');

const usersControllers = require('../controllers/users-controller');
const fileUpload = require('../middleware/file-upload');
const router = express.Router();

const image = 'Images here';

router.get('/', usersControllers.getUsers); //     /users/

router.get('/friends/:uid', usersControllers.getUserFriends); //     /users/friends/:uid

router.get('/profile/:uid', usersControllers.getUserProfile); //     /users/profile/:uid

router.patch('/:uid', usersControllers.updateUserProfile); // PATCH    /users/:uid

router.post('/signup', fileUpload.single('image'), usersControllers.signup); // POST - Create Profile   /users/signup

router.post('/login', usersControllers.login); // POST - Create Profile   /users/login

module.exports = router;
