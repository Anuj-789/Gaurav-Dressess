import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const footerRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShow(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-r from-indigo-950 via-purple-800 to-violet-950 text-white mt-6 overflow-hidden"
    >
      <div
        className={`max-w-6xl mx-auto px-4 py-5 transition-all duration-700 ease-out ${
          show
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-16"
        }`}
      >
        {/* BRAND */}
        <div className="text-center">
          <h2 className="text-lg font-bold">
            Gaurav Dresses
          </h2>

          <p className="text-white/70 text-xs mt-1">
            Fashion that defines your style ✨
          </p>
        </div>

        {/* SOCIAL ICONS */}
        <div
          className={`flex justify-center gap-4 mt-4 transition-all duration-700 delay-150 ${
            show
              ? "opacity-100 scale-100"
              : "opacity-0 scale-75"
          }`}
        >
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition duration-300"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="Facebook"
              className="w-8 h-8"
            />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition duration-300"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
              alt="Instagram"
              className="w-8 h-8"
            />
          </a>

          <a
            href="https://wa.me/9128405832"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-125 transition duration-300"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
              alt="WhatsApp"
              className="w-8 h-8"
            />
          </a>

          <a
            href="mailto:gauravdresses@gmail.com"
            className="hover:scale-125 transition duration-300"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
              alt="Email"
              className="w-8 h-8"
            />
          </a>
        </div>

        {/* ADDRESS */}
        <div
          className={`text-center mt-4 transition-all duration-700 delay-300 ${
            show
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xs font-medium">
            📍 Hind Cinema Road, Ramnagar
          </p>

          <p className="text-white/60 text-[11px] mt-1">
            West Champaran, Bihar - 845106
          </p>
        </div>

        {/* COPYRIGHT */}
        <div
          className={`border-t border-white/10 mt-4 pt-2 text-center transition-all duration-700 delay-500 ${
            show
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          <p className="text-[10px] text-white/40">
            © {new Date().getFullYear()} Gaurav Dresses
          </p>
        </div>
      </div>
    </footer>
  );
}