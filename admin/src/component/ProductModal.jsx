import { useEffect, useState } from "react";
import api from "../api/axios";
import { uploadImage } from "../api/upload";

export default function ProductModal({ product, onClose, refresh }) {
  const isEdit = product && product._id;

  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    category: "",
    description: "",
    price: "",
    image: "",
    variants: [],
  });

  const [variant, setVariant] = useState({
    color: "",
    price: "",
    image: "",
  });

  // 🔥 LOAD CATEGORIES
  const fetchCategories = async () => {
    const res = await api.get("/api/categories");
    setCategories(res.data);
  };

  // 🔥 LOAD PRODUCT (EDIT MODE)
  useEffect(() => {
    fetchCategories();

    if (isEdit) {
      setForm({
        category: product.category || "",
        description: product.description || "",
        price: product.price || "",
        image: product.image || "",
        variants: product.variants || [],
      });
    } else {
      setForm({
        category: "",
        description: "",
        price: "",
        image: "",
        variants: [],
      });
    }
  }, [product]);

  // 🔥 MAIN IMAGE UPLOAD
 const handleMainImage = async (e) => {
  const file = e.target.files[0];

  try {
    setUploading(true);

    const url = await uploadImage(file);

    setForm((prev) => ({ ...prev, image: url }));
  } catch (err) {
    console.log(err);
    alert("Image upload failed");
  } finally {
    setUploading(false);
  }
};
  // 🔥 VARIANT IMAGE UPLOAD
 const handleVariantImage = async (e) => {
  const file = e.target.files[0];

  try {
    setUploading(true);

    const url = await uploadImage(file);

    setVariant((prev) => ({ ...prev, image: url }));
  } catch (err) {
    console.log(err);
    alert("Image upload failed");
  } finally {
    setUploading(false);
  }
};

  // ➕ ADD VARIANT
  const addVariant = () => {
  if (!variant.color) {
    return alert("Color required");
  }

  const newVariant = {
    color: variant.color,
    price: Number(variant.price) || 0,
    image: variant.image || "",
  };

  setForm((prev) => ({
    ...prev,
    variants: [...prev.variants, newVariant],
  }));

  setVariant({
    color: "",
    price: "",
    image: "",
  });
};

const editVariant = (index) => {
  const selected = form.variants[index];

  setVariant({
    color: selected.color || "",
    price: selected.price || "",
    image: selected.image || "",
  });

  setForm((prev) => ({
    ...prev,
    variants: prev.variants.filter((_, i) => i !== index),
  }));
};


const deleteVariant = (index) => {
  if (!window.confirm("Delete variant?")) return;

  setForm((prev) => ({
    ...prev,
    variants: prev.variants.filter((_, i) => i !== index),
  }));
};

  // 💾 SAVE PRODUCT
// 💾 SAVE PRODUCT (FINAL FIX)

const submit = async () => {
  try {
    const cleanForm = {
      ...form,
      price: Number(form.price) || 0,
      variants: form.variants.map(v => ({
        ...v,
        price: Number(v.price) || 0,
      })),
    };

    console.log("SENDING CLEAN =>", cleanForm);

    if (isEdit) {
      await api.put(`/api/products/${product._id}`, cleanForm);
    } else {
      await api.post("/api/products", cleanForm);
    }

    refresh();
    onClose();
  } catch (err) {
    console.log("ERROR =>", err.response?.data || err);
    alert(err.response?.data?.message || "Error saving product");
  }
};
return (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 z-50">
    <div className="bg-white w-full max-w-2xl p-5 rounded-lg max-h-[90vh] overflow-y-auto">

      <h2 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Product" : "Add Product"}
      </h2>

      {/* CATEGORY */}
      <label className="block font-medium mb-1">
        Category
      </label>

      

      <select
        className="border p-2 w-full mb-3 rounded"
        value={form.category}
        onChange={(e) =>
          setForm({
            ...form,
            category: e.target.value,
          })
        }
      >
        <option value="">Select Category</option>

        {categories.map((c) => (
          <option key={c._id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>



      {/* DESCRIPTION */}
      <label className="block font-medium mb-1">
        Description
      </label>

      <textarea
        className="border p-2 w-full mb-3 rounded"
        rows="4"
        placeholder="Product Description"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
      />

      {/* MAIN PRICE */}
      <label className="block font-medium mb-1">
        Base Price
      </label>

      <input
        type="number"
        className="border p-2 w-full mb-3 rounded"
        placeholder="Product Price"
        value={form.price}
        onChange={(e) =>
          setForm({
            ...form,
            price: e.target.value,
          })
        }
      />

      {/* MAIN IMAGE */}
      <label className="block font-medium mb-1">
        Product Image
      </label>

      <input
        type="file"
        className="border p-2 w-full mb-3 rounded"
        onChange={handleMainImage}
      />

      {form.image && (
        <img
          src={form.image}
          alt="Product"
          className="w-24 h-24 object-cover rounded border mb-4"
        />
      )}
      {uploading && (
  <p className="text-blue-500 text-sm mb-2">
    Uploading image...
  </p>
)}

      {/* VARIANT SECTION */}
      <div className="border rounded-lg p-4 mt-4 bg-gray-50">

        <h3 className="font-bold text-lg mb-3">
          Add Variant
        </h3>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Color"
          value={variant.color}
          onChange={(e) =>
            setVariant({
              ...variant,
              color: e.target.value,
            })
          }
        />

        <input
          type="number"
          className="border p-2 w-full mb-3 rounded"
          placeholder="Variant Price"
          value={variant.price}
          onChange={(e) =>
            setVariant({
              ...variant,
              price: e.target.value,
            })
          }
        />

        <input
          type="file"
          className="border p-2 w-full mb-3 rounded"
          onChange={handleVariantImage}
        />

        {variant.image && (
          <img
            src={variant.image}
            alt="Variant"
            className="w-20 h-20 object-cover rounded border mb-3"
          />
        )}
<button
  type="button"
  onClick={addVariant}
  disabled={uploading}
  className={`px-4 py-2 rounded text-white ${
    uploading ? "bg-gray-400" : "bg-blue-500"
  }`}
>
  {uploading ? "Uploading..." : "Add Variant"}
</button>

      </div>

      {/* VARIANTS LIST */}
      {form.variants.length > 0 && (
        <div className="mt-5">

          <h3 className="font-bold text-lg mb-3">
            Added Variants
          </h3>

          {form.variants.map((v, i) => (
            <div
              key={i}
              className="border rounded-lg p-3 mb-3 bg-white shadow-sm"
            >

              <div className="flex justify-between items-center">

                <div>
                  <p className="font-semibold">
                    {v.color}
                  </p>

                  <p className="text-gray-600">
                    ₹{v.price}
                  </p>
                </div>

                {v.image && (
                  <img
                    src={v.image}
                    alt={v.color}
                    className="w-16 h-16 object-cover rounded border"
                  />
                )}

              </div>

              <div className="flex gap-2 mt-3">

                <button
                  type="button"
                  onClick={() => editVariant(i)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => deleteVariant(i)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={onClose}
          className="border px-4 py-2 rounded"
        >
          Cancel
        </button>

        <button
          onClick={submit}
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          {isEdit ? "Update Product" : "Save Product"}
        </button>

      </div>

    </div>
  </div>
);
}