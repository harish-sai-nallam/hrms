const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createSuperAdmin,
  getSuperAdmins,
  deleteSuperAdmin
} = require("../controllers/adminController");

router.get("/", auth, role(["super_admin"]), getSuperAdmins);
router.post("/", auth, role(["super_admin"]), createSuperAdmin);
router.delete("/:id", auth, role(["super_admin"]), deleteSuperAdmin);

module.exports = router;