import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    setOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const btnStyle =
    "text-left px-3 py-2 rounded-lg hover:bg-white/10 transition text-sm";

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="hidden md:flex fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-purple-800 via-slate-800 to-gray-900 text-white p-5 flex-col shadow-2xl">

        <h2 className="text-2xl font-bold mb-8 text-center text-white-800 tracking-wide">
          Gaurav Dresses
        </h2>

        <nav className="flex flex-col gap-2">

          <button onClick={() => goTo("/")} className={btnStyle}>
            📊 Dashboard
          </button>

          <button onClick={() => goTo("/products")} className={btnStyle}>
            👗 Products
          </button>

          <button onClick={() => goTo("/categories")} className={btnStyle}>
            📂 Categories
          </button>

          <button onClick={() => goTo("/settings")} className={btnStyle}>
            ⚙️ Settings
          </button>

          <div className="mt-6 border-t border-gray-700 pt-4">
            <button
              onClick={logout}
              className="text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10"
            >
              🚪 Logout
            </button>
          </div>

        </nav>
      </div>

      {/* ================= MOBILE TOP BAR ================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-700 via-slate-700 to-gray-800 text-white shadow-lg">

        <div className="flex justify-between items-center px-4 py-3">

          <h1 className="font-bold text-white text-lg">
            Gaurav Dresses
          </h1>

          <button
            onClick={() => setOpen(true)}
            className="text-2xl focus:outline-none active:scale-95"
          >
            ☰
          </button>

        </div>
      </div>

      {/* ================= MOBILE RIGHT DRAWER ================= */}
      {open && (
        <>
          {/* BACKDROP */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* DRAWER */}
          <div className="fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-slate-900 via-gray-900 to-slate-800 text-white z-50 shadow-2xl p-5 flex flex-col">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white font-bold text-lg">
                Menu
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-xl"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col gap-2">

              <button onClick={() => goTo("/")} className={btnStyle}>
                📊 Dashboard
              </button>

              <button onClick={() => goTo("/products")} className={btnStyle}>
                👗 Products
              </button>

              <button onClick={() => goTo("/categories")} className={btnStyle}>
                📂 Categories
              </button>

              <button onClick={() => goTo("/settings")} className={btnStyle}>
                ⚙️ Settings
              </button>

              <div className="mt-6 border-t border-gray-700 pt-4">
                <button
                  onClick={logout}
                  className="text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10"
                >
                  🚪 Logout
                </button>
              </div>

            </nav>

          </div>
        </>
      )}
    </>
  );
}