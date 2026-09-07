const express = require("express");
const { getDropdown } = require("../controllers/dropdownController");
const router = express.Router();

router.route("/").get(getDropdown);

module.exports = router;
