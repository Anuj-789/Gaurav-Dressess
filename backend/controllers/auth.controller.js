const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");

// LOGIN
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 🔥 TOKEN DIRECT YAHAN BAN RAHA HAI
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ME API
const getMe = async (req, res) => {
  try {
    res.json(req.admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginAdmin, getMe };