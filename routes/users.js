const auth = require("../middleware/auth");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const { User, validateUser } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.get("/", (req, res) => {
  User.find().then((foundUsers) => res.json(foundUsers));
});

router.get("/:id", async (req, res) => {
  await User.findById(req.params.id).then((foundUser) => res.json(foundUser));
});

router.post("/create", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let user = await User.findOne({
    username: req.body.username,
  });

  if (user) return res.status(400).send("User already registered");

  user = new User(_.pick(req.body, ["username", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "username"]));
});

router.put("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      password: req.body.password,
    },
    { new: true }
  );
  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  res.send(user);
});

module.exports = router;
