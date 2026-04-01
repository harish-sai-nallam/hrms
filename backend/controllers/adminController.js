const { pool } = require("../config/db");
const bcrypt = require("bcrypt");

// ✅ GET ADMINS
exports.getSuperAdmins = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE role IN ('admin','super_admin')"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ CREATE ADMIN
exports.createSuperAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4)",
      [name, email, hashed, "admin"]
    );

    res.json({ message: "Admin created" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ DELETE ADMIN
exports.deleteSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM users WHERE id=$1", [id]);

    res.json({ message: "Admin deleted" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};