import { useState } from "react";

export default function SearchBar({ setSearch }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const text = e.target.value;
    setValue(text);
    setSearch(text); // 🔥 LIVE UPDATE TO HOME
  };

  return (
    <div className="w-full px-3 py-2 bg-white">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search products..."
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />
    </div>
  );
}