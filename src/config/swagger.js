const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "NGO Waste Management API",
    version: "1.0.0",
    description:
      "API documentation for NGO Waste Clothes & Product Distribution System",
  },
  servers: [
    {
      url: "http://localhost:5000",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // important
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;