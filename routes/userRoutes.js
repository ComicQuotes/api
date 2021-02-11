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
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.json({
        message:
          "Email ID is already registered with us. If you have lost your API Key, please contact the developer to retrieve it.",
      });
    } else {
      try {
        let newUser = await new User({
          email,
          key: nanoid(8).toLowerCase(),
          hitCount: 0,
        }).save();
        console.log(`From the DB: ${newUser}`);
        return res.json(newUser);
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
