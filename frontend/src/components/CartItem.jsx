import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { gradientFor, initials } from "../utils/thumbnail";

export default function CartItem({ item }) {
  const { removeFromCart, updateQty } = useContext(CartContext);

  const name = item.product?.name || "";
  const price = item.product?.price || 0;
  const lineTotal = price * item.qty;

  const decrement = () => {
    // At qty 1, stepping down removes the line — same as real carts.
    if (item.qty <= 1) {
      removeFromCart(item._id);
    } else {
      updateQty(item._id, item.qty - 1);
    }
  };

  const increment = () => updateQty(item._id, item.qty + 1);

  return (
    <div className="flex items-center gap-4 bg-white border border-slate-200/70 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
      {/* Thumbnail */}
      <div
        className={`hidden sm:flex h-16 w-16 shrink-0 rounded-xl bg-linear-to-br ${gradientFor(
          name
        )} items-center justify-center`}
      >
        <span className="text-white font-black text-lg drop-shadow-sm">
          {initials(name)}
        </span>
      </div>

      {/* Name + unit price */}
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-slate-800 truncate">{name}</h4>
        <p className="text-sm text-slate-500">₹{price.toFixed(2)} each</p>
      </div>

      {/* Quantity stepper */}
      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shrink-0">
        <button
          onClick={decrement}
          aria-label="Decrease quantity"
          className="p-2 text-sky-600 hover:bg-sky-50 active:scale-95 transition"
        >
          {item.qty <= 1 ? <Trash2 size={16} /> : <Minus size={16} />}
        </button>
        <span className="w-10 text-center font-medium text-slate-800 select-none">
          {item.qty}
        </span>
        <button
          onClick={increment}
          aria-label="Increase quantity"
          className="p-2 text-sky-600 hover:bg-sky-50 active:scale-95 transition"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Line total */}
      <p className="w-24 text-right font-bold text-slate-900 shrink-0 hidden sm:block">
        ₹{lineTotal.toFixed(2)}
      </p>

      {/* Remove */}
      <button
        onClick={() => removeFromCart(item._id)}
        aria-label="Remove item"
        className="text-slate-300 hover:text-red-500 hover:scale-110 transition-all duration-200 shrink-0"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
