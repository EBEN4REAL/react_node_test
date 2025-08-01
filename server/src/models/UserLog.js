const mongoose = require("mongoose");

const userLogSchema = new mongoose.Schema({
  username: String,
  role: String,
  jwtToken: String,
  loginTime: Date,
  logoutTime: Date,
  ipAddress: String,
});

module.exports = mongoose.model("UserLog", userLogSchema);
