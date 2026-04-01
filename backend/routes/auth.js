const router = require("express").Router();
const { login, register } = require("../controllers/authController");

router.post("/login", login);
router.post("/register", register);
// routes/auth.js
router.get("/me", (req, res) => {
  if (!req.session.user) return res.status(401).json({});
  res.json(req.session.user);
});

module.exports = router;