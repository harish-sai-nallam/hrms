const router = require("express").Router();
const { getPolicies } = require("../controllers/policiesController");
router.get("/", getPolicies);
module.exports = router;
