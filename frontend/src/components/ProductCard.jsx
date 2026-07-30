import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import { gradientFor, initials } from "../utils/thumbnail";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const gradient = gradientFor(product.name);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Thumbnail */}
      <div
        className={`relative h-40 bg-linear-to-br ${gradient} flex items-center justify-center overflow-hidden`}
      >
        <span className="text-white/95 text-4xl font-black tracking-tight drop-shadow-sm">
          {initials(product.name)}
        </span>
        {/* subtle sheen that shifts on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-slate-800 font-semibold leading-snug line-clamp-2">
          {product.name}
        </h3>

        <div className="mt-1 mb-4 flex items-baseline gap-1">
          <span className="text-xl font-bold text-slate-900">
            ₹{Number(product.price).toFixed(2)}
          </span>
        </div>

        <button
          onClick={() => addToCart(product._id)}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 px-4 py-2.5 text-white font-semibold shadow-md shadow-sky-500/20 hover:from-blue-600 hover:to-sky-500 hover:shadow-lg hover:shadow-sky-500/30 active:scale-[0.98] transition-all duration-200"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
