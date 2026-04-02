// BUG FIX 3: was (...allowedRoles) which broke when called as role(["admin","super_admin"])
// Now supports both: role("admin", "super_admin") AND role(["admin", "super_admin"])
const roleMiddleware = (...args) => {
  const allowed = args.flat(); // flatten array if passed as role(["a","b"])
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    if (!allowed.includes(req.user.role))
      return res.status(403).json({ error: `Forbidden. Role "${req.user.role}" not allowed.` });
    next();
  };
};

module.exports = roleMiddleware;
