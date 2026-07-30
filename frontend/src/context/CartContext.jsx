import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [receipt, setReceipt] = useState(null);

  // ✅ Switch base URL depending on environment (localhost in dev, Render in prod)
  const API_BASE =
    import.meta.env.MODE === "development"
      ? "http://localhost:4000/api"
      : "https://mock-e-com-cart-backend.onrender.com/api";

  // ✅ Preconfigured axios instance (sends CORS credentials)
  const axiosInstance = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
  });

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axiosInstance.get("/products");
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const fetchCart = async () => {
    try {
      const { data } = await axiosInstance.get("/cart");
      setCart(data.cartItems || []);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  const addToCart = async (productId) => {
    try {
      const { data } = await axiosInstance.post("/cart", { productId, qty: 1 });
      setCart(data.cartItems);
      toast.success("🛍️ Item added to cart!");
    } catch (err) {
      toast.error("❌ Failed to add item!");
      console.error(err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const { data } = await axiosInstance.delete(`/cart/${id}`);
      setCart(data.cartItems);
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const updateQty = async (id, qty) => {
    try {
      const { data } = await axiosInstance.put(`/cart/${id}`, { qty });
      setCart(data.cartItems);
    } catch (err) {
      toast.error("❌ Failed to update quantity!");
      console.error(err);
    }
  };

  const checkout = async (formData) => {
    const { data } = await axiosInstance.post("/checkout", {
      cartItems: cart,
      user: formData,
    });
    setReceipt(data.receipt);
    setCart([]);
  };

  const cartCount = cart?.length || 0;

  return (
    <CartContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        checkout,
        receipt,
        setReceipt,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
