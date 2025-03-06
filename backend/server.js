const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(`Server running successfully at ${port}`);
});
