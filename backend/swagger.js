// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Stock Trading API',
      version: '1.0.0',
      description: 'API documentation for stock trading application',
    },
    servers: [
      {
        url: 'http://localhost:3800',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your API route files
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
