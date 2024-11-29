export const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'TYPESCRIPT API Documentation',
      description: 'API documentation for the typescript ServerSide API.',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3113',
        description: 'Local server',
      },
    ],
    paths: {
      '/api/sign-up': {
        post: {
          summary: 'Create Users',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                    surname: { type: 'string' },
                    firstname: { type: 'string' },
                    employername: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Successful operation',
            },
          },
        },
      },
  
      '/api/user-login': {
        post: {
          summary: 'logging in users',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'User logged in successfully',
            },
          },
          security: [{ JWT: [] }], // Add security requirement for JWT token
        },
      },
  
      '/api/forget-password': {
        post: {
          summary: 'When a user forget their password',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Successful operation',
            },
          },
        },
      },

      '/api/get-user': {
        post: {
          summary: 'Get a user by email',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Successful operation',
            },
          },
        },
      },
    },
    security: [
      {
        JWT: [],
      },
    ],
    components: {
      securitySchemes: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'JWT Authorization header using the Bearer scheme',
        },
      },
    },
    cors: {
      enabled: true,
      origins: ['*'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      headers: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Location', 'Access-Control-Expose-Headers'],
      maxAge: 3600,
      credentials: true,
    },
  }