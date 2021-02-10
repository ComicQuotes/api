const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("users");
const { nanoid } = require("nanoid");

Router.post("/register", async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ msg: "Please provide an Email" });
  }
  try {
    let newUser = await new User({ email, key: nanoid(5), hitCount: 0 }).save();
    console.log(`From the DB: ${newUser}`);
    return res.json(newUser);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

module.exports = Router;
