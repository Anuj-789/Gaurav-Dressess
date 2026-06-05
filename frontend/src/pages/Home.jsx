import { useEffect, useState } from "react";
import api from "../api/axios";
import useDisableZoom from "../hooks/useDisableZoom";
import ProductSkeleton from "../components/ProductSkeleton";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CategoryScroll from "../components/CategoryScroll";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const [animate, setAnimate] = useState(false);

  useDisableZoom();

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🧠 SAFE API CALL
  const fetchProducts = async () => {
    setLoading(true);
    setAnimate(false);

    try {
      const res = await api.get("/products");

      // safety check (important)
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("API Error:", err);
      setProducts([]);
    } finally {
      setLoading(false);

      setTimeout(() => {
        setAnimate(true);
      }, 80);
    }
  };

  // 📂 CATEGORY FILTER
  const handleCategory = async (cat) => {
    setSelectedCategory(cat);
    setAnimate(false);

    try {
      const res = await api.get("/products");
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
      setProducts([]);
    } finally {
      setTimeout(() => {
        setAnimate(true);
      }, 80);
    }
  };

  // 🔍 FILTER LOGIC (SAFE)
  const getFilteredProducts = () => {
    const searchText = search.toLowerCase().trim();

    let baseProducts =
      selectedCategory === "All"
        ? products
        : products.filter((p) => {
            const category = (p.category?.name || p.category || "")
              .toLowerCase()
              .trim();

            return category === selectedCategory.toLowerCase();
          });

    if (!searchText) return baseProducts;

    const searched = baseProducts.filter((p) => {
      const name = (p.name || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();

      return name.includes(searchText) || desc.includes(searchText);
    });

    return searched;
  };

  const finalProducts = getFilteredProducts();

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
        ) : finalProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No products found 😕
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">

            {finalProducts.map((product, index) => (
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
                style={{
                  transitionDelay: `${index * 60}ms`,
                }}
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