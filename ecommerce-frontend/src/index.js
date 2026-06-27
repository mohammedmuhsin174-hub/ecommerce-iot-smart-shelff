//ecommerce-frontend\src\index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext'; // ✅ Import CartProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <CartProvider> {/* ✅ Wrap App inside CartProvider */}
      <App />
    </CartProvider>
  
);
