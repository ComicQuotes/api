const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("users");
const { nanoid } = require("nanoid");
const { isValidEmail } = require("../helpers/helper");
const { sendVerificationMail } = require("../helpers/mailer");

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
      try {
        await sendVerificationMail(foundUser.key, email);
      } catch (err) {
        console.log(err);
      }
      return res.json({
        status: "success",
        msg:
          "Email ID is already registered with us. We have mailed the API Key on this email. If you do not recieve the mail, kindly check in your Spam Folder.",
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
        await sendVerificationMail(newUser.key, email);
        return res.json({
          status: "success",
          msg: `Registered, here is your API Key, please save this for future references. A mail has also been sent to you with the Key. If you do not recieve the mail, please check in your Spam Folder.`,
          user: newUser,
          email,
          key: newUser.key,
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
