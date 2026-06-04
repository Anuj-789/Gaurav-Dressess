import { useEffect, useState } from "react";
import api from "../api/axios";
import Sidebar from "../component/Sidebar";

export default function Settings() {
  const [form, setForm] = useState({
    shopName: "Anuj Gupta Dresses",
    phone: "9128405832",
    whatsapp: "9128405832",
    address: "Anuj Gupta, Bihar",
    instagram: "",
    facebook: "",
    email: "anuj@gmail.com",
    password: "12345",
  });

  const [loading, setLoading] = useState(false);

  // FETCH SETTINGS
  const fetchSettings = async () => {
    try {
      const res = await api.get("/api/settings");

      if (res.data) {
        setForm(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // UPDATE SETTINGS
  const updateSettings = async () => {
    setLoading(true);
    try {
      await api.put("/api/settings", form);
      alert("Settings Updated");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-4 md:ml-64">

        <h1 className="text-2xl font-bold mb-4">
          Settings
        </h1>

        <div className="bg-white p-4 rounded shadow space-y-3">

  {/* SHOP NAME */}
  <div>
    <label className="block text-sm font-medium mb-1">
      Shop Name
    </label>
    <input
      className="border p-2 w-full rounded"
      value={form.shopName}
      onChange={(e) =>
        setForm({ ...form, shopName: e.target.value })
      }
    />
  </div>

  {/* PHONE */}
  <div>
    <label className="block text-sm font-medium mb-1">
      Phone Number
    </label>
    <input
      className="border p-2 w-full rounded"
      value={form.phone}
      onChange={(e) =>
        setForm({ ...form, phone: e.target.value })
      }
    />
  </div>

  {/* WHATSAPP */}
  <div>
    <label className="block text-sm font-medium mb-1">
      WhatsApp Number
    </label>
    <input
      className="border p-2 w-full rounded"
      value={form.whatsapp}
      onChange={(e) =>
        setForm({ ...form, whatsapp: e.target.value })
      }
    />
  </div>

  {/* ADDRESS */}
  <div>
    <label className="block text-sm font-medium mb-1">
      Address
    </label>
    <input
      className="border p-2 w-full rounded"
      value={form.address}
      onChange={(e) =>
        setForm({ ...form, address: e.target.value })
      }
    />
  </div>

  {/* INSTAGRAM */}
  <div>
    <label className="block text-sm font-medium mb-1">
      Instagram Link
    </label>
    <input
      className="border p-2 w-full rounded"
      value={form.instagram}
      onChange={(e) =>
        setForm({ ...form, instagram: e.target.value })
      }
    />
  </div>

  {/* FACEBOOK */}
  <div>
    <label className="block text-sm font-medium mb-1">
      Facebook Link
    </label>
    <input
      className="border p-2 w-full rounded"
      value={form.facebook}
      onChange={(e) =>
        setForm({ ...form, facebook: e.target.value })
      }
    />
  </div>

  {/* EMAIL */}
  <div>
    <label className="block text-sm font-medium mb-1">
      Email
    </label>
    <input
      className="border p-2 w-full rounded"
      value={form.email}
      onChange={(e) =>
        setForm({ ...form, email: e.target.value })
      }
    />
  </div>

  {/* PASSWORD */}
  <div>
    <label className="block text-sm font-medium mb-1">
      Password
    </label>
    <input
      type="password"
      className="border p-2 w-full rounded"
      value={form.password}
      onChange={(e) =>
        setForm({ ...form, password: e.target.value })
      }
    />
  </div>

  {/* SAVE BUTTON */}
  <button
    onClick={updateSettings}
    className="bg-green-500 text-white px-4 py-2 rounded w-full"
  >
    Save Settings
  </button>

</div>

      </div>
    </div>
  );
}