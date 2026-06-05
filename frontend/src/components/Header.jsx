import { useNavigate } from "react-router-dom";
import logo from "../assets/shop-logo.png";

export default function Header() {
  const navigate = useNavigate();

  const goCart = () => {
    navigate("/cart");
  };

  return (
    <div className="sticky top-0 z-50 shadow-md">

      {/* MARQUEE */}
      <div className="bg-purple-200 overflow-hidden py-1">
        <div className="marquee-track">

          <span className="marquee-item">
            ✨ Welcome to Gaurav Dresses • Latest Women's Fashion Collection 👗 • Premium Quality 💜 • Best Prices 🛍️ • New Arrivals Available 🎉 • Order Easily on WhatsApp 📲 • Hind Cinema Road, Ramnagar 📍
          </span>

          <span className="marquee-item">
            ✨ Welcome to Gaurav Dresses • Latest Women's Fashion Collection 👗 • Premium Quality 💜 • Best Prices 🛍️ • New Arrivals Available 🎉 • Order Easily on WhatsApp 📲 • Hind Cinema Road, Ramnagar 📍
          </span>

        </div>
      </div>

      {/* HEADER */}
      <div className="p-1 bg-gradient-to-r from-indigo-950 via-purple-700 to-violet-950 text-white">

        <div className="flex items-center justify-between px-3 py-3">

          {/* LEFT LOGO */}
          <div className="flex items-center gap-2">

            <div className="w-14 h-14 rounded-full overflow-hidden bg-white shadow">
              <img
                src={logo}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
  <span className="font-bold text-3xl sm:text-3xl tracking-wide animate-pulse text-white drop-shadow-lg">
  Gaurav Dresses
</span>
          </div>

          {/* CENTER */}
          <div className="hidden sm:block text-2xl opacity-90">
           Welcome
          </div>

          {/* CART */}
          <button
            onClick={goCart}
            className="
              bg-white
              text-purple-900
              px-3
              py-1.5
              rounded-full
              text-sm
              font-semibold
              shadow
              hover:scale-105
              active:scale-95
              transition
            "
          >
            🛒
          </button>

        </div>

      </div>

    </div>
  );
}