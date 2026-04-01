const { pool } = require("../config/db");

exports.getCompanies = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM companies ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};