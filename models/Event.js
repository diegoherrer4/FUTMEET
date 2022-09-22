const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
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
  going: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("Event", EventSchema);
