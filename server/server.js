const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
require("colors");
const cors = require("cors");

const userRoutes = require("./routes/user.js");
const noteRoutes = require("./routes/note.js");
const { notFound, errorHandler } = require("./middlewares/error.js");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["https://note-zipper-app.netlify.app", "http://localhost:5173"],
  }),
);

// Health check (Render uses this implicitly)
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// Error middlewares (keep these LAST)
app.use(notFound);
app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server Started".yellow);
    });
  })
  .catch((err) => {
    console.log(`Server Failed ${err.message}`.red);
  });
