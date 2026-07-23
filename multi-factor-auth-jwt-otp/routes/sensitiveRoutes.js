const express = require("express");

const { mfaAuth } = require("../middleware/mfaAuth");
const { sensitiveOperation } = require("../controllers/sensitiveController");

const router = express.Router();

router.post("/sensitive", mfaAuth, sensitiveOperation);

module.exports = router;
