 

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ✅ Full list of products
const products = [
  { name: "Vibe Tee", price: 19.99 },
  { name: "Vibe Hoodie", price: 539.99 },
  { name: "Vibe Cap", price: 112.5 },
  { name: "Vibe Sneakers", price: 459.99 },
  { name: "Vibe Backpack", price: 645.0 },
  { name: "Vibe Socks", price: 26.99 },
  { name: "Vibe Watch", price: 1299.99 },
  { name: "Vibe Sunglasses", price: 249.99 },
  { name: "Vibe Water Bottle", price: 79.5 },
  { name: "Vibe Fitness Band", price: 899.0 },
  { name: "Vibe Earbuds", price: 1499.99 },
  { name: "Vibe Laptop Sleeve", price: 329.99 },
  { name: "Vibe Travel Mug", price: 59.99 },
  { name: "Vibe Duffel Bag", price: 799.99 },
  { name: "Vibe Beanie", price: 89.99 },
  { name: "Vibe Tumbler", price: 49.5 },
  { name: "Vibe Wireless Charger", price: 349.99 },
  { name: "Vibe Hoodie Zip-Up", price: 589.0 },
  { name: "Vibe Denim Jacket", price: 749.99 },
  { name: "Vibe Joggers", price: 329.99 },
  { name: "Vibe Polo Shirt", price: 219.5 },
  { name: "Vibe Power Bank", price: 499.0 },
  { name: "Vibe Smart Speaker", price: 1799.0 },
  { name: "Vibe Keychain", price: 39.99 },
  { name: "Vibe Tote Bag", price: 129.5 },
  { name: "Vibe Graphic Tee", price: 249.99 },
];

// ✅ Seed or re-seed products
async function seedProductsIfNeeded(force = false) {
  const count = await Product.countDocuments();
  if (count === 0 || force) {
    if (force) await Product.deleteMany({});
    await Product.insertMany(products);
    // console.log(`✅ Seeded ${products.length} products into MongoDB`);
  }
}

// ✅ Automatically seed once
seedProductsIfNeeded().catch((err) => console.error("Seed error:", err));

// ✅ GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({}, { name: 1, price: 1 }).lean();
    res.json(
      products.map((p) => ({
        _id: p._id,
        id: p._id,
        name: p.name,
        price: p.price,
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { router, seedProductsIfNeeded };
