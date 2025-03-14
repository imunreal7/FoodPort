const express = require("express");
require("dotenv").config();

var cors = require("cors");
const app = express();
const products = require("./routes/productRoutes");
const restaurants = require("./routes/restaurantRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const mongoose = require("mongoose");
const port = process.env.PORT;

app.use(cors());

mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

app.use(express.json());

app.use("/api", products);
app.use("/api", restaurants);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.listen(port, () => {
    console.log(`App Running on port ${port}`);
});

