// middleware/auth.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = "yourSecretKey"; // Must match the one used in auth.js

// ✅ Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ error: "Authorization token missing" });
  }
};

// ✅ Middleware to check admin user
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ error: "Access denied: Admins only" });
    }
  });
};

module.exports = { verifyToken, verifyAdmin };
