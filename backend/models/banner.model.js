const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
    link: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);