// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);
  
  // Load user data from localStorage
  useEffect(() => {
    try {
      const userData = localStorage.getItem('user');
      console.log("Raw user data from localStorage:", userData);
      
      if (!userData) {
        console.log("No user data found in localStorage");
        return;
      }
      
      const parsedUser = JSON.parse(userData);
      console.log("Parsed user data:", parsedUser);
      setUser(parsedUser);
      
    } catch (err) {
      console.error("Error loading user data:", err);
      localStorage.removeItem('user');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (searchQuery.trim() === '') {
        setSearchResults([]);
        return;
      }
      
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        const filtered = res.data.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
      } catch (err) {
        console.error('Error fetching products for search:', err);
        setSearchResults([]);
      }
    };
    
    fetchProducts();
  }, [searchQuery]);

  const handleResultClick = (productId) => {
    setSearchQuery('');
    setSearchResults([]);
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar__logo">
          <Link to="/">ElectroCart</Link>
        </div>
        
        {/* 🔍 Search Bar */}
        <div className="navbar__search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map(product => (
                <div
                  key={product._id}
                  className="search-result-item"
                  onClick={() => handleResultClick(product._id)}
                >
                  <img src={product.image} alt={product.name} />
                  <span>{product.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <ul className="navbar__links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          
          {/* Admin link available to all users */}
          <li><Link to="/admin">Admin</Link></li>
          
          {user ? (
            <>
              <li className="navbar__welcome">Welcome, {user.name}</li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
      
      <div className="category-nav">
        <Link to="/category/phones">Phones</Link>
        <Link to="/category/laptops">Laptops</Link>
        <Link to="/category/accessories">Accessories</Link>
      </div>
    </>
  );
}

export default Navbar;