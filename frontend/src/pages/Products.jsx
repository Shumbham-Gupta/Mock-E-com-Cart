import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { Search, X } from "lucide-react";

export default function Products() {
  const { products } = useContext(CartContext);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = q
    ? products.filter((p) => p.name.toLowerCase().includes(q))
    : products;

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-slate-100 text-gray-900 p-6">
      <h2 className="text-3xl font-semibold text-center text-sky-700 mb-6">
        ✨ Explore Fresh Arrivals
      </h2>

      {/* Search box */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={18} />
            </button>
          )}
        </div>
        {q && (
          <p className="text-center text-sm text-slate-500 mt-2">
            {filtered.length} result{filtered.length === 1 ? "" : "s"} for “{query}”
          </p>
        )}
      </div>

      {!products || products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          Loading products...
        </p>
      ) : filtered.length === 0 ? (
        <div className="text-center text-slate-500 mt-10 space-y-2">
          <p className="text-lg">No products match “{query}”.</p>
          <button
            onClick={() => setQuery("")}
            className="text-sky-600 font-medium hover:underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {filtered.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
