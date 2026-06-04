import { useEffect, useState } from "react";
import api from "../api/axios";
import Sidebar from "../component/Sidebar";
import ProductModal from "../component/ProductModal";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // FETCH
  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // DELETE
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // SEARCH
  const filtered = products.filter((p) =>
    (p.category || "").toLowerCase().includes(search.toLowerCase()) ||
    (p.description || "").toLowerCase().includes(search.toLowerCase()) ||
    (p.productCode || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-4 md:p-6 md:ml-64 mt-16 md:mt-0">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">

          <h1 className="text-2xl font-bold">
            Products
          </h1>

          <button
            onClick={() => setEditProduct({})}
            className="bg-green-500 text-white px-4 py-2 rounded shadow w-full md:w-auto"
          >
            + Add Product
          </button>

        </div>

        {/* SEARCH */}
        <input
          className="border p-2 w-full mb-4 rounded shadow-sm"
          placeholder="Search by category, description, code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* LIST */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid gap-4">

            {filtered.length === 0 ? (
              <p className="text-center">No products found</p>
            ) : (
              filtered.map((p) => (
                <div
                  key={p._id}
                  className="bg-white p-4 rounded shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
                >

                  {/* LEFT SIDE */}
                  <div className="flex items-start gap-4">

                    <img
                      src={
                        p.image ||
                        p.variants?.[0]?.image ||
                        "https://via.placeholder.com/80"
                      }
                      className="w-16 h-16 object-cover rounded border"
                    />

                    <div>

                      <h2 className="font-semibold text-lg">
                        {p.category}
                      </h2>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {p.description}
                      </p>

                      <p className="text-sm font-bold text-green-600 mt-1">
                        ₹{p.price}
                      </p>

                    </div>

                  </div>

                  {/* VARIANTS */}
                  <div className="flex flex-wrap gap-2">

                    {p.variants?.map((v, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 border px-2 py-1 rounded bg-gray-50"
                      >

                        {v.image && (
                          <img
                            src={v.image}
                            className="w-8 h-8 object-cover rounded border"
                          />
                        )}

                        <span className="text-xs font-medium">
                          {v.color} - ₹{v.price}
                        </span>

                      </div>
                    ))}

                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-2 w-full md:w-auto">

                    <button
                      onClick={() => setEditProduct(p)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm w-1/2 md:w-auto"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm w-1/2 md:w-auto"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))
            )}

          </div>
        )}

      </div>

      {/* MODAL */}
      {editProduct && (
        <ProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          refresh={fetchProducts}
        />
      )}

    </div>
  );
}