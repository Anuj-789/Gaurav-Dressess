import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useDisableZoom from "../hooks/useDisableZoom";
import api from "../api/axios";
import logo from "../assets/shop-logo.png";
export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  useDisableZoom();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [zoom, setZoom] = useState(false);
  const [added, setAdded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/products/${id}`);
        setProduct(res.data);

        if (res.data?.variants?.length > 0) {
          setSelectedVariant(res.data.variants[0]);
        }

        setTimeout(() => setLoaded(true), 50);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
     return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-100">

      <div className="relative flex items-center justify-center">

        {/* SPINNER RING */}
        <div className="absolute w-24 h-24 rounded-full border-4 border-t-purple-600 border-r-transparent border-b-purple-200 border-l-transparent animate-spin"></div>

        {/* LOGO */}
        <img
          src={logo}
          alt="logo"
          className="w-16 h-16 rounded-full object-cover shadow-lg "
        />

      </div>
       <div className="absolute bottom-10 text-center">
        <h1 className="text-purple-700 font-bold text-lg tracking-wide">
          Gaurav Dresses
        </h1>
        <p className="text-gray-500 text-sm">
          Loading premium collection...
        </p>
      </div>

    </div>
  );
  }

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/300";
    if (img.startsWith("http")) return img;
    return `${import.meta.env.VITE_API_URL}/${img}`;
  };

  const activeImage =
    selectedVariant?.image || product.image;

  // 🛒 ADD TO CART (SAFE)
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((p) => p._id === product._id);

    if (!exists) {
      cart.push({
        ...product,
        selectedVariant,
        quantity: 1,
      });

      localStorage.setItem("cart", JSON.stringify(cart));
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // 📦 WHATSAPP ORDER (IMPROVED)
  const buyNow = () => {
    const phone = "9128405832";

    const msg = `🛍️ *Gaurav Dresses Order*\n\n` +
      `📦 ${product.name}\n` +
      `📂 ${product.category?.name || product.category}\n` +
      `🎨 ${selectedVariant?.color || "Normal"}\n` +
      `💰 ₹${selectedVariant?.price || product.price}\n`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-100">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-950 via-purple-700 to-violet-950 py-3 text-center sticky top-0 z-10">
        <span className="font-bold text-2xl sm:text-3xl tracking-wide animate-pulse text-white drop-shadow-lg">
          Gaurav Dresses
        </span>
      </div>

      {/* BODY */}
      <div
        className={`p-3 transition-all duration-700 ease-out ${
          loaded
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >

        {/* IMAGE */}
        <div className="flex justify-center mt-3">
          <img
            src={getImageUrl(activeImage)}
            onClick={() => setZoom(true)}
            className="w-full max-w-md h-72 object-cover rounded-xl shadow cursor-zoom-in"
          />
        </div>

        {/* NAME */}
        <h1 className="text-xl font-bold mt-3">
          {product.name}
        </h1>

        <p className="text-lg text-gray-500">
          {product.category?.name || product.category} • {product.description}
        </p>

        <p className="text-lg font-bold text-purple-600 mt-2">
          ₹{selectedVariant?.price || product.price}
        </p>

        {/* VARIANTS */}
        <div className="flex gap-3 overflow-x-auto mt-3 pb-2">
          {product.variants?.map((v, i) => (
            <div
              key={i}
              onClick={() => setSelectedVariant(v)}
              className="min-w-[85px] p-2 border rounded-xl text-center cursor-pointer hover:scale-105 transition"
            >
              <img
                src={getImageUrl(v.image)}
                className="w-10 h-10 mx-auto rounded-full object-cover"
              />
              <p className="text-xs">{v.color}</p>
              <p className="text-purple-600 font-bold">₹{v.price}</p>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2 mt-4">

          <button
            onClick={addToCart}
            className="flex-1 py-2 rounded-xl bg-purple-100 text-purple-700"
          >
            {added ? "Added ✓" : "🛒 Add to Cart"}
          </button>

          <button
            onClick={buyNow}
            className="flex-1 py-2 rounded-xl text-white bg-purple-700"
          >
            Buy Now
          </button>

        </div>

        {/* VIEW CART */}
        <button
          onClick={() => navigate("/cart")}
          className="w-1/2 mt-3 py-2 rounded-xl bg-purple-300 text-white font-medium mx-auto block text-center"
        >
          🛒 View Cart
        </button>

        {/* BACK */}
        <div className="flex justify-center mt-6 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-full bg-white shadow text-gray-600"
          >
            ⬅ Back
          </button>
        </div>

      </div>

      {/* ZOOM */}
      {zoom && (
        <div
          onClick={() => setZoom(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]"
        >
          <img
            src={getImageUrl(activeImage)}
            className="max-w-[95%] max-h-[95%] object-contain rounded-xl"
          />
        </div>
      )}
    </div>
  );
}
