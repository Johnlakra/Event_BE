const express = require("express");
const router = express.Router();
const {
  createPosition,
  getPosition,
  getPositions,
  editPosition,
  deletePosition,
} = require("../controllers/positionController");

router.route("/").get(getPositions).post(createPosition).put(editPosition);

router.route("/:id").get(getPosition).delete(deletePosition);

module.exports = router;
