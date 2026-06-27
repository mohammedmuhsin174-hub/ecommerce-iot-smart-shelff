//ecommerce-backend\models\Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  description: String,
  price: { type: Number, required: true },
  category: String,
  image: String, // we'll use URL for now
  rating: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  specifications: { type: Object }, // Add this line
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);