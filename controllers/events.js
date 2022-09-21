const cloudinary = require("../middleware/cloudinary");
const Event = require("../models/Event");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const events = await Event.find({ user: req.user.id });
      res.render("profile.ejs", { events: events, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { events: events });
    } catch (err) {
      console.log(err);
    }
  },
  getEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      res.render("event.ejs", { event: event, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createEvent: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Event.create({
        title: req.body.title,
        location: req.body.location,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        description: req.body.description,
        Going: 0,
        user: req.user.id,
        date: ""
      });
      console.log("Event has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  playersGoing: async (req, res) => {
    try {
      await Event.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { going: 1 },
        }
      );
      console.log("Going +1");
      res.redirect(`/event/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteEvent: async (req, res) => {
    try {
      // Find event by id
      let event = await Event.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(event.cloudinaryId);
      // Delete event from db
      await Event.remove({ _id: req.params.id });
      console.log("Deleted event");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
