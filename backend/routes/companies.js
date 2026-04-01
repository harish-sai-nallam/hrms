const router = require("express").Router();

const { getCompanies } = require("../controllers/companyController");

router.get("/", getCompanies);

module.exports = router;