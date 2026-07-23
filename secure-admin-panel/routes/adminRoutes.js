const express = require("express");
const adminController = require("../controllers/adminController");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.get(
  "/admin",
  requireAuth,
  requireRole("admin"),
  adminController.getAdminHome,
);
router.get(
  "/admin/stats",
  requireAuth,
  requireRole("admin"),
  adminController.getAdminStats,
);

module.exports = router;
