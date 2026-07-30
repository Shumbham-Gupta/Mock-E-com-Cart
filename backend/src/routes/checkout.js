const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const { v4: uuidv4 } = require('uuid');

// 💡 Pricing rules for the simulation (kept here so the "how a cart works"
// math lives in one obvious place). A real store would read these from config.
const TAX_RATE = 0.05;            // 5% mock tax
const SHIPPING_FEE = 49;          // flat delivery fee
const FREE_SHIPPING_OVER = 500;   // free shipping above this subtotal
const DELIVERY_DAYS = 5;          // estimated days until delivery
const round2 = (n) => Number(n.toFixed(2));

// POST /api/checkout — expects { cartItems, user } → returns mock receipt
router.post('/', async (req, res) => {
  try {
    const { cartItems, user } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Cart items arrive in the nested shape { _id, product: { _id, name, price }, qty }.
    // Fall back to flat fields so the endpoint tolerates either shape.
    const priceOf = (item) => Number(item.product?.price ?? item.price ?? 0);
    const nameOf = (item) => item.product?.name ?? item.name ?? 'Unknown item';
    const productIdOf = (item) => item.product?._id ?? item.productId ?? null;

    // 🧮 The visible cart math: subtotal → shipping → tax → grand total.
    const subtotal = cartItems.reduce((sum, item) => sum + priceOf(item) * item.qty, 0);
    const shipping = subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;

    // 🚚 Estimated delivery = order time + DELIVERY_DAYS.
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + DELIVERY_DAYS);

    // Build mock receipt
    const receipt = {
      id: uuidv4(),
      name: user?.name || 'Guest',
      email: user?.email || null,
      paymentMethod: user?.paymentMethod || 'cod',
      items: cartItems.map(item => ({
        id: item._id,
        productId: productIdOf(item),
        qty: item.qty,
        name: nameOf(item),
        price: priceOf(item),
        subtotal: round2(priceOf(item) * item.qty),
      })),
      summary: {
        subtotal: round2(subtotal),
        shipping: round2(shipping),
        tax: round2(tax),
        taxRate: TAX_RATE,
      },
      total: round2(total),
      timestamp: new Date().toISOString(),
      estimatedDelivery: estimatedDelivery.toISOString(),
      deliveryDays: DELIVERY_DAYS,
    };

    // Clear the cart after checkout
    await CartItem.deleteMany({});

    // Send the mock receipt
    return res.json({ receipt });
  } catch (err) {
    console.error('Checkout Error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
