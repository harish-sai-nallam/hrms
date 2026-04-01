const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const {
  getOffboarding,
  createOffboarding,
  updateOffboarding,
  deleteOffboarding
} = require("../controllers/offboardingController");

router.get("/", auth, getOffboarding);
router.post("/", auth, createOffboarding);
router.put("/:id", auth, updateOffboarding);
router.delete("/:id", auth, deleteOffboarding);

module.exports = router;