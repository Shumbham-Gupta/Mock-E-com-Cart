
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const { products } = useContext(CartContext);

  return (
    
   <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-slate-100 text-gray-900 p-6"> <h2 className="text-3xl font-semibold text-center text-sky-700 mb-8"> ✨ Explore Fresh Arrivals </h2>

{products && products.length > 0 ? (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
{products.map((p) => (
<div key={p._id} className="bg-white border border-sky-100 rounded-2xl p-6 shadow-[0_2px_8px_rgba(56,189,248,0.08)] hover:shadow-[0_6px_16px_rgba(56,189,248,0.15)] hover:border-sky-200 transition-all duration-300" >
<ProductCard product={p} />
</div>
))}
</div>
) : (
<p className="text-center text-gray-500 text-lg mt-10">
Loading products...
</p>
)}

</div>


  );
}
