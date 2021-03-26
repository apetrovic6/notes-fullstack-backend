const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { jwtToken } = require("../config/keys");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 1,
    maxLength: 20,
    required: true,
    validate: {
      validator: (v) => {
        return (v && v.length >= 1) || (v && v.length > 20);
      },
      message:
        "Username must have at least 1 character and no more than 20 characters.",
    },
  },
  password: {
    type: String,
    minLength: 5,
    maxLength: 100,
    required: true,
    validate: {
      validator: (v) => {
        return v && v.length >= 5;
      },
      message: "Password must have at least 5 characters.",
    },
  },
  notes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Note",
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, jwtToken);
  return token;
};

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(1).max(20).required(),
    password: Joi.string().min(5).max(100).required(),
  });
  return schema.validate(user);
};

exports.User = User;
exports.userSchema = userSchema;
exports.validateUser = validateUser;
