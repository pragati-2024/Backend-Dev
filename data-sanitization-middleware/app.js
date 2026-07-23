const express = require("express");

const { sanitizeInputs } = require("./middleware/sanitizeInputs");
const echoRoutes = require("./routes/echoRoutes");

function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({
      ok: true,
      message: "Exercise 5: Data sanitization middleware.",
    });
  });

  app.use(sanitizeInputs);
  app.use("/", echoRoutes);

  return app;
}

module.exports = { createApp };
