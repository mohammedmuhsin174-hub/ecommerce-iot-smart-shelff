//ecommerce-frontend\src\pages\Register.js
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Success() {
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    // Call clearCart only once after component mounts
    clearCart();

    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
    
    // Empty dependency array → only run once when page opens
  }, []);  

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>✅ Payment Successful!</h1>
      <p>Thank you for your order. You’ll be redirected shortly...</p>
    </div>
  );
}

export default Success;
