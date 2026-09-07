const express = require("express");
const router = express.Router();
const {
  // createStage,
  // getStage,
  getStages,
  // editStage,
  // deleteStage,
} = require("../controllers/stagesController");

router.route("/").get(getStages)
// .post(createStage).put(editStage);

//router.route("/:id").get(getStage).delete(deleteStage);

module.exports = router;
