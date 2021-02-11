const mongoose = require("mongoose");
const User = mongoose.model("users");

const checkAPIKey = async (req, res, next) => {
  const key = req.params.key;
  try {
    const foundUser = await User.findOne({ key });
    if (foundUser) {
      User.findOneAndUpdate(
        { key },
        { $set: { hitCount: ++foundUser.hitCount } }
      ).then(() => {
        next();
      });
    } else {
      return res.json({ error: "Invalid API Key" });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = checkAPIKey;
