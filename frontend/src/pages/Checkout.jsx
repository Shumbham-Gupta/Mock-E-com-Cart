
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { checkout, receipt, setReceipt } = useContext(CartContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    paymentMethod: "cod",
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await checkout(form);
    setSuccess(true);
  };

  const handleContinueShopping = () => {
    setReceipt(null);
    navigate("/products");
  };

  // 🗓️ Calculate estimated delivery date (5 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const formattedDate = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-50 via-white to-slate-100 text-gray-900 px-4">
      <div className="w-full max-w-md backdrop-blur-sm bg-white/90 border border-sky-100 shadow-[0_4px_25px_rgba(56,189,248,0.15)] rounded-2xl p-8">
        {!success ? (
          <>
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
                className="w-full bg-linear-to-r from-sky-500 to-blue-600 text-white font-semibold py-3 rounded-md hover:from-blue-600 hover:to-sky-500 transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
              >
                Confirm & Checkout
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-sky-600 drop-shadow-[0_0_6px_rgba(56,189,248,0.3)]">
              🎉 Order Placed Successfully!
            </h2>
            <p className="text-gray-700">
              Thank you for shopping with us,{" "}
              <span className="text-sky-600 font-medium">
                {form.name || "Valued Customer"}
              </span>
              !
            </p>
            <p className="text-gray-600">
              🛍️ Your items will be delivered by{" "}
              <span className="text-sky-700 font-semibold">{formattedDate}</span>.
            </p>
            <button
              onClick={handleContinueShopping}
              className="mt-6 bg-linear-to-r from-sky-500 to-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:from-blue-600 hover:to-sky-500 transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
