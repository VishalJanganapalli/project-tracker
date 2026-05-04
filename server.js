const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Project Tracker API is running' });
});

app.get('/health', (req, res) => {
  res.json({ 
    message: 'Health check',
    hasMongoUri: !!process.env.MONGODB_URI,
    hasJwtSecret: !!process.env.JWT_SECRET,
    mongoUriLength: process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0
  });
});

// ❌ REMOVE app.listen()
// ✅ EXPORT the app with database connection
module.exports = async (req, res) => {
  try {
    // Check if environment variables are set
    if (!process.env.MONGODB_URI) {
      return res.status(500).json({ message: 'MONGODB_URI environment variable not set' });
    }
    
    // Ensure database is connected before handling request
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error('Database connection error:', error);
    
    // Provide more specific error messages
    if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      return res.status(500).json({ message: 'Database host not found. Check MONGODB_URI.' });
    } else if (error.message.includes('ECONNREFUSED')) {
      return res.status(500).json({ message: 'Database connection refused. Check credentials.' });
    } else if (error.message.includes('authentication')) {
      return res.status(500).json({ message: 'Database authentication failed. Check username/password.' });
    } else {
      return res.status(500).json({ message: `Database connection failed: ${error.message}` });
    }
  }
};