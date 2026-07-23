const express = require("express");

const { getRoot } = require("../controllers/rootController");
const sessionRoutes = require("./sessionRoutes");

const router = express.Router();

router.get("/", getRoot);
router.use("/", sessionRoutes);

module.exports = router;
