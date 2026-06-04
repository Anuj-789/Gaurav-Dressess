import { useEffect, useState } from "react";
import api from "../api/axios";
import Sidebar from "../component/Sidebar";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());

  // LIVE CLOCK
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get("/api/products"),
          api.get("/api/categories"),
        ]);

        setProducts(prodRes.data);
        setCategories(catRes.data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalProducts = products.length;
  const totalCategories = categories.length;

  // CATEGORY BREAKDOWN (from products)
  const categoryMap = {};
  products.forEach((p) => {
    if (p.category) {
      categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 flex">

      <Sidebar />

      <div className="flex-1 p-3 sm:p-4 md:p-6 md:ml-64 mt-16 md:mt-0">

        {/* HEADER */}
        <div className="mb-5">

          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            📅 {time.toLocaleDateString()} • ⏰ {time.toLocaleTimeString()}
          </p>

        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

          {/* PRODUCTS */}
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white p-4 sm:p-5 rounded-xl shadow-lg">
            <p className="text-sm opacity-90">Total Products</p>
            <h2 className="text-2xl font-bold">
              {loading ? "..." : totalProducts}
            </h2>
          </div>

          {/* CATEGORIES */}
          <div className="bg-gradient-to-r from-emerald-500 to-green-700 text-white p-4 sm:p-5 rounded-xl shadow-lg">
            <p className="text-sm opacity-90">Total Categories</p>
            <h2 className="text-2xl font-bold">
              {loading ? "..." : totalCategories}
            </h2>
          </div>

          {/* STATUS */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 sm:p-5 rounded-xl shadow-lg">
            <p className="text-sm opacity-90">System Status</p>
            <h2 className="text-xl font-bold">
              Active 🟢
            </h2>
          </div>

        </div>

        {/* CATEGORY BREAKDOWN */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-5">

          <h2 className="font-bold text-gray-700 mb-4">
            Category Overview (From Products)
          </h2>

          {Object.keys(categoryMap).length === 0 ? (
            <p className="text-gray-500 text-sm">
              No category usage found in products
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">

              {Object.entries(categoryMap).map(([cat, count]) => (
                <div
                  key={cat}
                  className="bg-gray-50 border rounded-lg p-3 text-center hover:bg-gray-100"
                >
                  <p className="text-sm font-medium text-gray-700">
                    {cat}
                  </p>

                  <p className="text-blue-600 font-bold mt-1">
                    {count}
                  </p>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}