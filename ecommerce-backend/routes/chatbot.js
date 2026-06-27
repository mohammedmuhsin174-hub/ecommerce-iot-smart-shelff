//ecommerce-backend\routes\chatbot.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Helper function to log debug information
const debugLog = (message, data) => {
  console.log(`[CHATBOT DEBUG] ${message}`, data);
};

// POST - Process chatbot queries
router.post('/query', async (req, res) => {
  try {
    const { query } = req.body;
    
    debugLog('Received query', query);
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    
    // Normalize query
    const normalizedQuery = query.toLowerCase().trim();
    debugLog('Normalized query', normalizedQuery);
    
    // Extract budget if mentioned
    const budgetMatch = normalizedQuery.match(/\$?(\d+)/g);
    const budget = budgetMatch 
      ? Math.max(...budgetMatch.map(num => parseInt(num.replace('$', ''))))
      : null;
    debugLog('Extracted budget', budget);
    
    // Check for category mentions
    const categories = {
      phones: ['phone', 'smartphone', 'mobile', 'cell phone', 'iphone', 'android', 'samsung', 'pixel'],
      laptops: ['laptop', 'notebook', 'computer', 'pc', 'macbook', 'chromebook'],
      accessories: ['accessory', 'accessories', 'headphone', 'earphone', 'charger', 'case', 'cover', 'cable']
    };
    
    // Determine category from query
    let matchedCategory = null;
    Object.keys(categories).forEach(category => {
      if (categories[category].some(keyword => normalizedQuery.includes(keyword))) {
        matchedCategory = category;
      }
    });
    debugLog('Matched category', matchedCategory);
    
    // Build MongoDB query
    const mongoQuery = {};
    
    // Filter by category if found
    if (matchedCategory) {
      mongoQuery.category = matchedCategory;
    }
    
    // Filter by budget if mentioned
    if (budget) {
      mongoQuery.price = { $lte: budget };
    }
    
    // Extract keywords for search (excluding numbers and common words)
    const keywords = normalizedQuery
      .replace(/\d+/g, '')
      .split(' ')
      .filter(word => word.length > 2) // Filter out short words
      .filter(word => !['the', 'and', 'for', 'with', 'that', 'this', 'can', 'you'].includes(word)); // Filter common words
    
    debugLog('Extracted keywords', keywords);
    
    // Text search in product name and description
    if (keywords.length > 0) {
      const keywordRegex = keywords.map(word => new RegExp(word, 'i'));
      
      mongoQuery.$or = [
        { name: { $in: keywordRegex } },
        { description: { $in: keywordRegex } }
      ];
    }
    
    debugLog('MongoDB query', mongoQuery);
    
    // Find matching products
    let products = await Product.find(mongoQuery).limit(5);
    debugLog('Found products count', products.length);
    
    // If no products found with specific filters, try a more generic search
    if (products.length === 0 && (matchedCategory || budget)) {
      debugLog('No products found with specific filters, trying generic search');
      
      // Remove category and budget constraints but keep keyword search
      const genericQuery = { ...mongoQuery };
      delete genericQuery.category;
      delete genericQuery.price;
      
      products = await Product.find(genericQuery).limit(5);
      debugLog('Generic search found products count', products.length);
    }
    
    // If budget is specified, sort products by price proximity to budget
    if (budget && products.length > 0) {
      products.sort((a, b) => Math.abs(a.price - budget) - Math.abs(b.price - budget));
      debugLog('Sorted products by budget proximity');
    }
    
    // Ensure product URLs are correct by appending proper product ID
    products = products.map(product => {
      // Create a plain JavaScript object from the Mongoose document
      const productObj = product.toObject ? product.toObject() : product;
      // Ensure the product URL is correctly formed with the product ID
      productObj.url = `/products/${productObj._id}`;
      return productObj;
    });
    
    // Create response
    let response;
    if (products.length === 0) {
      response = {
        message: "I couldn't find any products matching your criteria. Could you provide more details or try with different specifications or budget?",
        products: [],
        debug: {
          query: normalizedQuery,
          budget,
          matchedCategory,
          mongoQuery
        }
      };
    } else {
      response = {
        message: products.length === 1 
          ? "I found this product that matches your requirements:"
          : "Here are some products that match your requirements:",
        products: products,
        debug: {
          query: normalizedQuery,
          budget,
          matchedCategory,
          productCount: products.length
        }
      };
    }
    
    debugLog('Final response', { messageStart: response.message.substring(0, 50), productCount: response.products.length });
    res.json(response);
    
  } catch (err) {
    console.error('Chatbot API Error:', err);
    res.status(500).json({ 
      error: 'Failed to process chatbot query',
      debug: {
        errorMessage: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
      }
    });
  }
});

module.exports = router;