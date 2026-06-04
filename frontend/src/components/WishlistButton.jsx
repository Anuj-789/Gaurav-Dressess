import { useState, useEffect } from "react";

export default function WishlistButton({ product }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = list.find((p) => p._id === product._id);
    setLiked(!!exists);
  }, [product._id]);

  const toggleWishlist = () => {
    let list = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (liked) {
      list = list.filter((p) => p._id !== product._id);
    } else {
      list.push(product);
    }

    localStorage.setItem("wishlist", JSON.stringify(list));
    setLiked(!liked);
  };

  return (
    <button
      onClick={toggleWishlist}
      className="text-xl active:scale-95 transition"
    >
      {liked ? "❤️" : "🤍"}
    </button>
  );
}