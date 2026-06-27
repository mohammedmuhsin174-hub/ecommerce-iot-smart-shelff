//ecommerce-backend\routes\products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { verifyAdmin } = require('../middleware/auth'); // 🛡️ Import admin middleware

// ✅ GET all products (Public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET one product by ID (Public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('❌ Error getting product by ID:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ POST create a product (🛡️ Admin only)
router.post('/', verifyAdmin, async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    brand: req.body.brand,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    rating: req.body.rating,
    stock: req.body.stock,
    specifications: req.body.specifications, // Add this line
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ PUT update a product by ID (🛡️ Admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('❌ Error updating product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});
// ✅ DELETE a product by ID (🛡️ Admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// routes/products.js
router.get('/category/:categoryName', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryName });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category products" });
  }
});

module.exports = router;
