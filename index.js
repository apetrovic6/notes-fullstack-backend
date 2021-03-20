const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { mongo } = require("./config/keys");
const notes = require("./routes/notes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(mongo, { useNewUrlParser: true }, { useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Couldnt connect to mongo", err));

app.use("/api/notes", notes);

app.get("/", (req, res) => {
  res.send("It werks");
});

PORT = 5000;

app.listen(PORT);
