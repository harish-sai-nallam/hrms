const { pool } = require("../config/db");
const bcrypt = require("bcrypt");

// GET all super admins
exports.getSuperAdmins = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, created_at AS added_on FROM super_admins ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// CREATE super admin
exports.createSuperAdmin = async (req, res) => {
  try {
    const { name, email } = req.body;

    const password = "123456"; // default (change later)
    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO super_admins (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at AS added_on`,
      [name, email, hashed]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// DELETE super admin
exports.deleteSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM super_admins WHERE id = $1",
      [id]
    );

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};