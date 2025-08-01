
const express = require("express");
const User = require("../models/User");
const UserLog = require("../models/UserLog");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authController = require("../controller/authController");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
