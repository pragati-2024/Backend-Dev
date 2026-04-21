const express = require("express");
const cookieParser = require("cookie-parser");

const languageRoutes = require("./routes/languageRoutes");

const app = express();

app.use(cookieParser());

app.use("/", languageRoutes);

module.exports = app;
