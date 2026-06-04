import { useEffect } from "react";

export default function ImageModal({ image, onClose }) {

  // ESC KEY CLOSE
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!image) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    >

      <img
        src={image}
        alt="zoom"
        className="max-w-full max-h-full rounded-lg shadow-lg"
      />

    </div>
  );
}