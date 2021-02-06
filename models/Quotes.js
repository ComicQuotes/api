const mongoose = require("mongoose");
const { Schema } = mongoose;

const quoteSchema = new Schema({
  character: {
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
