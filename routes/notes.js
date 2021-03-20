const { Note } = require("../models/note");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  Note.find().then((foundNotes) => res.json(foundNotes));
});

router.get("/:id", async (req, res) => {
  try {
    await Note.findById(req.params.id).then((foundNotes) =>
      res.json(foundNotes)
    );
  } catch (err) {
    console.log(err);
  }
});

router.post("/create", async (req, res) => {
  let note = new Note({
    title: req.body.title,
    content: req.body.content,
  });
  note = await note.save();
  res.send(note);
});

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  const note = await Note.findByIdAndRemove(req.params.id);

  res.send(note);
});

module.exports = router;
