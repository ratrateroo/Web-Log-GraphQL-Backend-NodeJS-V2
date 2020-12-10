const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');
// let USERS = [
// 	{
// 		id: 'u0',
// 		username: 'username',
// 		password: 'password',
// 		email: 'email@email.com',
// 		firstname: 'Mark Leo',
// 		middlename: 'Cabang',
// 		lastname: 'Tarectecan',
// 		profileimage: '',
// 		blogs: [],
// 		friends: [],
// 	},
// 	{
// 		id: 'u1',
// 		username: 'username1',
// 		password: 'password',
// 		email: 'user1@email.com',
// 		firstname: 'Aurora',
// 		middlename: 'Bar',
// 		lastname: 'Nuts',
// 		profileimage: '',
// 		blogs: [],
// 		friends: [],
// 	},
// ];

const getUsers = async (req, res, next) => {
	let users;
	try {
		users = await User.find({}, '-password');
	} catch (err) {
		const error = new HttpError(
			'Fetching users failed, please try again later.',
			500
		);
		return next(error);
	}
	return res.json({
		users: users.map((user) => user.toObject({ getters: true })),
	});
};

const getUserFriends = (req, res, next) => {
	const userId = req.params.uid;
	const friends = USERS.find((user) => {
		return user.id === userId ? user.friends : [];
	});

	res.json({ friends: friends });
};

const getUserProfile = async (req, res, next) => {
	const userId = req.params.uid;
	console.log(userId);
	let user;
	try {
		user = await User.findById(userId).exec();
	} catch (err) {
		const error = new HttpError(
			'Something went wrong, could not find the user.',
			500
		);
		return next(error);
	}
	if (!user) {
		const error = new HttpError(
			'Could not find a user for the provided id.',
			404
		);
		return next(error);
	}

	res.json({ user: user.toObject({ getters: true }) });
};

const updateUserProfile = (req, res, next) => {
	const {
		username,
		password,
		email,
		firstname,
		middlename,
		lastname,
		image,
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
	updateProfile.image = image;
	USERS[userIndex] = updateProfile;

	res.status(200).json({ user: updateProfile });
};

const signup = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		// res.json({ errors: errors });
		return next(
			new HttpError('Invalid inputs passed, check your data.', 422)
		);
	}

	const {
		username,
		password,
		email,
		firstname,
		middlename,
		lastname,
		// image,
		// friends,
		// blogs,
	} = req.body;

	let existingUser;
	try {
		existingUser = await User.findOne({ email: email });
	} catch (err) {
		const error = new HttpError(
			'Signing up failed, please try again later FindOne.',
			500
		);
		return next(error);
	}

	if (existingUser) {
		const error = new HttpError(
			'User already exist, please login instead.',
			422
		);
		return next(error);
	}
	const createdUser = new User({
		username,
		email,
		password,
		firstname,
		middlename,
		lastname,
		image: req.file.path.replace(/\\/g, '/'),
		blogs: [],
		friends: [],
	});

	console.log(createdUser);

	try {
		await createdUser.save();
	} catch (err) {
		const error = new HttpError(
			'Signing up failed, undable to save data, please try again later.',
			500
		);
		return next(error);
	}
	res.status(201).json({
		user: createdUser.toObject({ getters: true }),
		message: 'Signed up successfully.',
	});
};

const login = async (req, res, next) => {
	const { username, password } = req.body;

	let existingUser;
	try {
		existingUser = await User.findOne({ username: username });
	} catch (err) {
		const error = new HttpError(
			'Logging in failed, please try again later.',
			500
		);
		return next(error);
	}

	if (!existingUser || existingUser.password !== password) {
		const error = new HttpError(
			'Invalid credentials, could not log you in.',
			401
		);
		return next(error);
	}

	res.status(201).json({
		user: existingUser.toObject({ getters: true }),
		message: 'Logged In',
	});
};
exports.getUsers = getUsers;
exports.getUserFriends = getUserFriends;
exports.getUserProfile = getUserProfile;
exports.updateUserProfile = updateUserProfile;
exports.signup = signup;
exports.login = login;
