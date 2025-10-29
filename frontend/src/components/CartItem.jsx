import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartItem({ item }) {
  const { removeFromCart } = useContext(CartContext);

  return (

<div className="flex justify-between items-center bg-linear-to-r from-sky-50 via-white to-slate-50 border border-sky-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"> <div> <h4 className="font-semibold text-sky-800"> {item.product.name} </h4> <p className="text-gray-600"> ₹{item.product.price} × {item.qty} </p> </div>

      <button
        onClick={() => removeFromCart(item._id)}
        className="text-sky-400 font-medium hover:text-red-400 hover:scale-105 transition-all duration-200"
      >
        Remove
      </button>
    </div>
  );
}
