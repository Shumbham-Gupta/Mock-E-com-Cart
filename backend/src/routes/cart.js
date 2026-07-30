
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// Single source of truth for the cart response shape.
// Every endpoint returns { cartItems, total } with the nested product shape
// the frontend expects (item.product.name / item.product.price).
async function getCart() {
  const items = await CartItem.find({}).lean();
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const cartItems = items.map(it => ({
    _id: it._id,
    product: {
      _id: it.productId,
      name: it.name,
      price: it.price,
    },
    qty: it.qty,
  }));
  return { cartItems, total: Number(total.toFixed(2)) };
}

// 🛒 GET /api/cart — return cart items + total
router.get('/', async (req, res) => {
  try {
    res.json(await getCart());
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

    res.json(await getCart());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// 🔁 PUT /api/cart/:id — set an item's absolute quantity.
// qty <= 0 removes the line (matches how real carts treat "− below 1").
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const qtyNum = Number(req.body.qty);

    if (isNaN(qtyNum)) {
      return res.status(400).json({ error: 'qty must be a number' });
    }

    if (qtyNum <= 0) {
      await CartItem.deleteOne({ _id: id });
      return res.json(await getCart());
    }

    const item = await CartItem.findById(id);
    if (!item) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    item.qty = qtyNum;
    await item.save();
    res.json(await getCart());
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
    res.json(await getCart());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
