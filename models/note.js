const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 1,
    maxLength: 255,
    required: true,
  },
  content: {
    type: String,
    maxLength: 10000,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Note = mongoose.model("Note", noteSchema);

exports.Note = Note;
exports.noteSchema = noteSchema;
