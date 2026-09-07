const express = require("express");
const router = express.Router();
const {
  createDeanery,
  getDeanery,
  getDeneraries,
  editDeanery,
  deleteDeanery,
} = require("../controllers/deaneryController");

router.route("/").get(getDeneraries).post(createDeanery).put(editDeanery);

router.route("/:id").get(getDeanery).delete(deleteDeanery);

module.exports = router;
