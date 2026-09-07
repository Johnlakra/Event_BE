const express = require("express");
const {
  getEvents,
  createEvent,
  editEvent,
  deleteEvent,
  getEvent,
} = require("../controllers/eventController");
const router = express.Router();

router.route("/").get(getEvents).post(createEvent).put(editEvent);

router.route("/:id").get(getEvent).delete(deleteEvent);

module.exports = router;
