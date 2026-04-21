const express = require("express");
const languageController = require("../controllers/languageController");

const router = express.Router();

router.get("/", languageController.getHome);
router.get("/lang/:lang", languageController.setLanguage);
router.get("/clear", languageController.clearLanguage);

module.exports = router;
