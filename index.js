const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server on PORT: ${PORT}`);
});
