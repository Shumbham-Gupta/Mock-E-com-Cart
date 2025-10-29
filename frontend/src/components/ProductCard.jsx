
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";



export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);


  const handleAdd = async () => {
    try {
      await addToCart(product._id);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error("Failed to add item to cart!");
    }
  };

  return (
    
    <div className="bg-linear-to-br from-sky-50 via-blue-50 to-sky-100 border border-sky-200 hover:border-sky-400 rounded-2xl p-5 shadow-md hover:shadow-blue-200/40 text-sky-900">
  <h3 className="text-sky-800 font-semibold mb-2">{product.name}</h3>
  <p className="text-blue-700 font-medium mb-4">₹{product.price}</p>
  <button 
    onClick={() => addToCart(product._id)}
   className="mt-auto bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-sky-400/50">
    Add to Cart
  </button>
</div>

  );
}
