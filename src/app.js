const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes");
const requestRoutes = require("./routes/requestRoutes");
const swaggerSpec = require("./config/swagger");
const swaggerUi = require("swagger-ui-express");


const userRoutes =
require("./routes/userRoutes");

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/donations", donorRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/users", userRoutes);

module.exports = app;