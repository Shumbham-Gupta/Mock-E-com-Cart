import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [receipt, setReceipt] = useState(null);

  const API_BASE = "http://localhost:4000/api";

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
    const { data } = await axios.post(`${API_BASE}/cart`, { productId, qty: 1 });
    setCart(data.cartItems);
    toast.success("🛍️ Item added to cart!");
  } catch (err) {
    toast.error("❌ Failed to add item!");
    console.error(err);
  }
};



  const removeFromCart = async (id) => {
    const { data } = await axios.delete(`${API_BASE}/cart/${id}`);
    setCart(data.cartItems);
  };

  const updateQty = async (id, qty) => {
    try {
      const { data } = await axios.put(`${API_BASE}/cart/${id}`, { qty });
      setCart(data.cartItems);
    } catch (err) {
      toast.error("❌ Failed to update quantity!");
      console.error(err);
    }
  };

  const checkout = async (formData) => {
    const { data } = await axios.post(`${API_BASE}/checkout`, {
      cartItems: cart,
      user: formData,
    });
    setReceipt(data.receipt);
    setCart([]);
  };

   const cartCount = cart?.length || 0; //new line added

  return (
    <CartContext.Provider value={{
      products, cart, addToCart, removeFromCart, updateQty, checkout, receipt, setReceipt, cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
