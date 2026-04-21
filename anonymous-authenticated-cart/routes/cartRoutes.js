const express = require("express");
const cartController = require("../controllers/cartController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", cartController.getHome);

router.get("/cart", cartController.getCart);
router.post("/cart/add", cartController.postAdd);
router.post("/cart/clear", cartController.postClear);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.getLogout);

module.exports = router;
