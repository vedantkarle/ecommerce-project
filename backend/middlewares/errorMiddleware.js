const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

const errorHandler = (err, req, res, next) => {
	const errorStatus = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(errorStatus);
	res.json({
		message: err.message,
	});
};

module.exports = {
	notFound,
	errorHandler,
};
