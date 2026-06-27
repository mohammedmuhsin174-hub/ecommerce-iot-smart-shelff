//ecommerce-backend\models\Shelf.js
const mongoose = require('mongoose');

const shelfSchema = new mongoose.Schema({
  productName: String,
  rfidTag: String,
  timestamp: Date,
  action: String  // e.g., 'removed' or 'returned'
});

module.exports = mongoose.model('Shelf', shelfSchema);
