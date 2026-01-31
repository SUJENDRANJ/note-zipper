const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
require("colors");

const app = express();

connectDB()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server Started".yellow);
    });
  })
  .catch((err) => {
    console.log(`Server Failed ${err.message}`.red);
  });
