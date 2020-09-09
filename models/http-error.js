class HttpError extends Error {
	constructor(message, errorCode) {
		super(message);
		this.code = errorCode;
		console.log('Server:', message, errorCode);
	}
}

module.exports = HttpError;
