const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("users");
const { nanoid } = require("nanoid");
const { isValidEmail } = require("../helpers/helper");

Router.post("/register", async (req, res, next) => {
  const { email } = req.body;
  if (!isValidEmail(email)) {
    return res.json({
      status: "error",
      msg: "Please provide a valid email address",
    });
  }
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.json({
        status: "success",
        msg:
          "Email ID is already registered with us. We have mailed the API Key on this email.",
        user: foundUser,
        email,
      });
    } else {
      try {
        let newUser = await new User({
          email,
          key: nanoid(8).toLowerCase(),
          hitCount: 0,
        }).save();
        console.log(`From the DB: ${newUser}`);
        return res.json({
          status: "success",
          msg: "Registered, your API key is mailed to you",
          user: newUser,
          email,
        });
      } catch (err) {
        console.log(err.message);
        next(err);
      }
    }
  } catch (err) {
    next(err);
  }
});

module.exports = Router;
