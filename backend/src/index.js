require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { pool } = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS first so preflight requests succeed
app.use(cors());
app.use(express.json());

// Security Middlewares
// Disable crossOriginResourcePolicy during dev to allow frontend fetches
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', apiLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);

// Test DB Route
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      success: true, 
      time: result.rows[0].now, 
      message: 'Database connected successfully!' 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Database connection failed.', 
      error: error.message 
    });
  }
});

app.get('/', (req, res) => {
  res.send('ProSearch API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
