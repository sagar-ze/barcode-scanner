const router = require("express").Router();
const _ = require("lodash");
const moment = require("moment");
const auth = require("../middleware/auth");
const { User } = require("../models/user");
const { Attendance } = require("../models/attendace");
const { Rule } = require("../models/rule");

router.post("/attendance/:id", async (req, res) => {
  const st = moment().startOf("day");
  const att = await Attendance.find({
    arrivalTime: { $gte: st },
    barcode: req.params.id
  });
  if (att.length) {
    res.status(400).send("Already Done");
  } else {
    const rule = await Rule.findById("5e3d5fd277b32c493bf06789");
    const f = moment().format("LT");
    const currentMonth = moment().format("MMMM");
    const now = moment().isoWeekday();
    const mapDate = {
      7: "sunday",
      1: "monday",
      2: "tuesday",
      3: "wednesday",
      4: "thursday",
      5: "friday",
      6: "saturday"
    };
    // console.log(now)
    const currentTime = mapDate[now];
    // parse time using 24-hour clock and use UTC to prevent DST issues
    if (rule[currentTime]) {
      var start = moment.utc(rule[currentTime], "HH:mm");
      var end = moment.utc(f, "HH:mm");
      var minutes = await start.diff(end, "minutes");
      if (minutes >= 30) {
        return res.status(400).send("You are too late !");
      } else {
        const user = await User.findOne({ barcode: req.params.id });
        if (!user) return res.status(400).send("Invalid barcode");
        const attendance = await new Attendance({
          barcode: req.params.id,
          name: user.name,
          day: rule[currentTime],
          month: currentMonth
        });
        await attendance.save();
        res.status(200).send(user);
      }
    } else {
      res.status(400).send("Sorry Today is Off !");
    }
  }
});

router.put("/rule/:id", async (req, res) => {
  const rule = await Rule.findByIdAndUpdate(
    req.params.id,
    {
      sunday: req.body.sunday,
      monday: req.body.monday,
      tuesday: req.body.tuesday,
      wednesday: req.body.wednesday,
      thursday: req.body.thursday
    },
    { new: true }
  );
  if (!rule) return res.status(404).send("Invalid Id");
  res.status(200).send("Done");
});

router.get("/rule/:id", async (req, res) => {
  const rule = await Rule.findById(req.params.id);
  if (!rule) return res.status(404).send("Invalid Id");
  res.status(200).send(rule);
});

router.get("/present-days", async (req, res) => {
  const start = moment().startOf("month"); // set to 12:00 am tomonth
  const end = moment().endOf("month"); // set to 23:59 pm today
  const attendace = await Attendance.find({
    arrivalTime: { $gte: start, $lt: end }
  }).select("-_id");
  if (!attendace) return res.status(404).send("No attendance");
  res.status(200).send(attendace);
});
module.exports = router;
