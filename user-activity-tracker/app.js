const express = require("express");

const indexRoutes = require("./routes");

function createApp() {
  const app = express();

  app.use(express.json());
  app.use("/", indexRoutes);

  return app;
}

module.exports = { createApp };
