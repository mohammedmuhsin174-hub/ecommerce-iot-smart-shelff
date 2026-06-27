//ecommerce-frontend\src\pages\Admin.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shelfData, setShelfData] = useState([]);
  
  // Temperature sensor states
  const [temperature, setTemperature] = useState(23.5);
  const [humidity, setHumidity] = useState(45);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    category: 'Phones',
    image: '',
    stock: '',
    specifications: {
      ram: '',
      storage: '',
      camera: '',
      processor: ''
    }
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.isAdmin) {
      alert('Access denied. Admin privileges required.');
      navigate('/');
      return;
    }
    fetchData(activeTab);
  }, [activeTab, navigate]);

  // Simulate DHT11 sensor data updates
  useEffect(() => {
    if (activeTab === 'smartshelf') {
      // Initial update
      updateSensorData();
      
      // Update sensor data every 30 seconds with small realistic changes
      const interval = setInterval(() => {
        updateSensorData();
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, [activeTab]);
  
  // Function to update sensor data with realistic changes
  const updateSensorData = () => {
    // Temperature varies by -0.3 to +0.3 degrees
    const tempChange = (Math.random() * 0.6) - 0.3;
    // Humidity varies by -1 to +1 percent
    const humChange = (Math.random() * 2) - 1;
    
    setTemperature(prev => {
      const newTemp = parseFloat((prev + tempChange).toFixed(1));
      // Keep temperature in realistic range (18-32°C)
      return Math.min(Math.max(newTemp, 18), 32);
    });
    
    setHumidity(prev => {
      const newHum = Math.round(prev + humChange);
      // Keep humidity in realistic range (30-70%)
      return Math.min(Math.max(newHum, 30), 70);
    });
    
    setLastUpdate(new Date());
  };
  
  // Get temperature status color
  const getTemperatureColor = () => {
    if (temperature < 22) return 'temp-cold';
    if (temperature > 28) return 'temp-hot';
    return 'temp-normal';
  };

  const fetchData = async (tabName) => {
    setLoading(true);
    setError(null);
    try {
      let response;
      switch (tabName) {
        case 'products':
          response = await axios.get('http://localhost:5000/api/products');
          setProducts(response.data);
          break;
        case 'users':
          // Updated endpoint to use auth/users instead of User
          response = await axios.get('http://localhost:5000/api/auth/users', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          setUsers(response.data);
          break;
        case 'orders':
          response = await axios.get('http://localhost:5000/api/orders', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          setOrders(response.data);
          break;
        case 'smartshelf':
          response = await axios.get('http://localhost:5000/api/shelf');
          setShelfData(response.data);
          break;
        default:
          break;
      }
      setLoading(false);
    } catch (err) {
      console.error(`Error fetching ${tabName}:`, err);
      setError(`Failed to load ${tabName}. ${err.response?.data?.error || err.message}`);
      setLoading(false);
    }
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setNewProduct(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setNewProduct(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', newProduct, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Product added successfully!');
      setNewProduct({
        name: '',
        brand: '',
        description: '',
        price: '',
        category: 'Phones',
        image: '',
        stock: '',
        specifications: {
          ram: '',
          storage: '',
          camera: '',
          processor: ''
        }
      });
      fetchData('products');
    } catch (err) {
      alert(`Failed to add product: ${err.response?.data?.error || err.message}`);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${productId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        alert('Product deleted successfully!');
        fetchData('products');
      } catch (err) {
        alert(`Failed to delete product: ${err.response?.data?.error || err.message}`);
      }
    }
  };
  
  // New function to handle deleting a user
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/auth/users/${userId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        alert('User deleted successfully!');
        fetchData('users');
      } catch (err) {
        alert(`Failed to delete user: ${err.response?.data?.error || err.message}`);
      }
    }
  };

  // Function for editing a user (placeholder for now)
  const handleEditUser = (userId) => {
    // This would open a modal or redirect to an edit page
    console.log(`Edit user with ID: ${userId}`);
    alert('Edit user functionality will be implemented soon.');
  };
  
  // Function to manually trigger temperature reading update for demo
  const refreshTemperature = () => {
    updateSensorData();
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      <div className="admin-tabs">
        <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Products</button>
        <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>Users</button>
        <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Orders</button>
        <button className={activeTab === 'smartshelf' ? 'active' : ''} onClick={() => setActiveTab('smartshelf')}>Smart Shelf</button>
      </div>

      <div className="admin-content">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            {activeTab === 'products' && (
              <div className="products-section">
                <h2>Manage Products</h2>

                <div className="add-product-form">
                  <h3>Add New Product</h3>
                  <form onSubmit={handleAddProduct}>
                    <div className="form-group">
                      <label>Name:</label>
                      <input type="text" name="name" value={newProduct.name} onChange={handleNewProductChange} required />
                    </div>
                    <div className="form-group">
                      <label>Brand:</label>
                      <input type="text" name="brand" value={newProduct.brand} onChange={handleNewProductChange} required />
                    </div>
                    <div className="form-group">
                      <label>Description:</label>
                      <textarea name="description" value={newProduct.description} onChange={handleNewProductChange} required />
                    </div>
                    <div className="form-group">
                      <label>Price:</label>
                      <input type="number" name="price" value={newProduct.price} onChange={handleNewProductChange} required />
                    </div>
                    <div className="form-group">
                      <label>Stock:</label>
                      <input type="number" name="stock" value={newProduct.stock} onChange={handleNewProductChange} required />
                    </div>
                    <div className="form-group">
                      <label>Category:</label>
                      <select name="category" value={newProduct.category} onChange={handleNewProductChange}>
                        <option value="Phones">Phones</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Accessories">Accessories</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Image URL:</label>
                      <input type="text" name="image" value={newProduct.image} onChange={handleNewProductChange} required />
                    </div>
                    <h4>Specifications</h4>
                    <div className="form-group">
                      <label>RAM:</label>
                      <input type="text" name="specifications.ram" value={newProduct.specifications.ram} onChange={handleNewProductChange} />
                    </div>
                    <div className="form-group">
                      <label>Storage:</label>
                      <input type="text" name="specifications.storage" value={newProduct.specifications.storage} onChange={handleNewProductChange} />
                    </div>
                    <div className="form-group">
                      <label>Camera:</label>
                      <input type="text" name="specifications.camera" value={newProduct.specifications.camera} onChange={handleNewProductChange} />
                    </div>
                    <div className="form-group">
                      <label>Processor:</label>
                      <input type="text" name="specifications.processor" value={newProduct.specifications.processor} onChange={handleNewProductChange} />
                    </div>
                    <button type="submit" className="add-btn">Add Product</button>
                  </form>
                </div>

                <h3>Current Products</h3>
                <div className="products-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product._id}>
                          <td><img src={product.image} alt={product.name} className="product-thumb" /></td>
                          <td>{product.name}</td>
                          <td>{product.brand}</td>
                          <td>{product.category}</td>
                          <td>${product.price}</td>
                          <td>{product.stock}</td>
                          <td>
                            <button className="edit-btn">Edit</button>
                            <button className="delete-btn" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="users-section">
                <h2>Manage Users</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Date Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button className="edit-btn" onClick={() => handleEditUser(user._id)}>Edit</button>
                          <button className="delete-btn" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'orders' && (
              <>
                <h2>Orders</h2>
                <table>
                  <thead>
                    <tr><th>User</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th></tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o._id}>
                        <td>{o.user?.name || 'Unknown'}</td>
                        <td>
                          {o.products.map(item => (
                            <div key={item._id}>
                              {item.name} x {item.quantity}
                            </div>
                          ))}
                        </td>
                        <td>${o.amount}</td>
                        <td>{o.status}</td>
                        <td>{new Date(o.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            {activeTab === 'smartshelf' && (
              <div className="smart-shelf-section">
                <h2>Smart Shelf Monitor</h2>
                
                {/* Temperature Sensor Display */}
                <div className="sensor-container">
                  <div className="sensor-box">
                    <h3>DHT11 Temperature Sensor</h3>
                    <div className={`temperature-display ${getTemperatureColor()}`}>
                      <div className="sensor-reading">
                        <div className="reading-value">{temperature}°C</div>
                        <div className="sensor-label">Temperature</div>
                      </div>
                      <div className="sensor-reading">
                        <div className="reading-value">{humidity}%</div>
                        <div className="sensor-label">Humidity</div>
                      </div>
                    </div>
                    <div className="sensor-meta">
                      <div className="sensor-status">Status: <span className="status-active">Active</span></div>
                      <div className="sensor-updated">Last updated: {lastUpdate.toLocaleTimeString()}</div>
                      <button className="refresh-btn" onClick={refreshTemperature}>Refresh Reading</button>
                    </div>
                  </div>
                </div>
                
                <table>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>RFID</th>
                      <th>Status</th>
                      <th>Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shelfData.map(item => (
                      <tr key={item._id}>
                        <td>{item.productName}</td>
                        <td>{item.rfid}</td>
                        <td>{item.status}</td>
                        <td>{new Date(item.updatedAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Admin;


