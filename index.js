const express = require("express");
const app = express();
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");

require("./models/Quotes");
require("./models/Users");

const apiRoutes = require("./routes/apiRoutes");
const userRoutes = require("./routes/userRoutes");

const MONGO_URI = process.env.MONGO_URI || require("./keys").MONGO_URI;

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
app.set("trust proxy", 1);

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: {
    message: "Too many requests, please try again later.",
  },
});

mongoose.connect(
  MONGO_URI,
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

app.use("/api/", apiLimiter);
app.use("/", userRoutes);
app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
  res.json(error);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
});
