// ecommerce-backend\routes\checkout.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51RGMrpRqccA9Q3XWBotsl8df5D8ClpSb24rq8SmbuGpLrMBGdmY8EZUKxNxXdiGYqvKuLDkP1BB9LsCNZVgJ8nz100jXSFj17m'); // your secret key

router.post('/', async (req, res) => {
  const { cart, userId, userName } = req.body;
  
  // Log received data for debugging
  console.log('📦 Checkout Request Data:', {
    userId: userId,
    userName: userName,
    cartSize: Array.isArray(cart) ? cart.length : 'not an array'
  });

  try {
    // Ensure cart is always an array
    const cartItems = Array.isArray(cart) ? cart : [cart];
    
    if (cartItems.length === 0) {
      return res.status(400).send({ error: 'Cart is empty' });
    }
    
    // Ensure userId is a string and not undefined or null
    const sanitizedUserId = userId ? String(userId) : 'guest';

    // Properly format line items for Stripe
    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [], // Handle possible undefined image
        },
        unit_amount: Math.round(item.price * 100), // Ensure it's an integer
      },
      quantity: item.quantity || 1, // Default to 1 if quantity is missing
    }));

    // Create compact cart representation for metadata
    // Stripe metadata has size limits, so we need to be careful with large carts
    const metadataCart = cartItems.map(item => ({
      id: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['IN'],
      },
      metadata: {
        userId: sanitizedUserId,
        userName: userName || 'Guest',
        cartSize: cartItems.length.toString(),
        // Safely stringify cart data with size limits in mind
        cart: JSON.stringify(metadataCart).substring(0, 500) // Limit metadata size
      },
      // Also add userId to client_reference_id as a backup method
      client_reference_id: sanitizedUserId,
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.send({ id: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).send({ error: 'Stripe Checkout Failed', details: error.message });
  }
});

module.exports = router;