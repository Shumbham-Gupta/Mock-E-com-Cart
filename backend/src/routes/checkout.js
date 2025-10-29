const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const { v4: uuidv4 } = require('uuid');

// POST /api/checkout — expects { cartItems, user } → returns mock receipt
router.post('/', async (req, res) => {
  try {
    const { cartItems, user } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Build mock receipt
    const receipt = {
      id: uuidv4(),
      name: user?.name || 'Guest',
      email: user?.email || null,
      items: cartItems.map(item => ({
        id: item._id,
        productId: item.productId,
        qty: item.qty,
        name: item.name,
        price: item.price,
        subtotal: Number((item.price * item.qty).toFixed(2)),
      })),
      total: Number(total.toFixed(2)),
      timestamp: new Date().toISOString(),
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
