

import React, { useState,useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Home, Globe, Menu, X } from "lucide-react";
import { CartContext } from "../context/CartContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useContext(CartContext);

  const linkClasses = (path) =>
    `flex items-center gap-2 font-medium transition-colors duration-300 ${ location.pathname === path ? "text-sky-700 " : "text-gray-600 hover:text-sky-600"
    }`;

  return (

<header className="bg-linear-to-r from-slate-800 via-slate-800 to-sky-950 text-gray-100 shadow-lg sticky top-0 z-50 border-b border-sky-800 backdrop-blur-md"> <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4"> {/* Logo / Title */} <Link to="/products" className="text-2xl sm:text-3xl font-extrabold text-sky-400 tracking-wide hover:text-sky-300 transition-colors" > Vibe<span className="text-gray-400">Commerce</span> </Link>

            {/* Desktop Navigation */}
  <nav className="hidden md:flex items-center space-x-8">
    <Link to="/products" className={linkClasses("/products")}>
      <Home className="w-5 h-5 text-sky-400" /> Home
    </Link>
    <Link to="/about" className={linkClasses("/about")}>
      <Globe className="w-5 h-5 text-sky-400" /> About
    </Link>

{/* new code added */}

<Link to="/cart" className={linkClasses("/cart")}>  
  <div className="relative">
    <ShoppingCart className="w-5 h-5 text-sky-400" />
    {cartCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-sky-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
        {cartCount}
      </span>
    )}
  </div>
  Cart
</Link>


  </nav>

  {/* Mobile Menu Button */}
  <button
    className="md:hidden text-sky-400 hover:text-sky-300 transition-all"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    {menuOpen ? <X size={26} /> : <Menu size={26} />}
  </button>
</div>

{/* Mobile Menu */}
{menuOpen && (
  <div className="md:hidden bg-linear-to-b from-slate-900 via-slate-800 to-sky-950 border-t border-sky-800">
    <nav className="flex flex-col space-y-4 px-6 py-4">
      <Link
        to="/products"
        onClick={() => setMenuOpen(false)}
        className={linkClasses("/products")}
      >
        <Home className="w-5 h-5 text-sky-400" /> Home
      </Link>
      <Link
        to="/about"
        onClick={() => setMenuOpen(false)}
        className={linkClasses("/about")}
      >
        <Globe className="w-5 h-5 text-sky-400" /> About
      </Link>
      <Link
        to="/cart"
        onClick={() => setMenuOpen(false)}
        className={linkClasses("/cart")}
      >
        <ShoppingCart className="w-5 h-5 text-sky-400" /> Cart
      </Link>
    </nav>
  </div>
)}

{/* Accent Line */}
<div className="h-[2 px] bg-linear-to-r from-sky-500 via-sky-400 to-transparent"></div>

</header>

  );
}

