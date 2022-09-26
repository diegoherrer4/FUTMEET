const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  playerslimit: {type: Number, required: true },
  going: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  eventDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", EventSchema);
