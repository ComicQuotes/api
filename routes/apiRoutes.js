const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const Quote = mongoose.model("quotes");

Router.get("/", (req, res, next) => {
  res.json({ msg: "Youve hit Whatsup" });
});

// Method: POST
// Create a new Quote in the DB
Router.post("/quote", async (req, res, next) => {
  const { character, quote, quoteID } = req.body;
  try {
    let newQuote = await new Quote({ character, quote, quoteID }).save();
    console.log(`From the DB: ${newQuote}`);
    res.json(newQuote);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

module.exports = Router;
