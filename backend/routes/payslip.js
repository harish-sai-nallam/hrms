const router = require("express").Router();
const auth   = require("../middleware/authMiddleware");
const { getMyPayslip } = require("../controllers/payslipController");
router.get("/", auth, getMyPayslip);
module.exports = router;
