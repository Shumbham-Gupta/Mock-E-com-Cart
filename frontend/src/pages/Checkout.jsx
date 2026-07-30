
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

// Mirror of the backend pricing rules so the pre-payment summary matches the
// receipt. The backend stays the source of truth; this is just a live preview.
const TAX_RATE = 0.05;
const SHIPPING_FEE = 49;
const FREE_SHIPPING_OVER = 500;

export default function Checkout() {
  const { cart, checkout, receipt, setReceipt } = useContext(CartContext);
  const currency = (n) => `₹${Number(n ?? 0).toFixed(2)}`;
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    paymentMethod: "cod",
  });
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  // 🧮 Live order math for the review step (same rules as the backend).
  const subtotal = Array.isArray(cart)
    ? cart.reduce((sum, it) => sum + (it?.product?.price || 0) * (it?.qty || 0), 0)
    : 0;
  const shipping = subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;
  const tax = subtotal * TAX_RATE;
  const grandTotal = subtotal + shipping + tax;
  const isEmpty = !Array.isArray(cart) || cart.length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty) return;
    try {
      setProcessing(true);
      // Small delay to make the "payment processing" step of the flow visible.
      await new Promise((r) => setTimeout(r, 900));
      await checkout(form);
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const handleContinueShopping = () => {
    setReceipt(null);
    navigate("/products");
  };

  // 🗓️ Estimated delivery now comes from the backend receipt (authoritative),
  // formatted here for display.
  const formattedDate = receipt?.estimatedDelivery
    ? new Date(receipt.estimatedDelivery).toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-50 via-white to-slate-100 text-gray-900 px-4 py-10">
      <div
        className={`w-full ${
          success ? "max-w-md" : isEmpty ? "max-w-md" : "max-w-4xl"
        } backdrop-blur-sm bg-white/90 border border-sky-100 shadow-[0_4px_25px_rgba(56,189,248,0.15)] rounded-2xl p-8`}
      >
        {isEmpty && !success ? (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-sky-700">Checkout</h2>
            <p className="text-gray-600">
              Your cart is empty — add something before checking out.
            </p>
            <Link
              to="/products"
              className="inline-block bg-linear-to-r from-sky-500 to-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:from-blue-600 hover:to-sky-500 transition-all"
            >
              Browse Products
            </Link>
          </div>
        ) : !success ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
            <h2 className="text-2xl font-bold mb-6 text-sky-700 text-center drop-shadow-[0_0_6px_rgba(56,189,248,0.3)]">
              Checkout
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 text-sm sm:text-base"
            >
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 rounded-md bg-sky-50 border border-sky-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300 transition-all"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full p-3 rounded-md bg-sky-50 border border-sky-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300 transition-all"
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full p-3 rounded-md bg-sky-50 border border-sky-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300 transition-all"
                required
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-1/2 p-3 rounded-md bg-sky-50 border border-sky-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300 transition-all"
                  required
                />
                <input
                  type="text"
                  placeholder="State"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="w-1/2 p-3 rounded-md bg-sky-50 border border-sky-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300 transition-all"
                  required
                />
              </div>

              <div className="bg-sky-50 border border-sky-200 rounded-md p-3">
                <label className="block text-sky-700 font-medium mb-2">
                  Payment Method
                </label>
                <div className="space-y-2 text-gray-700">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={form.paymentMethod === "cod"}
                      onChange={(e) =>
                        setForm({ ...form, paymentMethod: e.target.value })
                      }
                    />
                    Cash on Delivery (COD)
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={form.paymentMethod === "upi"}
                      onChange={(e) =>
                        setForm({ ...form, paymentMethod: e.target.value })
                      }
                    />
                    UPI
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={form.paymentMethod === "card"}
                      onChange={(e) =>
                        setForm({ ...form, paymentMethod: e.target.value })
                      }
                    />
                    Debit / Credit Card
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="netbanking"
                      checked={form.paymentMethod === "netbanking"}
                      onChange={(e) =>
                        setForm({ ...form, paymentMethod: e.target.value })
                      }
                    />
                    Net Banking
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-linear-to-r from-sky-500 to-blue-600 text-white font-semibold py-3 rounded-md hover:from-blue-600 hover:to-sky-500 transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {processing
                  ? "Processing payment…"
                  : `Pay ${currency(grandTotal)}`}
              </button>
            </form>
            </div>

            {/* 🧾 Order summary (review step) */}
            <div className="bg-white border border-slate-200/70 rounded-2xl p-5 h-fit shadow-sm">
              <h3 className="text-lg font-semibold text-sky-700 mb-4">
                Order Summary
              </h3>
              <ul className="divide-y divide-sky-100 mb-4">
                {cart.map((item) => (
                  <li
                    key={item._id}
                    className="flex justify-between py-2 text-sm text-gray-700"
                  >
                    <span>
                      {item.product?.name}{" "}
                      <span className="text-gray-400">× {item.qty}</span>
                    </span>
                    <span className="font-medium">
                      {currency((item.product?.price || 0) * item.qty)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="space-y-1 text-sm border-t border-sky-200 pt-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{currency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : currency(shipping)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
                  <span>{currency(tax)}</span>
                </div>
                <div className="flex justify-between font-bold text-sky-700 text-base border-t border-sky-200 mt-2 pt-2">
                  <span>Total</span>
                  <span>{currency(grandTotal)}</span>
                </div>
              </div>
              {shipping === 0 && (
                <p className="text-xs text-green-600 mt-3">
                  ✅ You’ve unlocked free shipping!
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-sky-600 drop-shadow-[0_0_6px_rgba(56,189,248,0.3)]">
                🎉 Order Placed Successfully!
              </h2>
              <p className="text-gray-700">
                Thank you for shopping with us,{" "}
                <span className="text-sky-600 font-medium">
                  {receipt?.name || form.name || "Valued Customer"}
                </span>
                !
              </p>
            </div>

            {receipt && (
              <div className="bg-white border border-slate-200/70 rounded-2xl p-5 text-left shadow-sm">
                <div className="flex justify-between text-xs text-gray-500 mb-3">
                  <span>
                    Order <span className="font-mono">#{String(receipt.id).slice(0, 8)}</span>
                  </span>
                  <span>{new Date(receipt.timestamp).toLocaleString("en-IN")}</span>
                </div>

                <ul className="divide-y divide-sky-100">
                  {receipt.items?.map((item) => (
                    <li key={item.id} className="flex justify-between py-2 text-sm">
                      <span className="text-gray-700">
                        {item.name}{" "}
                        <span className="text-gray-400">× {item.qty}</span>
                      </span>
                      <span className="text-gray-800 font-medium">
                        {currency(item.subtotal)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-1 text-sm border-t border-sky-200 mt-3 pt-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{currency(receipt.summary?.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>
                      {receipt.summary?.shipping === 0
                        ? "FREE"
                        : currency(receipt.summary?.shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>
                      Tax ({((receipt.summary?.taxRate || 0) * 100).toFixed(0)}%)
                    </span>
                    <span>{currency(receipt.summary?.tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sky-700 text-base border-t border-sky-200 mt-2 pt-2">
                    <span>Total Paid</span>
                    <span>{currency(receipt.total)}</span>
                  </div>
                </div>
                {receipt.paymentMethod && (
                  <p className="text-xs text-gray-500 mt-3 uppercase tracking-wide">
                    Paid via {receipt.paymentMethod}
                  </p>
                )}
              </div>
            )}

            {formattedDate && (
              <p className="text-gray-600 text-center">
                🛍️ Your items will be delivered by{" "}
                <span className="text-sky-700 font-semibold">{formattedDate}</span>.
              </p>
            )}
            <button
              onClick={handleContinueShopping}
              className="w-full bg-linear-to-r from-sky-500 to-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:from-blue-600 hover:to-sky-500 transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
