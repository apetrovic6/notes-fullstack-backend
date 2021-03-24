const auth = require("../middleware/auth");
const { Note, validateNote } = require("../models/note");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    await Note.find({ userId: req.query.userId }).then((foundNotes) =>
      res.json(foundNotes)
    );
  } catch (err) {
    console.log(err);
  }
});

router.get("/:noteId", auth, async (req, res) => {
  try {
    await Note.find({
      _id: req.params.noteId,
    }).then((foundNotes) => res.json(foundNotes));
  } catch (err) {
    console.log(err);
  }
});

router.post("/create", auth, async (req, res) => {
  const { error } = validateNote(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let note = new Note({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
  });
  note = await note.save();
  res.send(note);
});

router.put("/:id", auth, async (req, res) => {
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      content: req.body.content,
    },
    { new: true }
  );

  res.send(note);
});

router.delete("/:id", auth, async (req, res) => {
  const note = await Note.findByIdAndRemove(req.params.id);

  res.send(note);
});

module.exports = router;
