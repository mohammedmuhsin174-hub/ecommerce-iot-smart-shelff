// src/pages/Checkout.js
import React, { useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // ✅ Import this

const stripePromise = loadStripe('pk_test_51RGMrpRqccA9Q3XWqifWDVn7G5fhhNPHSTux2vKz0HO0EvG46A4tXs6rrUZ27jidG7AqDjSk5Bwt5VMJY8liGat400bvKoizuR');

function Checkout() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate(); // ✅ Setup navigation

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user) {
        alert('Please login first.');
        navigate('/login'); // ✅ redirect to login
        return;
      }

      if (cart.length === 0) {
        alert('Please add items to cart first.');
        navigate('/'); // ✅ redirect to home
        return;
      }

      const response = await axios.post('http://localhost:5000/api/checkout', {
        cart,
        userId: user._id,
        userName: user.name,
      });

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Something went wrong during checkout.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Checkout</h2>
      <p>Click the button below to proceed with secure payment.</p>
      <button onClick={handleCheckout}>Proceed to Payment</button>
    </div>
  );
}

export default Checkout;
