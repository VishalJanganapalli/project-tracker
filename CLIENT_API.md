# Client Management API Documentation

## Base URL
`http://localhost:5000/api/clients`

## Authentication
All client endpoints require authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 1. Create Client
- **POST** `/`
- **Description**: Create a new client
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "mobileNumber": "+1234567890",
    "notes": "Important client"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "client_id",
      "name": "John Doe",
      "email": "john@example.com",
      "mobileNumber": "+1234567890",
      "notes": "Important client",
      "isActive": true,
      "createdBy": "user_id",
      "createdAt": "2026-05-05T10:00:00.000Z",
      "updatedAt": "2026-05-05T10:00:00.000Z"
    }
  }
  ```

### 2. Get All Clients
- **GET** `/`
- **Description**: Get all clients for the authenticated user
- **Response**:
  ```json
  {
    "success": true,
    "count": 2,
    "data": [
      {
        "_id": "client_id",
        "name": "John Doe",
        "email": "john@example.com",
        "mobileNumber": "+1234567890",
        "company": "ABC Corp",
        "isActive": true,
        "createdAt": "2026-05-05T10:00:00.000Z"
      }
    ]
  }
  ```

### 3. Get Single Client
- **GET** `/:id`
- **Description**: Get a specific client by ID
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "client_id",
      "name": "John Doe",
      "email": "john@example.com",
      "mobileNumber": "+1234567890",
      "notes": "Important client",
      "isActive": true,
      "createdBy": "user_id",
      "createdAt": "2026-05-05T10:00:00.000Z",
      "updatedAt": "2026-05-05T10:00:00.000Z"
    }
  }
  ```

### 4. Update Client
- **PUT** `/:id`
- **Description**: Update a client by ID
- **Request Body**: Same as create client (all fields optional)
- **Response**: Same as get single client with updated data

### 5. Delete Client
- **DELETE** `/:id`
- **Description**: Delete a client by ID
- **Response**:
  ```json
  {
    "success": true,
    "data": {}
  }
  ```

## Required Fields
- `name`: Client name (required, max 100 chars)
- `email`: Client email (required, unique, valid email)
- `mobileNumber`: Mobile number (required, valid phone format)

## Optional Fields
- `notes`: Additional notes (max 500 chars)

## Usage Examples

### Using PowerShell
```powershell
# First, login to get token
$loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"your-email@example.com","password":"your-password"}'
$token = $loginResponse.token

# Create client
$clientData = @{
  name = "John Doe"
  email = "john@example.com"
  mobileNumber = "+1234567890"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/clients" -Method POST -ContentType "application/json" -Headers @{"Authorization"="Bearer $token"} -Body $clientData

# Get all clients
Invoke-RestMethod -Uri "http://localhost:5000/api/clients" -Method GET -Headers @{"Authorization"="Bearer $token"}
```
