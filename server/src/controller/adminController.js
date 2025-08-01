const User = require("../models/User");
const UserLog = require("../models/UserLog");
require("dotenv").config();

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET all user logs
const getUserLogs = async (req, res) => {
  try {
    const logs = await UserLog.find().sort({ loginTime: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};

// DELETE a specific user log by ID
const deleteUserLog = async (req, res) => {
  try {
    await UserLog.findByIdAndDelete(req.params.id);
    res.json({ message: "Log deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete log" });
  }
};


module.exports = {
  getUsers,
  getUserLogs,
  deleteUserLog,
};