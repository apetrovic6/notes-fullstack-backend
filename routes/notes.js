const auth = require("../middleware/auth");
const { Note } = require("../models/note");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  await Note.find(req.query).then((foundNotes) => res.json(foundNotes));
});

router.get("/:id", auth, async (req, res) => {
  try {
    await Note.findById(req.params.id && req.params.usr).then((foundNotes) =>
      res.json(foundNotes)
    );
  } catch (err) {
    console.log(err);
  }
});

router.post("/create", auth, async (req, res) => {
  let note = new Note({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
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
