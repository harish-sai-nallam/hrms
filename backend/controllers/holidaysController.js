const { pool } = require("../config/db");

exports.getHolidays = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, date, type FROM holidays ORDER BY date ASC"
    );

    res.json(result.rows);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};