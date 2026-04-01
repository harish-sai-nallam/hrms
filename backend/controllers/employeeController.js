const { pool } = require("../config/db");
const bcrypt = require("bcrypt");


// GET all employees
exports.getEmployees = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, department, position, status, join_date, salary, phone
       FROM users
       WHERE role = $1
       ORDER BY id DESC`,
      ["employee"]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// CREATE employee
exports.createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      department,
      position,
      status,
      join_date,
      salary,
      phone
    } = req.body;

    const existing = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password || "123456", 10);

    const result = await pool.query(
      `INSERT INTO users
      (name, email, password, role, department, position, status, join_date, salary, phone)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING id, name, email`,
      [
        name,
        email,
        hashed,
        "employee",
        department,
        position,
        status,
        join_date,
        salary,
        phone
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// DELETE employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM users WHERE id = $1 AND role = $2",
      [id, "employee"]
    );

    res.json({ message: "Employee deleted" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};