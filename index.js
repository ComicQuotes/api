const express = require("express");
const app = express();
const mongoose = require("mongoose");

const keys = require("./keys");

require("./models/Quotes");
require("./models/Users");

const apiRoutes = require("./routes/apiRoutes");
const userRoutes = require("./routes/userRoutes");

mongoose.connect(
  keys.mongoURI,
  {
    authSource: "admin",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Connected to DB Servers");
  }
);

app.use(express.json());

app.use("/", userRoutes);
app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
  res.json(error);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
});
