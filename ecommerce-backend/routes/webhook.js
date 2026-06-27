//ecommerce-backend\routes\webhook.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51RGMrpRqccA9Q3XWBotsl8df5D8ClpSb24rq8SmbuGpLrMBGdmY8EZUKxNxXdiGYqvKuLDkP1BB9LsCNZVgJ8nz100jXSFj17m');
const Order = require('../models/Order');

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = 'whsec_6e1b9a04a2e1b9e3a17234736a2fc2227046a5d4a0fa38c7a42e5a18e202663e';

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(`❌ Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('📦 Stripe Event Received:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    console.log('🧾 Stripe Session Object:', JSON.stringify(session, null, 2));

    try {
      // Extract info from session - try multiple sources for userId
      let userId = 'guest';
      
      // Log the session metadata for debugging
      console.log('🔍 Session metadata:', session.metadata);
      console.log('🔍 Client reference ID:', session.client_reference_id);
      
      // Check for userId in multiple places with priority
      if (session.metadata?.userId && session.metadata.userId !== 'guest') {
        userId = session.metadata.userId;
        console.log('✅ Using userId from metadata:', userId);
      } else if (session.client_reference_id && session.client_reference_id !== 'guest') {
        userId = session.client_reference_id;
        console.log('✅ Using userId from client_reference_id:', userId);
      } else {
        console.log('⚠️ No valid userId found, using default:', userId);
      }
      
      const userName = session.metadata?.userName || 'Guest User';
      
      // Safely handle cart data
      let cart = [];
      try {
        if (session.metadata?.cart) {
          cart = JSON.parse(session.metadata.cart);
        }
        // If cart is not valid or empty, try to get line items from the session
        if (!Array.isArray(cart) || cart.length === 0) {
          console.log('⚠️ Cart data missing or invalid in metadata, attempting to fetch line items');
          // Retrieve the session with line items expanded
          const retrievedSession = await stripe.checkout.sessions.retrieve(session.id, {
            expand: ['line_items'],
          });
          
          if (retrievedSession.line_items && retrievedSession.line_items.data) {
            // Create cart from line items
            cart = retrievedSession.line_items.data.map(item => ({
              name: item.description || 'Product',
              price: item.amount_total / 100,
              quantity: item.quantity
            }));
          }
        }
      } catch (parseError) {
        console.error('❌ Error parsing cart data:', parseError);
        cart = [];
      }
      
      const customerEmail = session.customer_details?.email || '';
      const customerName = session.customer_details?.name || '';
      const customerId = session.customer || '';
      const amount = session.amount_total ? session.amount_total / 100 : 0;
      const address = session.customer_details?.address || {};

      // Create products array from cart data
      const products = cart.map(item => ({
        productId: item.id || item._id || 'unknown',
        name: item.name || 'Product',
        image: item.image || '',
        price: item.price || 0,
        quantity: item.quantity || 1,
      }));

      const newOrder = new Order({
        orderId: session.id,
        userId,
        userName,
        email: customerEmail,
        customerName,
        customerId,
        products,
        amount,
        address,
        status: 'Paid',
      });

      await newOrder.save();
      console.log('✅ Order saved to database');
    } catch (error) {
      console.error('❌ Failed to save order:', error.message);
      console.error(error.stack);
    }
  }

  res.status(200).send();
});

module.exports = router;