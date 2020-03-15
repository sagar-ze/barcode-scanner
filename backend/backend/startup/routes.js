const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const error = require("../middleware/error");

const userRoute = require("../routes/user");
const authRoute = require("../routes/auth");
const attendanceRoute = require("../routes/attendace");

module.exports = function(app) {
  // app.use(compression());
  app.use(express.json());
  app.use(morgan("dev"));
  app.use("/api", userRoute);
  app.use("/api", authRoute);
  app.use("/api", attendanceRoute);
  app.use(error);
};
