import { useState } from "react";
import api from "../api/axios";
import loginGif from "../assets/login-logo.gif";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      if (!res.data.token) {
        return alert("Invalid response from server");
      }

      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex flex-col">

      {/* TOP TITLE */}
      <div className="text-center py-6">
        <h1 className="text-3xl sm:text-7xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 drop-shadow-[0_0_20px_rgba(99,102,241,0.6)] animate-bounce">
  Gaurav Dresses
</h1>
        <p className="text-blue-800 text-sm mt-1">
          Hind-Cinema Road,Ramnagar
        </p>
      </div>

      {/* MAIN SECTION */}
      <div className="flex flex-1 flex-col lg:flex-row items-center justify-center px-6 lg:px-20 gap-2 ">

        {/* LEFT SIDE GIF */}
        <div className="flex-1 flex justify-center items-center ">
          <img
            src={loginGif}
            alt="login gif"
            className="w-60 h-60 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] object-contain  rounded-4xl"
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="flex-1 w-full max-w-md bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-6 sm:p-8">

          <h2 className="text-xl font-semibold text-blue-800 mb-6 text-center">
            Sign in to Dashboard
          </h2>

          <div className="space-y-4">

            <input
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={login}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Login
            </button>

          </div>
<p className="text-xs text-gray-500 text-center mt-5 tracking-wide">
  Developed by <span className="text-indigo-500 font-semibold">Anuj Gupta</span> •
</p>
        </div>
      </div>
    </div>
  );
}