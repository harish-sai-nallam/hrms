const router = require("express").Router();
const { login, register, logout } = require("../controllers/authController");

router.post("/login",    login);
router.post("/register", register);
router.post("/logout",   logout);   // BUG FIX 7: was missing

// BUG FIX 2: /me now returns name because session stores it
router.get("/me", (req, res) => {
  if (!req.session.user) return res.status(401).json({});
  res.json(req.session.user);   // { id, name, email, role }
});

module.exports = router;
