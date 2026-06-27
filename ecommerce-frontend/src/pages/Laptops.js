// src/pages/Laptops.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../Components/ProductCard';
import './Home.css';

function Laptops() {
  const [laptops, setLaptops] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then((res) => {
        const laptopProducts = res.data.filter((p) => p.category === 'Laptops');
        setLaptops(laptopProducts);
      })
      .catch((err) => console.error('Error fetching laptops:', err));
  }, []);

  return (
    <div className="product-list">
      <h2>Laptops</h2>
      <div className="products-grid">
        {laptops.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Laptops;
