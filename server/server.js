const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
require("colors");
const cors = require("cors");

const userRoutes = require("./routes/user.js");
const noteRoutes = require("./routes/note.js");
const { notFound, errorHandler } = require("./middlewares/error.js");

const app = express();
app.use(express.json()); // to accept json data

app.use(
  cors({
    origin: ["https://note-zipper-app.netlify.app", "http://localhost:5173"],
    // credentials: true, // only for cookies
  }),
);

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// --------------------------deployment------------------------------
const path = require("path");

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "client", "dist", "index.html")),
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server Started".yellow);
    });
  })
  .catch((err) => {
    console.log(`Server Failed ${err.message}`.red);
  });
