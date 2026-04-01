const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getEmployees,
  createEmployee,
  deleteEmployee
} = require("../controllers/employeeController");

router.get("/", auth, role(["super_admin", "admin"]), getEmployees);
router.post("/", auth, role(["super_admin", "admin"]), createEmployee);
router.delete("/:id", auth, role(["super_admin", "admin"]), deleteEmployee);

module.exports = router;