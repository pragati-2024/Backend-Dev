const express = require("express");
const session = require("express-session");

const registrationRoutes = require("./routes/registrationRoutes");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    },
  }),
);

app.use("/register", registrationRoutes);

app.get("/", (req, res) => {
  res.send(
    `
    <h1>Multi-Step Registration (Sessions)</h1>
    <p><a href="/register/step-one">Start registration</a></p>
    `,
  );
});

module.exports = app;
