const { pool } = require("../config/db");

exports.getLeaves = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        l.id,
        l.employee_id AS "employeeId",
        u.name,
        l.type,
        l.from_date AS "from",
        l.to_date AS "to",
        l.days,
        l.status,
        l.reason
      FROM leaves l
      JOIN users u ON u.id = l.employee_id
      ORDER BY l.id DESC
    `);

    res.json(result.rows);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};