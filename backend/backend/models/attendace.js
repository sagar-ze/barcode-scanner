const mongoose = require("mongoose");
const moment = require("moment");
const attendanceSchema = new mongoose.Schema({
  arrivalTime: {
    type: Date,
    default: moment().format("lll")
  },
  day: {
    type: String
  },
  barcode: {
    type: Number
  },
  month: {
    type: String
  },
  name: {
    type: String
  }
});
const Attendance = mongoose.model("Attendance", attendanceSchema);

exports.Attendance = Attendance;
