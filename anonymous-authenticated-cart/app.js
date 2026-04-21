const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    },
  }),
);

app.use("/", cartRoutes);

module.exports = app;
