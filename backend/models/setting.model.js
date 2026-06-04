const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    shopName: String,
    phone: String,
    whatsapp: String,
    address: String,
    instagram: String,
    facebook: String,
     email: String,
  password: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);