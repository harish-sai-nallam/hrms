const { pool } = require("../config/db");
const bcrypt = require("bcrypt");


// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    res.json({
      message: "Login successful",
      role: user.role,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// ================= REGISTER =================

const registerUser = async (role, req, res) => {
  try {
    const { name, email, password } = req.body;

    // check in same table
    const existing = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)`,
      [name, email, hashed, role]
    );

    res.json({ message: `${role} created` });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// wrappers
exports.registerSuperAdmin = (req, res) =>
  registerUser("super_admin", req, res);

exports.registerAdmin = (req, res) =>
  registerUser("admin", req, res);

exports.registerEmployee = (req, res) =>
  registerUser("employee", req, res);