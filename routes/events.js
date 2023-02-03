const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const eventsController = require("../controllers/events");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


// //Event Routes
router.get("/createEventPage", ensureAuth, eventsController.getCreateEvent);
router.get("/:id", ensureAuth, eventsController.getEvent);
router.post("/createEvent", eventsController.createEvent);
router.put("/going/:id", eventsController.playersGoing);
router.delete("/deleteEvent/:id", eventsController.deleteEvent);

module.exports = router;
