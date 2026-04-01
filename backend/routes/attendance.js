const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const { getAttendance } = require("../controllers/attendanceController");

router.get("/", auth, getAttendance);

module.exports = router;