const mongoose = require("mongoose");
const dbDebug = require("debug")("app:db");

const DB_URL = process.env.DB_URL;
module.exports = () => {
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(success => dbDebug("Database is up an running!"))
    .catch(ex => dbDebug("Database server is down..."));
};
