import { useEffect, useState } from "react";

export default function Contact() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 50);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-950 via-purple-700 to-violet-950 py-4 text-center shadow-md">
        <h1 className="text-2xl font-bold text-white">
          Contact Us
        </h1>
        <p className="text-white/70 text-sm">
          Gaurav Dresses Support
        </p>
      </div>

      {/* BODY */}
      <div
        className={`max-w-3xl mx-auto p-4 transition-all duration-700 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >

        {/* ADDRESS CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-5 hover:shadow-xl transition">
          <h2 className="text-lg font-bold text-purple-700 mb-2">
            📍 Our Location
          </h2>

          <a
            href="https://maps.google.com/?q=Gaurav Dresses Hind Cinema Road Ramnagar West Champaran Bihar 845106"
            target="_blank"
            className="text-gray-700 leading-relaxed hover:text-purple-600 transition"
          >
            Gaurav Dresses, Hind Cinema Road, Ramnagar,
            West Champaran, Bihar - 845106
          </a>
        </div>

        {/* SOCIAL LINKS */}
        <div className="grid grid-cols-2 gap-4">

          {/* WHATSAPP */}
          <a
            href="https://wa.me/9128405832"
            target="_blank"
            className="bg-green-500 text-white p-4 rounded-xl text-center shadow hover:scale-105 transition"
          >
            💬 WhatsApp Community
          </a>

          {/* FACEBOOK */}
          <a
            href="https://facebook.com"
            target="_blank"
            className="bg-blue-600 text-white p-4 rounded-xl text-center shadow hover:scale-105 transition"
          >
            📘 Facebook
          </a>

          {/* INSTAGRAM */}
          <a
            href="https://instagram.com"
            target="_blank"
            className="bg-pink-500 text-white p-4 rounded-xl text-center shadow hover:scale-105 transition"
          >
            📸 Instagram
          </a>

          {/* EMAIL */}
          <a
            href="mailto:gauravdresses@gmail.com"
            className="bg-purple-600 text-white p-4 rounded-xl text-center shadow hover:scale-105 transition"
          >
            ✉️ Email Us
          </a>

        </div>

        {/* CALL BUTTON */}
        <div className="mt-6 text-center">
          <a
            href="tel:9128405832"
            className="inline-block w-1/2 py-3 bg-gradient-to-r from-indigo-950 via-purple-700 to-violet-950 text-white rounded-xl font-medium shadow-lg hover:scale-105 transition"
          >
            📞 Call Now
          </a>
        </div>

        {/* FOOT NOTE */}
        <p className="text-center text-gray-400 text-xs mt-6">
          We usually respond within few minutes ⚡
        </p>

      </div>
    </div>
  );
}