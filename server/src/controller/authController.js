const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const UserLog = require("../models/UserLog");

const egister = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ fullName, email, password: hashedPassword, role: role || "user" });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      role: user.role,
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    if (role && user.role !== role) {
      return res.status(403).json({ message: "Unauthorized login attempt" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    await UserLog.create({
      username: user.fullName,
      role: user.role,
      jwtToken: token,
      loginTime: new Date(),
      ipAddress: req.ip,
    });

    res.json({ message: "Login successful", token, role: user.role, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET);

    await UserLog.findOneAndUpdate(
      { jwtToken: token },
      { logoutTime: new Date() }
    );

    res.json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token or session" });
  }
};

module.exports = { register, login, logout };