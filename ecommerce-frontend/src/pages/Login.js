import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ For redirect
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // ✅ Save access token (correctly stored)
      const { accessToken, user } = res.data;  // Destructure the response

      localStorage.setItem('token', accessToken);  // Store access token
      localStorage.setItem('user', JSON.stringify(user));  // Store user data

      console.log("Saved user data:", user);

      alert('Login successful!');
      setError('');

      // Redirect based on user role (isAdmin)
      if (user.isAdmin) {
        navigate('/admin'); // Admin dashboard route
      } else {
        navigate('/'); // Regular user route
      }
    } catch (err) {
      console.log(err.response);
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
