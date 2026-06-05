import { useEffect } from "react";
import logo from "../assets/shop-logo.png";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4000); // 4 sec clean splash

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-800 to-violet-950 text-white">

      {/* LOGO */}
      <img
        src={logo}
        alt="logo"
        className="w-28 h-28 mb-4 animate-bounce drop-shadow-2xl"
      />

      {/* TITLE */}
      <h1 className="text-3xl font-bold tracking-wide">
        Gaurav Dresses
      </h1>

      {/* SUBTITLE */}
      <p className="text-sm mt-2 text-gray-200">
        Premium Fashion Store
      </p>

      {/* LOADER DOTS */}
      <div className="flex gap-1 mt-4">
        <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></span>
        <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-300"></span>
      </div>

    </div>
  );
}