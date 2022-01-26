const mongoose = require("mongoose");
require("dotenv").config();
const data = require("./data");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const { connectDB } = require("./config/db");

connectDB();

const importData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		const createdUsers = await User.insertMany(data.data.users);

		const adminUser = createdUsers[0]._id;

		const sampleProducts = data.data.products.map(p => {
			return { ...p, user: adminUser };
		});

		await Product.insertMany(sampleProducts);

		console.log("Data Imported");
		process.exit();
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		console.log("Data Destroyed");
		process.exit();
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

if (process.argv[2] === "-d") {
	destroyData();
} else {
	importData();
}
