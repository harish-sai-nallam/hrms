const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const { getLeaves } = require("../controllers/leaveController");

router.get("/", auth, getLeaves);

module.exports = router;