const express = require("express");
const sessionController = require("../controllers/sessionController");

module.exports = function sessionRoutes(sessionMaxAgeMs) {
  const router = express.Router();

  router.get("/", sessionController.getHome(sessionMaxAgeMs));
  router.get(
    "/session-info",
    sessionController.getSessionInfo(sessionMaxAgeMs),
  );
  router.get("/ping", sessionController.getPing);
  router.get("/reset", sessionController.getReset);

  return router;
};
