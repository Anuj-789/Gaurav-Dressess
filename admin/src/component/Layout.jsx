import { useState } from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex w-64 bg-white shadow-lg flex-col p-4">
        <h1 className="text-xl font-bold mb-6">GD Admin</h1>

        <Link className="mb-3 hover:text-blue-600" to="/dashboard">
          Dashboard
        </Link>

        <Link className="mb-3 hover:text-blue-600" to="/products">
          Products
        </Link>

        <Link className="mb-3 hover:text-blue-600" to="/categories">
          Categories
        </Link>

        <Link className="mb-3 hover:text-blue-600" to="/settings">
          Settings
        </Link>
      </aside>

      {/* ================= MOBILE HEADER ================= */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-white shadow flex items-center justify-between p-3 z-50">
        <h1 className="font-bold">GD Admin</h1>

        <button
          onClick={() => setOpen(!open)}
          className="text-2xl"
        >
          ☰
        </button>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`
          md:hidden fixed top-12 left-0 right-0 bg-white shadow z-50 p-4
          transform transition-all duration-300
          ${open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}
        `}
      >
        <Link onClick={closeMenu} className="block py-2" to="/dashboard">
          Dashboard
        </Link>

        <Link onClick={closeMenu} className="block py-2" to="/products">
          Products
        </Link>

        <Link onClick={closeMenu} className="block py-2" to="/categories">
          Categories
        </Link>

        <Link onClick={closeMenu} className="block py-2" to="/settings">
          Settings
        </Link>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-3 md:p-6 mt-12 md:mt-0">
        {children}
      </main>
    </div>
  );
}