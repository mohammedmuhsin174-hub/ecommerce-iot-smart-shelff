// src/pages/Phones.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../Components/ProductCard';
import './Home.css'; // Reusing same CSS

function Phones() {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then((res) => {
        const phoneProducts = res.data.filter((p) => p.category === 'Phones');
        setPhones(phoneProducts);
      })
      .catch((err) => console.error('Error fetching phones:', err));
  }, []);

  return (
    <div className="product-list">
      <h2>Phones</h2>
      <div className="products-grid">
        {phones.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Phones;
