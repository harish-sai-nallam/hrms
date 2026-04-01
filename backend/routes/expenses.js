const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const { getExpenses, createExpense } = require("../controllers/expenseController");

router.get("/", auth, getExpenses);
router.post("/", auth, createExpense);

module.exports = router;