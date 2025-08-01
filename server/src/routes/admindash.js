const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const adminController = require("../controller/adminController");

router.get("/users", protect, adminOnly, adminController.getUsers);
router.get("/userLogs", protect, adminOnly, adminController.getUserLogs);
router.delete("/userLogs/:id", protect, adminOnly, adminController.deleteUserLog);

module.exports = router;
