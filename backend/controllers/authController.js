const { pool } = require("../config/db");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
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

    // ✅ FIXED RESPONSE
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// =v
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exist = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (exist.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, hashed, role || "employee"]
    );

    const user = result.rows[0];

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.json({ message: "User registered successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};