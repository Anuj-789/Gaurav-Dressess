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
useDisableZoom();
  // 🔥 animation trigger state
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setAnimate(false); // reset animation first

    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);

      // 🔥 trigger animation AFTER load
      setTimeout(() => {
        setAnimate(true);
      }, 50);
    }
  };

  // CATEGORY CLICK
  const handleCategory = async (cat) => {
    setSelectedCategory(cat);

    setAnimate(false); // restart animation

    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setAnimate(true);
      }, 50);
    }
  };

  // FILTER
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

    const searched = baseProducts.filter((p) => {
      const name = (p.name || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();

      return name.includes(searchText) || desc.includes(searchText);
    });

    return searched.length > 0 ? searched : baseProducts;
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