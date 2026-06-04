import { useEffect, useState } from "react";
import api from "../api/axios";
import Sidebar from "../component/Sidebar";

export default function AdminCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [editId, setEditId] = useState(null);

  // GET ALL
  const fetchCategories = async () => {
    const res = await api.get("/api/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // IMAGE HANDLE
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // SAVE CATEGORY
  const saveCategory = async () => {
    if (!name) return alert("Enter category");

    const payload = {
      name,
      image,
    };

    try {
      if (editId) {
        await api.put(`/api/categories/${editId}`, payload);
      } else {
        await api.post("/api/categories", payload);
      }

      setName("");
      setImage("");
      setPreview("");
      setEditId(null);

      fetchCategories();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  // DELETE
  const deleteCategory = async (id) => {
    if (!window.confirm("Delete category?")) return;

    await api.delete(`/api/categories/${id}`);
    fetchCategories();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 md:ml-64">

        <h1 className="text-2xl font-bold mb-6">
          Category Management
        </h1>

        {/* FORM */}
        <div className="bg-white p-4 rounded shadow mb-6">

          <div className="flex flex-col gap-3">

            <input
              className="border p-2 rounded"
              placeholder="Enter category (Kurti, Nighty, Gown...)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="border p-2 rounded"
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-24 h-24 object-cover rounded border"
              />
            )}

            <button
              onClick={saveCategory}
              className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              {editId ? "Update Category" : "Add Category"}
            </button>

          </div>
        </div>

        {/* LIST */}
        <div className="bg-white shadow rounded">

          {categories.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No Categories Found
            </div>
          ) : (
            categories.map((c) => (
              <div
                key={c._id}
                className="flex justify-between items-center p-3 border-b"
              >

                <div className="flex items-center gap-3">

                  {c.image && (
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                  )}

                  <span className="font-medium">
                    {c.name}
                  </span>

                </div>

                <div className="flex gap-2">

                  <button
                    onClick={() => {
                      setName(c.name);
                      setImage(c.image || "");
                      setPreview(c.image || "");
                      setEditId(c._id);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCategory(c._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}