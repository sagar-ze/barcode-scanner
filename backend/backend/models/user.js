const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 3,
    max: 50
  },
  password: {
    type: String,
    min: 8,
    max: 100
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  barcode: {
    type: Number
  },
  editedBy: {
    type: String
  }
});
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      isAdmin: this.isAdmin,
      barcode: this.barcode,
      email: this.email
    },
    process.env.SECRET_KEY
  );
  return token;
};
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const Schema = {
    email: joi
      .string()
      .email()
      .required()
      .label("Email"),
    password: joi
      .string()
      .min(8)
      .max(100)
      .required()
      .label("Password"),
    name: joi
      .string()
      .min(3)
      .max(50)
      .required()
      .label("Name"),
    barcode: joi.number().label("Barcode")
  };
  return joi.validate(user, Schema);
}
exports.User = User;
exports.validate = validateUser;
