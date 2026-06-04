const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// CREATE DEFAULT ADMIN (RUN ONLY ONCE)
router.post("/init", async (req, res) => {
  try {
    const exists = await User.findOne({ email: "anuj@gmail.com" });

    if (exists) {
      return res.json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash("12345", 10);

    const user = await User.create({
      email: "anuj@gmail.com",
      password: hashedPassword,
    });

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;