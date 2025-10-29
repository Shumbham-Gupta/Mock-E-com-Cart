import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [receipt, setReceipt] = useState(null);

  const API_BASE = "https://mock-e-com-cart-backend.onrender.com/api";

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get(`${API_BASE}/products`);
    setProducts(data);
  };

  const fetchCart = async () => {
    const { data } = await axios.get(`${API_BASE}/cart`);
    setCart(data.cartItems);
  };


const addToCart = async (productId) => {
  try {
    await axios.post(`${API_BASE}/cart`, { productId, qty: 1 });
    fetchCart();
    toast.success("🛍️ Item added to cart!");
  } catch (err) {
    toast.error("❌ Failed to add item!");
    console.error(err);
  }
};



  const removeFromCart = async (id) => {
    await axios.delete(`${API_BASE}/cart/${id}`);
    fetchCart();
  };

  const checkout = async (formData) => {
    const { data } = await axios.post(`${API_BASE}/checkout`, {
      cartItems: cart,
      user: formData,
    });
    setReceipt(data);
    fetchCart();
  };

   const cartCount = cart?.length || 0; //new line added

  return (
    <CartContext.Provider value={{
      products, cart, addToCart, removeFromCart, checkout, receipt, setReceipt,cartCount //newone
    }}>
      {children}
    </CartContext.Provider>
  );
};
