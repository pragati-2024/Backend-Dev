const express = require("express");

const { auth } = require("../middleware/auth");
const {
  login,
  ping,
  logout,
  listSessions,
} = require("../controllers/sessionController");

const router = express.Router();

router.post("/login", login);
router.post("/ping", auth, ping);
router.post("/logout", auth, logout);
router.get("/sessions", listSessions);

module.exports = router;
