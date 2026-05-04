# Authentication API Documentation

## Base URL
`http://localhost:5000/api/auth`

## Endpoints

### 1. Register User
- **POST** `/register`
- **Description**: Register a new user
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "123456",
    "role": "admin"
  }
  ```
  **Note**: `role` is optional. If not provided, defaults to "user". Valid values: "user", "admin"
- **Response**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "avatar": ""
    }
  }
  ```

### 2. Login User
- **POST** `/login`
- **Description**: Authenticate user and get token
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "123456"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "avatar": ""
    }
  }
  ```

### 3. Get Current User
- **GET** `/me`
- **Description**: Get current authenticated user profile
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "success": true,
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "avatar": "",
      "isActive": true,
      "createdAt": "2026-05-04T11:51:45.504Z"
    }
  }
  ```

## Usage Examples

### Using PowerShell
```powershell
# Register as regular user
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -ContentType "application/json" -Body '{"name":"Test User","email":"test@example.com","password":"123456"}'

# Register as admin
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -ContentType "application/json" -Body '{"name":"Admin User","email":"admin@example.com","password":"123456","role":"admin"}'

# Login
$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"test@example.com","password":"123456"}'
$token = $response.token

# Get current user
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/me" -Method GET -Headers @{"Authorization"="Bearer $token"}
```

## Security Features
- Password hashing with bcryptjs
- JWT token authentication
- Role-based access control (user/admin)
- Account activation/deactivation
- Input validation and sanitization
