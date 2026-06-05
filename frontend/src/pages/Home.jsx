import { useEffect, useState } from "react";
import api from "../api/axios";
import useDisableZoom from "../hooks/useDisableZoom";

import ProductSkeleton from "../components/ProductSkeleton";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CategoryScroll from "../components/CategoryScroll";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import SplashScreen from "../components/SplashScreen";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const [animate, setAnimate] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  useDisableZoom();

  // ⚡ SPLASH ONLY ON FIRST SESSION OPEN
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("splashShown");

    if (!alreadyShown) {
      setShowSplash(true);
    }
  }, []);

  // ✔ CLOSE SPLASH
  const handleSplashFinish = () => {
    sessionStorage.setItem("splashShown", "true");
    setShowSplash(false);
  };

  // 📦 FETCH PRODUCTS
  const fetchProducts = async () => {
    setLoading(true);
    setAnimate(false);

    try {
      const res = await api.get("/api/products");
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("API Error:", err);
      setProducts([]);
    } finally {
      setLoading(false);
      setTimeout(() => setAnimate(true), 80);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 📂 CATEGORY HANDLER
  const handleCategory = (cat) => {
    setSelectedCategory(cat);
  };

  // 🔍 SMART FILTER
  const filteredProducts = products.filter((p) => {
    const searchText = search.toLowerCase().trim();

    const name = (p.name || "").toLowerCase();
    const desc = (p.description || "").toLowerCase();
    const category = (p.category?.name || p.category || "")
      .toLowerCase()
      .trim();

    const categoryMatch =
      selectedCategory === "All" ||
      category.includes(selectedCategory.toLowerCase());

    const searchMatch =
      !searchText ||
      name.includes(searchText) ||
      desc.includes(searchText) ||
      category.includes(searchText);

    return categoryMatch && searchMatch;
  });

  // ⚡ SPLASH RENDER FIRST
  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen flex flex-col">

      <Header />

      <SearchBar setSearch={setSearch} />

      <CategoryScroll onSelect={handleCategory} />

      <div className="flex-1 p-3">

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array(8).fill(0).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No products found 😕
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">

            {filteredProducts.map((product, index) => (
              <div
                key={product._id}
                className={`
                  transform transition-all duration-300 ease-out
                  ${
                    animate
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }
                `}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}

          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}