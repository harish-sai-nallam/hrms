const { pool } = require("../config/db");

exports.getAttendance = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        a.id,
        a.employee_id AS "employeeId",
        u.name,
        a.date,
        a.clock_in AS "clockIn",
        a.clock_out AS "clockOut",
        a.status,
        a.hours
      FROM attendance a
      JOIN users u ON u.id = a.employee_id
      ORDER BY a.date DESC
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};