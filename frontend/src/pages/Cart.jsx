import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { Home, ShoppingBag } from "lucide-react";

export default function Cart() {
  const { cart } = useContext(CartContext);

  const total = Array.isArray(cart)
    ? cart.reduce(
        (sum, item) => sum + (item?.product?.price || 0) * (item?.qty || 0),
        0
      )
    : 0;

  const isEmpty = !cart || cart.length === 0;

  return (
    <div className="min-h-screen bg-linear-to-b from-sky-50 via-white to-slate-100 text-gray-900 flex justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-sky-700 drop-shadow-[0_0_6px_rgba(56,189,248,0.2)]">
            🛒 Your Cart
          </h2>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sky-600 font-medium hover:text-sky-700 hover:bg-sky-50 px-3 py-2 rounded-lg transition-all"
          >
            <Home size={18} />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </div>

        {isEmpty ? (
          <div className="text-center bg-white border border-slate-200/70 rounded-2xl p-10 shadow-sm">
            <ShoppingBag className="mx-auto mb-4 text-sky-300" size={48} />
            <p className="text-gray-600 text-lg mb-6">Your cart is empty.</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-linear-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-sky-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-sky-500/20"
            >
              <Home size={18} />
              Go to Home
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 bg-white border border-slate-200/70 rounded-2xl p-5 shadow-sm">
              <p className="text-lg font-semibold text-slate-700">
                Total:{" "}
                <span className="text-sky-700">₹{total.toFixed(2)}</span>
              </p>
              <div className="flex gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 border border-sky-200 text-sky-700 hover:bg-sky-50 font-semibold px-5 py-2.5 rounded-xl transition-all"
                >
                  <Home size={18} />
                  Home
                </Link>
                <Link
                  to="/checkout"
                  className="inline-flex items-center gap-2 bg-linear-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-sky-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-sky-500/20"
                >
                  Checkout →
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
