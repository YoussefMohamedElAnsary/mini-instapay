const jwt = require('jsonwebtoken');
const axios = require('axios');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (!/^Bearer$/i.test(scheme) || !token) {
    return res.status(401).json({ error: 'Token malformed' });
  }

  try {
    // Verify the token
    const secretKey = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secretKey);
    
    // Get user details from user service
    const response = await axios.get(`${process.env.USER_SERVICE_URL}/api/users/${decoded.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    req.user = response.data;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = {
  authenticateToken
}; 