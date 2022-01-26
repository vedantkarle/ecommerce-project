const express = require("express");
const { connectDB } = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
require("dotenv").config();

const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () =>
	console.log("listening on port 5000"),
);
