const Joi = require("joi");
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 1,
    maxLength: 100,
    required: true,
    validate: {
      validator: (v) => {
        return v && v.length >= 1;
      },
      message: "Note title has to have at least one character",
    },
  },
  content: {
    type: String,
    maxLength: 10000,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: (v) => {
        return v;
      },
      message: "User ID not present.",
    },
  },
});

const validateNote = (note) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    content: Joi.string().max(10000),
    userId: Joi.string().required(),
  });
  return schema.validate(note);
};

const Note = mongoose.model("Note", noteSchema);

exports.Note = Note;
exports.noteSchema = noteSchema;
exports.validateNote = validateNote;
