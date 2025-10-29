
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
    // 🔁 Force reseed if needed (set true to refresh all products)
    await seedProductsIfNeeded(true);
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));

// app.use(cors());
app.use(cors({
  origin:"https://mock-e-com-cart-frontend.onrender.com",
   // only allow your Vite app
  credentials: true
}));

app.use(bodyParser.json());

// ✅ Routes
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);

app.get('/', (req, res) => res.send('Mock E-com backend (MongoDB)'));

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
