const Product = require("../models/product.model");

// ======================
// CREATE PRODUCT
// ======================
const addProduct = async (req, res) => {
  try {
    const data = req.body;

    data.price = Number(data.price) || 0;

    // 🔥 AUTO PRODUCT CODE GENERATION (4 DIGIT)
    if (!data.productCode) {
      data.productCode = Math.floor(1000 + Math.random() * 9000).toString();
    }

    if (data.variants) {
      data.variants = data.variants.map(v => ({
        ...v,
        price: Number(v.price) || 0,
      }));
    }

    const product = await Product.create(data);

    res.status(201).json(product);
  } catch (error) {
    console.log("ADD PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ======================
// GET ALL PRODUCTS
// ======================
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================
// GET SINGLE PRODUCT
// ======================
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // views increase
    product.views = (product.views || 0) + 1;
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================
// UPDATE PRODUCT
// ======================
const updateProduct = async (req, res) => {
  try {
    const data = req.body;

    data.price = Number(data.price) || 0;

    // ❌ productCode change mat hone do (safe fix)
    delete data.productCode;

    if (data.variants) {
      data.variants = data.variants.map(v => ({
        ...v,
        price: Number(v.price) || 0,
      }));
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json(product);
  } catch (error) {
    console.log("UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
// ======================
// DELETE PRODUCT
// ======================
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================
// SEARCH PRODUCTS (FIXED)
// ======================
const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    let filter = {};

    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { productCode: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    const products = await Product.find(filter);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================
// EXPORTS (SINGLE CLEAN EXPORT)
// ======================
module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};