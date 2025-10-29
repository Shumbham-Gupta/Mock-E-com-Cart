
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// 🛒 GET /api/cart — return cart items + total
router.get('/', async (req, res) => {
  try {
    const items = await CartItem.find({}).lean();
    if (!items) return res.json({ cartItems: [], total: 0 });

    const total = items.reduce((sum, it) => sum + (it.price * it.qty), 0);
    const cartItems = items.map(it => ({
      _id: it._id,
      product: {
        _id: it.productId,
        name: it.name,
        price: it.price
      },
      qty: it.qty
    }));

    res.json({ cartItems, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➕ POST /api/cart — Add { productId, qty }
router.post('/', async (req, res) => {
  try {
    const { productId, qty } = req.body;

    if (!productId || !qty) {
      return res.status(400).json({ error: 'productId and qty required' });
    }

    const qtyNum = Number(qty);
    if (isNaN(qtyNum) || qtyNum <= 0) {
      return res.status(400).json({ error: 'qty must be a positive number' });
    }

    const product = await Product.findById(productId).lean();
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if product already in cart
    const existing = await CartItem.findOne({ productId });
    if (existing) {
      existing.qty += qtyNum;
      await existing.save();
    } else {
      const newItem = new CartItem({
        _id: uuidv4(),
        productId,
        name: product.name,
        price: product.price,
        qty: qtyNum,
      });
      await newItem.save();
    }

    const updatedCart = await CartItem.find({});
    res.json({ cartItems: updatedCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ❌ DELETE /api/cart/:id — remove item
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await CartItem.deleteOne({ _id: id });
    const updatedCart = await CartItem.find({});
    res.json({ cartItems: updatedCart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
