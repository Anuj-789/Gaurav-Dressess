import { useState, useEffect } from "react";
import api from "../api/axios";
import { uploadImage } from "../api/upload";

export default function ProductForm({ onClose, refresh, editData }) {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    variants: [],
  });

  const [variant, setVariant] = useState({
    color: "",
    price: "",
    stock: "",
    images: [],
  });

  // -----------------------------
  // PREFILL FOR EDIT
  // -----------------------------
  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name || "",
        description: editData.description || "",
        category: editData.category || "",
        subCategory: editData.subCategory || "",
        variants: editData.variants || [],
      });
    }
  }, [editData]);

  // -----------------------------
  // GET CATEGORIES
  // -----------------------------
  useEffect(() => {
    const fetchCats = async () => {
      const res = await api.get("/api/categories");
      setCategories(res.data);
    };
    fetchCats();
  }, []);

  // -----------------------------
  // ADD VARIANT
  // -----------------------------
  const addVariant = () => {
    if (!variant.color || !variant.price) return;

    setForm({
      ...form,
      variants: [...form.variants, variant],
    });

    setVariant({
      color: "",
      price: "",
      stock: "",
      images: [],
    });
  };

  // -----------------------------
  // SUBMIT (CREATE / UPDATE)
  // -----------------------------
  const submit = async () => {
    try {
      if (editData) {
        await api.put(`/api/products/${editData._id}`, form);
      } else {
        await api.post("/api/products", form);
      }

      refresh();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 z-50">

      <div className="bg-white w-full max-w-md p-4 rounded overflow-y-auto max-h-[90vh]">

        <h2 className="text-lg font-bold mb-3">
          {editData ? "Edit Product" : "Add Product"}
        </h2>

        {/* PRODUCT CODE */}
       

        {/* NAME */}
        <input
          className="border p-2 w-full mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* DESCRIPTION */}
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* CATEGORY */}
        <select
          className="border p-2 w-full mb-2"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* VARIANT SECTION */}
        <div className="border p-2 mb-2">

          <h3 className="font-semibold mb-2">Add Variant</h3>

          {/* COLOR */}
          <input
            className="border p-1 w-full mb-1"
            placeholder="Color"
            value={variant.color}
            onChange={(e) =>
              setVariant({ ...variant, color: e.target.value })
            }
          />

          {/* PRICE */}
          <input
            className="border p-1 w-full mb-1"
            placeholder="Price"
            value={variant.price}
            onChange={(e) =>
              setVariant({ ...variant, price: e.target.value })
            }
          />

          {/* STOCK */}
          <input
            className="border p-1 w-full mb-1"
            placeholder="Stock"
            value={variant.stock}
            onChange={(e) =>
              setVariant({ ...variant, stock: e.target.value })
            }
          />

          {/* IMAGE UPLOAD */}
          <input
            type="file"
            multiple
            className="border p-1 w-full mb-2"
            onChange={async (e) => {
              const files = Array.from(e.target.files);

              const urls = [];

              for (let file of files) {
                const url = await uploadImage(file);
                urls.push(url);
              }

              setVariant({ ...variant, images: urls });
            }}
          />

          <button
            onClick={addVariant}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add Variant
          </button>

          {/* VARIANT PREVIEW */}
          {form.variants.length > 0 && (
            <div className="mt-3">
              <h3 className="font-semibold mb-2">Variants Preview</h3>

              {form.variants.map((v, i) => (
                <div
                  key={i}
                  className="border p-2 rounded mb-2 bg-gray-50"
                >
                  <p className="font-medium">
                    {v.color} - ₹{v.price} - Stock: {v.stock}
                  </p>

                  <div className="flex gap-2 mt-2 flex-wrap">
                    {v.images?.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        className="w-12 h-12 object-cover rounded border"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between mt-3">

          <button onClick={onClose} className="text-red-500">
            Cancel
          </button>

          <button
            onClick={submit}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            {editData ? "Update" : "Save"}
          </button>

        </div>

      </div>
    </div>
  );
}