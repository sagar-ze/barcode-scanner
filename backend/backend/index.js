const express = require("express");
require("express-async-errors");
require("dotenv").config({ debug: process.env.DEBUG });
const startup = require("debug")("app:startup");
const cors=require("cors")
const app = express();

process.on("uncaughtException", function(err) {
  console.error(new Date().toUTCString() + " uncaughtException:", err.message);
  console.error(err.stack);
  process.exit(1);
});
app.use(cors())
require("./startup/db")();
require("./startup/routes")(app);
//require("./startup/cors")(app);
require("./startup/config")();

const port = process.env.PORT || 7777;
app.listen(port, (err, done) => {
  if (err) startup("Maybe Server is down !");
  startup(` We are up and listening on port ${port} ...`);
});
