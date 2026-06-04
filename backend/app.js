const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const uploadRoutes = require("./routes/upload.routes");
const settingsRoutes = require("./routes/setting.routes");
const seedRoutes = require("./routes/seed.routes");


const app = express();

app.use(cors());

// BODY PARSER
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/seed", seedRoutes);


// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("GD API Running 🚀");
});

module.exports = app;