const express = require("express");
const router = express.Router();
const {
  getLiveOnStages,
  createLiveOnStage,
  editLiveOnStage,
  addBatchLiveOnStage,
} = require("../controllers/liveOnStageController");

router
  .route("/")
  .get(getLiveOnStages)
  .post(createLiveOnStage)
  .put(editLiveOnStage);

router.route("/batch").post(addBatchLiveOnStage);

module.exports = router;
