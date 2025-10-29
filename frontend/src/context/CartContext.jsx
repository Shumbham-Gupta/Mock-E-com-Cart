import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [receipt, setReceipt] = useState(null);

  // ✅ Automatically switch base URL depending on environment
  const API_BASE =
    import.meta.env.MODE === "development"
      ? "http://localhost:4000/api"
      : "https://mock-e-com-cart-backend.onrender.com/api";

  // ✅ Preconfigure axios instance for CORS credentials
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
      await axiosInstance.post("/cart", { productId, qty: 1 });
      fetchCart();
      toast.success("🛍️ Item added to cart!");
    } catch (err) {
      toast.error("❌ Failed to add item!");
      console.error(err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axiosInstance.delete(`/cart/${id}`);
      fetchCart();
      toast.info("🗑️ Item removed from cart");
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const checkout = async (formData) => {
    try {
      const { data } = await axiosInstance.post("/checkout", {
        cartItems: cart,
        user: formData,
      });
      setReceipt(data);
      fetchCart();
      toast.success("✅ Checkout complete!");
    } catch (err) {
      toast.error("❌ Checkout failed!");
      console.error(err);
    }
  };

  const cartCount = cart?.length || 0;

  return (
    <CartContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
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


// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [receipt, setReceipt] = useState(null);

//   const API_BASE = "https://mock-e-com-cart-backend.onrender.com/api";

//   useEffect(() => {
//     fetchProducts();
//     fetchCart();
//   }, []);

//   const fetchProducts = async () => {
//     const { data } = await axios.get(`${API_BASE}/products`);
//     setProducts(data);
//   };

//   const fetchCart = async () => {
//     const { data } = await axios.get(`${API_BASE}/cart`);
//     setCart(data.cartItems);
//   };


// const addToCart = async (productId) => {
//   try {
//     await axios.post(`${API_BASE}/cart`, { productId, qty: 1 });
//     fetchCart();
//     toast.success("🛍️ Item added to cart!");
//   } catch (err) {
//     toast.error("❌ Failed to add item!");
//     console.error(err);
//   }
// };



//   const removeFromCart = async (id) => {
//     await axios.delete(`${API_BASE}/cart/${id}`);
//     fetchCart();
//   };

//   const checkout = async (formData) => {
//     const { data } = await axios.post(`${API_BASE}/checkout`, {
//       cartItems: cart,
//       user: formData,
//     });
//     setReceipt(data);
//     fetchCart();
//   };

//    const cartCount = cart?.length || 0; //new line added

//   return (
//     <CartContext.Provider value={{
//       products, cart, addToCart, removeFromCart, checkout, receipt, setReceipt,cartCount //newone
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
