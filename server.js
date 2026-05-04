const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database (no process.exit in serverless)
connectDB().catch(err => {
  console.error('Database connection error:', err);
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Project Tracker API is running' });
});

// ❌ REMOVE app.listen()
// ✅ EXPORT the app
module.exports = app;