const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Note = require("../models/Note");

// @desc Get user notes
// @route GET /api/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).lean().exec();
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const notes = await Note.find({ user: req.user._id }).lean().exec();

  res.status(200).json(notes);
});

// @desc Get user note
// @route GET /api/notes/:id
// @access Private
const getNote = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).lean().exec();
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const note = await Note.findById(req.params.id).lean().exec();

  if (!note) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  if (note.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  res.status(200).json(note);
});

// @desc Create new note
// @route POST /api/notes
// @access Private
const createNote = asyncHandler(async (req, res) => {
  const { title, content, categories } = req.body;

  if (!title) {
    return res.status(400).json({ message: "The title is required" });
  }
  const user = await User.findById(req.user._id).lean().exec();
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const duplicatedTitle = await Note.findOne({ title }).lean().exec();
  if (duplicatedTitle) {
    return res.status(409).json({ message: "Duplicated title" });
  }

  const note = await Note.create({
    user,
    title,
    content,
    categories,
  });

  if (note) {
    res.status(201).json(note);
  } else {
    res.status(400).json({ message: "Invalid note data received" });
  }
});

module.exports = {
  getNotes,
  getNote,
  createNote,
};
