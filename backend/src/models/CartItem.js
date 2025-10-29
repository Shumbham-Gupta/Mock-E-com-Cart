const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // we'll store uuid here
  productId: { type: String, required: true, ref: 'Product' },
  qty: { type: Number, required: true },
  name: { type: String, required: true }, // denormalize product name & price for snapshot
  price: { type: Number, required: true }
}, { _id: false, timestamps: false });

module.exports = mongoose.model('CartItem', CartItemSchema);
