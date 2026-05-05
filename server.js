const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const { specs } = require('./config/swagger');

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

// Swagger JSON Specification
app.get('/api-docs', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

// Simple API Documentation HTML
app.get('/docs', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Project Tracker API Documentation</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
        .endpoint { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .method { padding: 5px 10px; border-radius: 3px; color: white; font-weight: bold; }
        .post { background: #49cc90; }
        .get { background: #61affe; }
        pre { background: #f8f8f8; padding: 10px; border-radius: 3px; overflow-x: auto; }
        .json-link { color: #007bff; text-decoration: none; }
        .swagger-box { background: #e3f2fd; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #2196f3; }
        .button { background: #2196f3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 5px; }
      </style>
    </head>
    <body>
      <h1>Project Tracker API Documentation</h1>
      <p><strong>Base URL:</strong> https://project-tracker-puce-mu.vercel.app</p>
      
      <div class="swagger-box">
        <h2>🚀 Interactive Swagger UI</h2>
        <p>For the best interactive testing experience, use our API with the official Swagger UI:</p>
        <a href="https://swagger.io/tools/swagger-ui/" class="button" target="_blank">Open Swagger UI</a>
        <p><strong>Instructions:</strong></p>
        <ol>
          <li>Click the "Open Swagger UI" button above</li>
          <li>In the Swagger UI, click the "Explore" button</li>
          <li>Enter our API specification URL: <code>https://project-tracker-puce-mu.vercel.app/api-docs</code></li>
          <li>Enjoy full interactive testing with authentication!</li>
        </ol>
      </div>
      
      <p><a href="/api-docs" class="json-link">📄 View OpenAPI JSON Specification</a></p>
      
      <h2>Authentication Endpoints</h2>
      
      <div class="endpoint">
        <h3><span class="method post">POST</span> /api/auth/register</h3>
        <p><strong>Description:</strong> Register a new user</p>
        <p><strong>Request Body:</strong></p>
        <pre>{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "user"
}</pre>
        <p><strong>Response:</strong> 201 Created with JWT token and user data</p>
      </div>
      
      <div class="endpoint">
        <h3><span class="method post">POST</span> /api/auth/login</h3>
        <p><strong>Description:</strong> Authenticate user and get token</p>
        <p><strong>Request Body:</strong></p>
        <pre>{
  "email": "john@example.com",
  "password": "123456"
}</pre>
        <p><strong>Response:</strong> 200 OK with JWT token and user data</p>
      </div>
      
      <div class="endpoint">
        <h3><span class="method get">GET</span> /api/auth/me</h3>
        <p><strong>Description:</strong> Get current authenticated user profile</p>
        <p><strong>Headers:</strong> Authorization: Bearer &lt;jwt_token&gt;</p>
        <p><strong>Response:</strong> 200 OK with user profile data</p>
      </div>
      
      <h2>How to Use</h2>
      <ol>
        <li>Register a user or login to get a JWT token</li>
        <li>Copy the token from the response</li>
        <li>Include it in the Authorization header for protected routes: <code>Authorization: Bearer &lt;token&gt;</code></li>
      </ol>
      
      <h2>Testing Options</h2>
      
      <div class="swagger-box">
        <h3>🎯 Recommended: Swagger UI Online</h3>
        <p><strong>URL:</strong> <a href="https://swagger.io/tools/swagger-ui/" target="_blank">swagger.io/tools/swagger-ui/</a></p>
        <p><strong>Steps:</strong></p>
        <ol>
          <li>Visit Swagger UI</li>
          <li>Click "Explore" or paste this URL: <code>https://project-tracker-puce-mu.vercel.app/api-docs</code></li>
          <li>Test all endpoints with interactive forms</li>
          <li>Use the "Authorize" button for JWT authentication</li>
        </ol>
      </div>
      
      <div class="swagger-box">
        <h3>📝 Alternative: Swagger Editor</h3>
        <p><strong>URL:</strong> <a href="https://editor.swagger.io/" target="_blank">editor.swagger.io</a></p>
        <p>Import our spec URL: <code>https://project-tracker-puce-mu.vercel.app/api-docs</code></p>
      </div>
      
      <p><strong>Other Testing Tools:</strong></p>
      <ul>
        <li>Postman (import OpenAPI spec from /api-docs)</li>
        <li>Insomnia (import OpenAPI spec)</li>
        <li>curl commands or any HTTP client</li>
      </ul>
    </body>
    </html>
  `);
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