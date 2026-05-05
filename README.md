# Project Tracker - Client Management API

A Node.js/Express server for managing clients and projects with authentication.

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Role-based access control (user/admin)

### Client Management
- Create, read, update, delete clients
- User-specific client isolation
- Client information includes:
  - Name (required)
  - Email (required, unique)
  - Mobile Number (required)
  - Notes (optional)
  - Active/Inactive status

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Clients
- `POST /api/clients` - Create new client
- `GET /api/clients` - Get all clients for authenticated user
- `GET /api/clients/:id` - Get specific client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Health Check
- `GET /health` - Check API status and environment variables

## Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

1. Clone the repository
2. Navigate to server directory:
   ```bash
   cd server
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/project-tracker
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=30d
   ```

5. Start the server:
   ```bash
   npm start
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5000) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `JWT_EXPIRE` | JWT expiration time | No (default: 30d) |

## Usage Examples

### Register a new user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create a client (with authentication token)
```bash
curl -X POST http://localhost:5000/api/clients \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Client Name",
    "email": "client@example.com",
    "mobileNumber": "+1234567890",
    "notes": "Important client notes"
  }'
```

### Get all clients
```bash
curl -X GET http://localhost:5000/api/clients \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Database Schema

### Users Collection
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  avatar: String,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Clients Collection
```javascript
{
  name: String (required, max 100 chars),
  email: String (required, unique),
  mobileNumber: String (required),
  notes: String (max 500 chars),
  isActive: Boolean (default: true),
  createdBy: ObjectId (ref: 'User', required),
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Input validation and sanitization
- User-specific data isolation
- CORS enabled
- Rate limiting ready (can be added)

## Deployment

### Vercel (Serverless)
The server is configured for Vercel deployment:

1. Set environment variables in Vercel dashboard
2. Deploy using Vercel CLI or GitHub integration
3. The `vercel.json` file handles serverless configuration

### Traditional Hosting
For traditional hosting (AWS, DigitalOcean, etc.):

1. Set `NODE_ENV=production`
2. Configure MongoDB connection
3. Set up reverse proxy (nginx/Apache)
4. Use process manager (PM2)

## API Documentation

- [Authentication API](./AUTH_API.md) - Detailed auth endpoints
- [Client API](./CLIENT_API.md) - Detailed client endpoints

## Project Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── clientController.js  # Client CRUD operations
├── middleware/
│   └── auth.js              # Authentication middleware
├── models/
│   ├── User.js              # User schema
│   └── Client.js            # Client schema
├── routes/
│   ├── auth.js              # Authentication routes
│   └── clients.js           # Client routes
├── .env                     # Environment variables
├── package.json             # Dependencies
├── server.js                # Main server file
└── vercel.json              # Vercel configuration
```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (when implemented)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
