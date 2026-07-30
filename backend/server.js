
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./src/config/db');

const { router: productsRouter, seedProductsIfNeeded } = require('./src/routes/products');
const cartRouter = require('./src/routes/cart');
const checkoutRouter = require('./src/routes/checkout');

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Connect to MongoDB
connectDB()
  .then(async () => {
    // Seed products only when the collection is empty. Passing `true` here
    // deleted + reinserted all products on every restart, regenerating their
    // _ids and orphaning any cart items that referenced the old ids.
    await seedProductsIfNeeded(false);
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Allow the Vite dev server on ANY localhost port. Vite auto-bumps the port
// (5173 → 5174 → …) when one is busy, and a hardcoded origin then silently
// fails CORS — which shows up in the UI as "failed to add item".
app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser tools (curl/Postman) that send no Origin header.
    if (!origin || /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`Origin not allowed by CORS: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(bodyParser.json());

// ✅ Routes
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);

app.get('/', (req, res) => res.send('Mock E-com backend (MongoDB)'));

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
