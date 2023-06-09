const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
      unique: true,
    },
    content: String,
    archived: {
      type: Boolean,
      required: true,
      default: false,
    },
    categories: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
