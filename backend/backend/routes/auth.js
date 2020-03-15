const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/auth", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Username or Password");
  const validatePass = await bcrypt.compare(req.body.password, user.password);
  if (!validatePass) return res.status(400).send("Invalid credential !");
  const token = user.generateAuthToken();
  res.send(token);
});
function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email().label('Email'),
    password: Joi.string()
      .min(5)
      .max(255)
      .required().label('Password')
  };
  return Joi.validate(req, schema);
}

module.exports = router;
