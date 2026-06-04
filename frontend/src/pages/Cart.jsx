import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDisableZoom from "../hooks/useDisableZoom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [animate, setAnimate] = useState(false);

  useDisableZoom();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);

    setTimeout(() => {
      setAnimate(true);
    }, 50);
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const totalPrice = cart.reduce((acc, item) => {
    return acc + (item.selectedVariant?.price || item.price || 0);
  }, 0);

  const buyAll = () => {
    const phone = "9128405832";

    let msg = `🛒 *Gaurav Dresses Order*\n\n`;

    cart.forEach((item) => {
      const product = item?.product || item;

      const name = product?.name || "Product";

      const category =
        product?.category?.name ||
        product?.category ||
        "N/A";

      const color =
        item?.selectedVariant?.color ||
        product?.color ||
        "Normal";

      const price =
        item?.selectedVariant?.price ||
        product?.price ||
        0;

      const image =
        item?.selectedVariant?.image ||
        product?.image ||
        "";

      msg += `━━━━━━━━━━━━━━\n`;
      msg += `🛍️ ${name}\n`;
      msg += `📂 ${category}\n`;
      msg += `🎨 ${color}\n`;
      msg += `💰 ₹${price}\n`;

      if (image) msg += `${image}\n\n`;
    });

    msg += `━━━━━━━━━━━━━━\n`;
    msg += `💰 TOTAL: ₹${totalPrice}`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-purple-200">

      {/* HEADER (STATIC - NO ANIMATION) */}
      <div className="bg-gradient-to-r from-indigo-950 via-purple-700 to-violet-950 text-white py-3 px-3 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 rounded-full bg-white/20 text-sm"
        >
          ⬅ Back
        </button>

          <span className="font-bold text-2xl sm:text-3xl tracking-wide animate-pulse text-white drop-shadow-lg">
  Gaurav Dresses
</span>
        <div className="w-16"></div>
      </div>

      {/* BODY */}
      <div className="max-w-6xl mx-auto px-3 py-4">

        <h2 className="text-xl font-bold text-center mb-4">
          🛒 My Cart
        </h2>

        {cart.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            Cart is empty 😔
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ITEMS */}
            <div className="lg:col-span-2 space-y-4">

              {cart.map((item, index) => (
                <div
                  key={item._id}
                  className={`
                    bg-white rounded-2xl shadow p-4 flex gap-4
                    transition-all duration-500 ease-out
                    hover:shadow-lg

                    ${
                      animate
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }
                  `}
                  style={{
                    transitionDelay: `${index * 80}ms`,
                  }}
                >

                  <img
                    src={item.selectedVariant?.image || item.image}
                    onClick={() => navigate(`/product/${item._id}`)}
                    className="w-24 h-24 object-cover rounded-xl cursor-pointer"
                  />

                  <div className="flex-1">

                    <h2 className="font-semibold">
                      {item.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {item.category?.name || item.category}
                    </p>

                    {item.selectedVariant?.color && (
                      <p className="text-sm text-purple-600">
                        Color: {item.selectedVariant.color}
                      </p>
                    )}

                    <p className="font-bold text-green-600 mt-1">
                      ₹{item.selectedVariant?.price || item.price}
                    </p>

                    <div className="flex gap-2 mt-3">

                      <button
                        onClick={() => navigate(`/product/${item._id}`)}
                        className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-lg"
                      >
                        View
                      </button>

                      <button
                        onClick={() => removeItem(item._id)}
                        className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded-lg"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            {/* SUMMARY */}
            <div
              className={`
                bg-white rounded-2xl shadow p-4 h-fit sticky top-24
                transition-all duration-700 ease-out
                ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
            >

              <h3 className="text-lg text-purple-800 font-bold mb-3">
                Order Summary
              </h3>

              <div className="flex justify-between text-gray-600 mb-2">
                <span>Total Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between text-green-600 font-bold text-lg mb-4">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>

              <button
                onClick={buyAll}
                className="w-full bg-gradient-to-r from-indigo-950 via-purple-700 to-violet-950 text-white py-2 rounded-xl font-medium"
              >
                🛒 Buy Now
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}