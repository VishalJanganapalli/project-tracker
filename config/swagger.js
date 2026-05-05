const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project Tracker API',
      version: '1.0.0',
      description: 'Authentication and project management API',
      contact: {
        name: 'API Support',
        email: 'support@projecttracker.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      {
        url: 'https://project-tracker-puce-mu.vercel.app',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              description: 'User full name',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john@example.com',
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'User password (min 6 characters)',
              example: '123456',
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              description: 'User role',
              example: 'user',
            },
          },
        },
        UserResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'User ID',
            },
            name: {
              type: 'string',
              description: 'User full name',
            },
            email: {
              type: 'string',
              description: 'User email address',
            },
            role: {
              type: 'string',
              description: 'User role',
            },
            avatar: {
              type: 'string',
              description: 'User avatar URL',
            },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            token: {
              type: 'string',
              description: 'JWT authentication token',
            },
            user: {
              $ref: '#/components/schemas/UserResponse',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
};
