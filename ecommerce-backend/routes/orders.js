// ecommerce-backend\routes\orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// 🛒 POST - Create Order (Logged-in user)
router.post('/', verifyToken, async (req, res) => {
  try {
    const newOrder = new Order({
      userId: req.user.id,
      products: req.body.products,
      amount: req.body.amount,
      address: req.body.address
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: "Failed to place order" });
  }
});

// 📦 GET - All Orders (Admin only)
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
