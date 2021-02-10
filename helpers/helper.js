const mongoose = require("mongoose");
const User = mongoose.model("users");

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const checkAPIKey = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      const foundUser = await User.findOne({ key });
      if (foundUser) {
        User.findOneAndUpdate(
          { key },
          { $set: { hitCount: ++foundUser.hitCount } }
        ).then(() => {
          console.log("Updated Hits");
          resolve(true);
        });
      } else {
        resolve(false);
      }
    } catch (e) {
      return reject(e);
    }
  });
};

module.exports = {
  isEmpty,
  checkAPIKey,
};
