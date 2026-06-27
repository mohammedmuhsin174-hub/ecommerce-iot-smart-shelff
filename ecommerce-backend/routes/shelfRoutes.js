const express = require('express');
const router = express.Router();
const Shelf = require('../models/Shelf');

// GET /api/shelf
router.get('/', async (req, res) => {
  try {
    const data = await Shelf.find().sort({ timestamp: -1 });
    
    // Transform data to match what the frontend expects
    const transformedData = data.map(item => ({
      _id: item._id,
      productName: item.productName,
      rfid: item.rfidTag,  // Transform rfidTag to rfid for frontend
      status: item.action, // Transform action to status for frontend
      updatedAt: item.timestamp
    }));
    
    res.json(transformedData);
  } catch (err) {
    console.error('GET error:', err);
    res.status(500).json({ error: 'Failed to fetch shelf data.' });
  }
});

// POST /api/shelf
router.post('/', async (req, res) => {
  try {
    console.log('Received data:', req.body);
    
    // Extract from request body - accept both naming conventions
    const productName = req.body.productName;
    const rfidTag = req.body.rfidTag || req.body.rfid; // Accept either field name
    const action = req.body.action || req.body.status; // Accept either field name
    
    if (!productName || !rfidTag || !action) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        received: req.body
      });
    }

    const newShelfItem = new Shelf({
      productName,
      rfidTag,
      action,
      timestamp: new Date()
    });
    
    await newShelfItem.save();
    
    // Transform response to match frontend expectations
    const responseItem = {
      _id: newShelfItem._id,
      productName: newShelfItem.productName,
      rfid: newShelfItem.rfidTag,
      status: newShelfItem.action,
      updatedAt: newShelfItem.timestamp
    };
    
    res.status(201).json(responseItem);
  } catch (err) {
    console.error('POST error:', err);
    res.status(500).json({ error: 'Failed to add shelf data: ' + err.message });
  }
});

// PUT /api/shelf/:id
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    const updatedItem = await Shelf.findByIdAndUpdate(
      req.params.id,
      { action: status }, // Map status to action
      { new: true }
    );
    
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    // Transform response to match frontend expectations
    const responseItem = {
      _id: updatedItem._id,
      productName: updatedItem.productName,
      rfid: updatedItem.rfidTag,
      status: updatedItem.action,
      updatedAt: updatedItem.timestamp
    };
    
    res.json(responseItem);
  } catch (err) {
    console.error('PUT error:', err);
    res.status(500).json({ error: 'Failed to update shelf status.' });
  }
});

module.exports = router;