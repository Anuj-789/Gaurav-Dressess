import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const phone = "9128405832";
  const navigate = useNavigate();

  const [added, setAdded] = useState(false);

  // 🖼️ SAFE IMAGE FUNCTION (IMPORTANT FIX)
  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/300";

    if (img.startsWith("http")) return img;

    return `${import.meta.env.VITE_API_URL}/${img}`;
  };

  // 🛒 ADD TO CART
  const addToCart = (e) => {
    e.stopPropagation();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((p) => p._id === product._id);

    if (!exists) {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // 📦 WHATSAPP ORDER
  const buyNow = (e) => {
    e.stopPropagation();

    const name = product?.name || "Product";

    const category =
      product?.category?.name ||
      product?.category ||
      "N/A";

    const color =
      product?.selectedVariant?.color ||
      product?.color ||
      "Normal";

    const price =
      product?.selectedVariant?.price ||
      product?.price ||
      0;

    const image =
      product?.selectedVariant?.image ||
      product?.image ||
      "";

    let msg = `🛍️ *Gaurav Dresses Order*\n\n`;
    msg += `━━━━━━━━━━━━━━\n`;
    msg += `📦 ${name}\n`;
    msg += `📂 Category: ${category}\n`;
    msg += `🎨 Color: ${color}\n`;
    msg += `💰 Price: ₹${price}\n`;

    if (image) msg += `🖼️ ${image}\n`;

    msg += `━━━━━━━━━━━━━━`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
    );
  };

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="
        bg-white
        rounded-xl
        overflow-hidden
        cursor-pointer
        border border-gray-100
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-1
        transition-all duration-300
        w-full
      "
    >
      {/* IMAGE */}
      <div className="overflow-hidden bg-gray-100">
        <img
          src={getImageUrl(product.image)}
          alt={product.name}
          className="
            w-full
            h-44 sm:h-48 md:h-52 lg:h-60
            object-cover
            transition-transform duration-300
            hover:scale-105
          "
        />
      </div>

      {/* CONTENT */}
      <div className="p-2 lg:p-4">
        <div className="text-xs md:text-sm text-gray-500 line-clamp-1">
          <span className="font-semibold text-purple-600">
            {product.category?.name || product.category}
          </span>

          {product.description && <> • {product.description}</>}
        </div>

        <div className="mt-2">
          <span className="text-purple-700 font-bold">
            ₹{product.price}
          </span>
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={addToCart}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition ${
              added
                ? "bg-green-100 text-green-600"
                : "bg-purple-100 text-purple-700"
            }`}
          >
            {added ? "✓ Added" : "🛒 Cart"}
          </button>

          <button
            onClick={buyNow}
            className="flex-1 py-2 rounded-lg text-xs font-medium text-white bg-purple-700"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}