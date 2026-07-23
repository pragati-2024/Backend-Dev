const express = require("express");

const { echo } = require("../controllers/echoController");

const router = express.Router();

router.post("/echo", echo);

module.exports = router;
