const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  key: {
    type: String,
    required: true,
    unique: true,
  },
  hitCount: {
    type: Number,
  },
});

mongoose.model("users", userSchema);
