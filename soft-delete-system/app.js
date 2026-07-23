const express = require("express");

const todoRoutes = require("./routes/todoRoutes");

function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({
      ok: true,
      message: "Exercise 4: Soft delete with Mongoose middleware.",
    });
  });

  app.use("/", todoRoutes);

  return app;
}

module.exports = { createApp };
