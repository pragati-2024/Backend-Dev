const express = require("express");
const session = require("express-session");

const sessionRoutes = require("./routes/sessionRoutes");

const app = express();

// Fixed expiry example (no rolling refresh)
const SESSION_MAX_AGE_MS = 2 * 60 * 1000; // 2 minutes

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret-change-me",
    resave: false,
    saveUninitialized: true,
    rolling: false,
    cookie: {
      httpOnly: true,
      maxAge: SESSION_MAX_AGE_MS,
    },
  }),
);

// Create an explicit "startedAt" so we can compute expiry in UI.
app.use((req, res, next) => {
  if (!req.session.startedAt) {
    req.session.startedAt = Date.now();
  }
  next();
});

app.use("/", sessionRoutes(SESSION_MAX_AGE_MS));

module.exports = app;
