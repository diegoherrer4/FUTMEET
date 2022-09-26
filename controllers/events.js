const Event = require("../models/Event");
const helper = require("../public/js/dateFormat")

module.exports = {
  getProfile: async (req, res) => {
    try {
      const events = await Event.find({ user: req.user.id });

      res.render("profile.ejs", { events: events, user: req.user, helper: helper });
    } catch (err) {
      console.log(err);
    }
  },
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { events: events, user: req.user, helper: helper});
    } catch (err) {
      console.log(err);
    }
  },
  // getEvent: async (req, res) => {
  //   try {
  //     const event = await Event.findById(req.params.id);
  //     res.render("event.ejs", { event: event, user: req.user });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },

  getCreateEvent: async (req, res) => {
    try {
      res.render("createEvent.ejs");
    } catch (err) {
      console.log(err);
    }
  },
  createEvent: async (req, res) => {
    try {
      await Event.create({
        title: req.body.title,
        location: req.body.location,
        description: req.body.description,
        playerslimit: req.body.playerslimit,
        going: 1,
        user: req.user.id,
        eventDate: req.body.date
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
      // Delete event from db
      await Event.remove({ _id: req.params.id });
      console.log("Deleted event");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
