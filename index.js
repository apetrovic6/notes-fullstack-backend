const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./routes/auth");

const { mongo } = require("./config/keys");
const notes = require("./routes/notes");
const user = require("./routes/users");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(mongo, { useNewUrlParser: true }, { useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Couldn't connect to mongo", err));

app.use("/api/Notes", notes);
app.use("/api/Users", user);
app.use("/api/auth", auth);

app.get("/", (req, res) => {
  res.send("It werks");
});

PORT = 5000;

app.listen(PORT);
