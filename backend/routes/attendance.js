const router = require("express").Router();
const auth   = require("../middleware/authMiddleware");
const {
  getAttendance,
  getMyAttendance,
  clockIn,
  clockOut,
} = require("../controllers/attendanceController");

router.get("/",          auth, getAttendance);     // team view
router.get("/me",        auth, getMyAttendance);   // BUG FIX 8: self view
router.post("/clock-in",  auth, clockIn);          // BUG FIX 9
router.post("/clock-out", auth, clockOut);         // BUG FIX 9

module.exports = router;
