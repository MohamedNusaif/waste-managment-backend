const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NGO Waste Management API",
      version: "1.0.0",
      description:
        "API documentation for NGO Waste Clothes & Product Distribution System",
    },
    tags: [
      {
        name: "Users",
        description: "User management APIs",
      },
    ],
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;