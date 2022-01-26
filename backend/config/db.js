const mongoose = require("mongoose");

exports.connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI);

		console.log("Connected To Database");
	} catch (error) {
		console.error(`Error : ${error.message}`);
		process.exit(1);
	}
};
