
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart } = useContext(CartContext);

  
  const total = Array.isArray(cart)
    ? cart.reduce(
        (sum, item) => sum + (item?.product?.price || 0) * (item?.qty || 0),
        0
      )
    : 0;

  return (

<div className="min-h-screen bg-linear-to-b from-sky-50 via-white to-slate-100 text-gray-900 flex justify-center p-6"> <div className="w-full max-w-3xl"> <h2 className="text-3xl font-bold text-center mb-6 text-sky-700 drop-shadow-[0_0_6px_rgba(56,189,248,0.2)]"> 🛒 Your Cart </h2>

     {!cart || cart.length === 0 ? (
    <div className="text-center bg-white/70 border border-sky-100 rounded-2xl p-6 shadow-[0_4px_20px_rgba(56,189,248,0.1)] backdrop-blur-sm">
      <p className="text-gray-600 text-lg">Your cart is empty.</p>
    </div>
  ) : (
    <>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-sky-100 rounded-xl p-4 shadow-[0_4px_15px_rgba(56,189,248,0.1)] hover:shadow-[0_6px_20px_rgba(56,189,248,0.15)] transition-transform hover:scale-[1.02]"
          >
            <CartItem item={item} />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 bg-sky-50 border border-sky-200 rounded-2xl p-4 shadow-[0_4px_15px_rgba(56,189,248,0.1)]">
        <p className="text-lg font-semibold text-sky-700 drop-shadow-[0_0_4px_rgba(56,189,248,0.2)]">
          Total: ₹{total.toFixed(2)}
        </p>
        <Link
          to="/checkout"
          className="mt-4 sm:mt-0 bg-linear-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-500 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 shadow-[0_0_10px_rgba(56,189,248,0.3)]"
        >
          Checkout →
        </Link>
      </div>
    </>
  )}
</div>

</div>

  );
}
