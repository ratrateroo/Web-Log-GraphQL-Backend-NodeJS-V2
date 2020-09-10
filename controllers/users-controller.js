const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');

let USERS = [
	{
		id: 'u0',
		username: 'username',
		password: 'password',
		email: 'email@email.com',
		firstname: 'Mark Leo',
		middlename: 'Cabang',
		lastname: 'Tarectecan',
		profileimage: '',
		blogs: [],
		friends: [],
	},
	{
		id: 'u1',
		username: 'username1',
		password: 'password',
		email: 'user1@email.com',
		firstname: 'Aurora',
		middlename: 'Bar',
		lastname: 'Nuts',
		profileimage: '',
		blogs: [],
		friends: [],
	},
];

const getUsers = (req, res, next) => {
	res.json({ users: USERS });
};

const getUserFriends = (req, res, next) => {
	const userId = req.params.uid;
	const friends = USERS.find((user) => {
		return user.id === userId ? user.friends : [];
	});

	res.json({ friends: friends });
};

const getUserProfile = (req, res, next) => {
	const userId = req.params.uid;
	const user = USERS.find((user) => {
		return user.id === userId;
	});

	if (!user) {
		return new HttpError('Could not find a user for the provided id.', 404);
	}

	res.json({ user: user });
};

const updateUserProfile = (req, res, next) => {
	const {
		username,
		password,
		email,
		firstname,
		middlename,
		lastname,
		profileimage,
	} = req.body;
	const userId = req.body.uid;

	const updateProfile = { ...USERS.find((user) => user.id === userId) };
	const userIndex = USERS.findIndex((user) => user.id === userId);

	updateProfile.username = username;
	updateProfile.password = password;
	updateProfile.email = email;
	updateProfile.firstname = firstname;
	updateProfile.middlename = middlename;
	updateProfile.lastname = lastname;
	updateProfile.profileimage = profileimage;
	USERS[userIndex] = updateProfile;

	res.status(200).json({ user: updateProfile });
};

const signup = (req, res, next) => {
	const {
		username,
		password,
		email,
		firstname,
		middlename,
		lastname,
		profileimage,
	} = req.body;

	const createdProfile = {
		id: uuidv4(),
		username,
		password,
		email,
		firstname,
		middlename,
		lastname,
		profileimage,
	};

	USERS.push(createdProfile);
	res.status(201).json({ user: createdProfile });
};

const login = (req, res, next) => {
	const { username, password } = req.body;

	const identifiedUser = USERS.find((user) => user.username === username);
	if (!identifiedUser || user.password !== password) {
		return new HttpError('Could not identify user.', 404);
	}

	res.status(201).json({ message: 'Logged In' });
};
exports.getUsers = getUsers;
exports.getUserFriends = getUserFriends;
exports.getUserProfile = getUserProfile;
exports.updateUserProfile = updateUserProfile;
exports.signup = signup;
exports.login = login;
