// routes/admin.js
const express = require("express");
const router = express.Router();
const User = require("../models/User"); 
const UserLog = require("../models/UserLog"); 
const { protect, adminOnly } = require('../middleware/authMiddleware');


router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({}, "-password"); 
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/userLogs",  protect, adminOnly, async (req, res) => {
  try {
    const logs = await UserLog.find().sort({ loginTime: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
});

router.delete("/userLogs/:id",  protect, adminOnly, async (req, res) => {
  try {
    await UserLog.findByIdAndDelete(req.params.id);
    res.json({ message: "Log deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete log" });
  }
});


module.exports = router;