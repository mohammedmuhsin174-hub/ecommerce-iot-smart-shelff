// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;



// Connect to MongoDB Atlas
const mongoURI = "mongodb+srv://muhs7n:muhsin123@cluster0.hnpndme.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// CORS Middleware - allow all origins for development
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use('/api/webhook', require('./routes/webhook'));
// Parse JSON bodies (must come before any route that expects JSON)
app.use(express.json());

// API Routes

app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/checkout', require('./routes/checkout'));
app.use('/api/chatbot', require('./routes/chatbot'));
app.use('/api/shelf', require('./routes/shelfRoutes')); // ✅ Smart Shelf Route



// Default route
app.get('/', (req, res) => {
  res.send('🛒 E-commerce backend is running!');
});

// Start Server on 0.0.0.0 so other devices (like ESP32) can connect
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
