const express = require("express");
const {
  getParishes,
  createParish,
  editParish,
  deleteParish,
  getParish,
} = require("../controllers/parishController");
const router = express.Router();

router.route("/").get(getParishes).post(createParish).put(editParish);

router.route("/:id").get(getParish).delete(deleteParish);

module.exports = router;
