const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'imgs/headerbkg.jpg'
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  Going: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  DateOfEvent: {
    type: Date,
  },
});

module.exports = mongoose.model("Event", PostSchema);
