const mongoose = require("mongoose");

// VARIANT
const variantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: "" },
});

// PRODUCT
const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true, // Kurti, Nighty, Gown
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    variants: [variantSchema],

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);