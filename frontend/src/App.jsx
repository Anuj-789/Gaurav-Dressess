import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* 🏠 HOME PAGE */}
        <Route path="/" element={<Home />} />

        {/* 👗 PRODUCT DETAIL PAGE */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* 🛒 CART PAGE */}
        <Route path="/cart" element={<Cart />} />

      </Routes>

    </BrowserRouter>
  );
}