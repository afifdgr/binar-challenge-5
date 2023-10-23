const express = require("express"),
  app = express(),
  router = require("./src/routes/index"),
  bodyParser = require("body-parser"),
  swaggerUi = require("swagger-ui-express"),
  swaggerJson = require("./openapi.json");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/v1", router);
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerJson));

module.exports = app;
