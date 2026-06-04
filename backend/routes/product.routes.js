const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const { searchProducts } = require("../controllers/product.controller");
router.get("/search", searchProducts);
router.post("/", addProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


module.exports = router;