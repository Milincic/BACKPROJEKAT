const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authenticate = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Public routes (no authentication required)
app.use('/auth', createProxyMiddleware({ target: process.env.AUTH_SERVICE_URL, changeOrigin: true }));

// Protected routes (authentication required)
app.use('/forms', authenticate, createProxyMiddleware({ target: process.env.FORM_SERVICE_URL, changeOrigin: true }));
app.use('/responses', authenticate, createProxyMiddleware({ target: process.env.RESPONSE_SERVICE_URL, changeOrigin: true }));
app.use('/collaborations', authenticate, createProxyMiddleware({ target: process.env.COLLABORATION_SERVICE_URL, changeOrigin: true }));

// Health check route
app.get('/', (req, res) => {
  res.send('API Gateway is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
