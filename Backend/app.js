const express = require("express");
const app = express();
const cookies = require("cookie-parser");
const users = require("./Routes/userRoutes");
const error = require("./Middlewares/error");
const products = require('./Routes/productRoutes');

app.use(express.json());
app.use(cookies());

app.use("/skygoaltech/", users);
app.use("/skygoaltech/", products);
app.use(error);

module.exports = app;
