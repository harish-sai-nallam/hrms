const router = require("express").Router();

const { getHolidays } = require("../controllers/holidayController");

router.get("/", getHolidays);

module.exports = router;