// src/pages/CategoryPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css'; // Reuse your product card styles

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/category/${categoryName}`);
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching category products:', err);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div className="product-list">
      <h2>{categoryName.toUpperCase()}</h2>
      <div className="products-grid">
        {products.map((product) => (
          <Link to={`/product/${product._id}`} className="product-card" key={product._id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
