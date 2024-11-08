const express = require("express");
require("dotenv").config();

var cors = require("cors");
const app = express();
const products = require("./routes/productRoutes");
const restaurants = require("./routes/restaurantRoutes");
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

app.use(express.json()); //used for parsing so that always the data return in json
app.use("/api", products);
app.use("/api", restaurants);
app.listen(port, () => {
    console.log(`App Running on port ${port}`);
});

