//ecommerce-backend\models
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String },           // 🆕 added Stripe session id
    userId: { type: String, required: true },
    userName: { type: String },
    email: { type: String },
    customerName: { type: String },       // 🆕 added
    customerId: { type: String },          // 🆕 added
    products: [
      {
        productId: { type: String },
        name: { type: String },
        image: { type: String },
        price: { type: Number },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, default: {} },
    status: { type: String, default: 'Pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
