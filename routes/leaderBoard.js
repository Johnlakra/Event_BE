const express = require("express");
const {
  getLeaderBoardItems,
  createLeaderBoard,
  deleteLeaderBoard,
  getLeaderBoardItem,
  updateLeaderBoard,
  addLeaderBoardBatch,
} = require("../controllers/leaderBoardController");
const router = express.Router();

router
  .route("/")
  .get(getLeaderBoardItems)
  .post(createLeaderBoard)
  .put(updateLeaderBoard);

// Must be registered before "/:id" so "batch" is not read as an id.
router.route("/batch").post(addLeaderBoardBatch);

router.route("/:id").get(getLeaderBoardItem).delete(deleteLeaderBoard);

module.exports = router;
