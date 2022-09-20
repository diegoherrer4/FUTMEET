const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const eventsController = require("../controllers/events");
const homeController = require("../controllers/home");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Event Routes - simplified for now
router.get("/:id", ensureAuth, eventsController.getEvent);

router.get("/createEvent", ensureAuth, eventsController.getCreateEvent);

router.post("/createEvent", upload.single("file"), eventsController.createEvent);

router.put("/playersGoing/:id", eventsController.playersGoing);

router.delete("/deleteEvent/:id", eventsController.deleteEvent);

module.exports = router;
