import { useEffect, useState } from "react";
import api from "../api/axios";
import allImage from "../assets/all-gif.gif";

export default function CategoryScroll({ onSelect }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/150";
    if (img.startsWith("http")) return img;
    if (img.startsWith("data:image")) return img;
    return `${import.meta.env.VITE_API_URL}/${img}`;
  };

  return (
    <div className="bg-white py-4 border-b shadow-sm">

      <div className="max-w-7xl mx-auto">

        <div className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto px-4 no-scrollbar">

          {/* 🟣 ALL CATEGORY (LEFT ANIMATION) */}
          <div
            onClick={() => onSelect("All")}
            className="flex flex-col items-center cursor-pointer min-w-fit slide-left"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-md bg-gray-100 hover:scale-110 transition">
              <img src={allImage} className="w-full h-full object-cover" />
            </div>
            <span className="mt-2 text-xs font-medium text-gray-700">
              All
            </span>
          </div>

          {/* 🔵 OTHER CATEGORIES (RIGHT ANIMATION) */}
          {categories.map((cat, index) => (
            <div
              key={cat._id}
              onClick={() => onSelect(cat.name)}
              className="flex flex-col items-center cursor-pointer min-w-fit slide-right"
              style={{
                animationDelay: `${index * 90}ms`,
              }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-md bg-gray-100 hover:scale-110 transition">
                <img
                  src={getImageUrl(cat.image)}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="mt-2 text-xs md:text-sm font-medium text-gray-700 truncate max-w-[90px]">
                {cat.name}
              </span>
            </div>
          ))}

        </div>

      </div>

      {/* hide scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

    </div>
  );
}