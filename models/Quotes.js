const mongoose = require("mongoose");
const { Schema } = mongoose;

const quoteSchema = new Schema({
  comic: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
  quoteID: {
    type: Number,
    required: true,
  },
});

mongoose.model("quotes", quoteSchema);
