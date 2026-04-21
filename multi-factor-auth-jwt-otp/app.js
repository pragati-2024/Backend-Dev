const express = require("express");

const authRoutes = require("./routes/authRoutes");
const sensitiveRoutes = require("./routes/sensitiveRoutes");

function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ ok: true, message: "Exercise 2: MFA middleware (JWT + OTP)." });
  });

  app.use(authRoutes);
  app.use(sensitiveRoutes);

  return app;
}

module.exports = { createApp };
