const mongoose = require("mongoose");
const moment = require("moment");
const ruleSchema = new mongoose.Schema({
  sunday: {
    type: String
  },
  monday: {
    type: String
  },
  tuesday: {
    type: String
  },
  wednesday: {
    type: String
  },
  thursday: {
    type: String
  },
  friday: {
    type: String
  }
});
const Rule = mongoose.model("Rule", ruleSchema);

exports.Rule = Rule;
