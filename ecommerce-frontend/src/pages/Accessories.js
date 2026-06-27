// src/pages/Accessories.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../Components/ProductCard';
import './Home.css';

function Accessories() {
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then((res) => {
        const accessoryProducts = res.data.filter((p) => p.category === 'Accessories');
        setAccessories(accessoryProducts);
      })
      .catch((err) => console.error('Error fetching accessories:', err));
  }, []);

  return (
    <div className="product-list">
      <h2>Accessories</h2>
      <div className="products-grid">
        {accessories.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Accessories;
