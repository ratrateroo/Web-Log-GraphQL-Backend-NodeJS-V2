const express = require('express');

const blogsControllers = require('../controllers/blogs-controller');

const usersControllers = require('../controllers/users-controller');
const router = express.Router();

const image = 'Images here';

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
router.get('/:bid', blogsControllers.getBlogById);

router.get('/user/:uid', usersControllers.getUserById);

module.exports = router;
