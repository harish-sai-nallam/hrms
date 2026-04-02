const { pool } = require("../config/db");

// GET all attendance (team view for manager)
exports.getAttendance = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        a.id,
        a.employee_id AS "employeeId",
        u.name,
        a.date,
        a.clock_in  AS "clockIn",
        a.clock_out AS "clockOut",
        a.status,
        a.hours
      FROM attendance a
      JOIN users u ON u.id = a.employee_id
      ORDER BY a.date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET current user's own attendance history (BUG FIX 8: was missing)
exports.getMyAttendance = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(`
      SELECT
        id,
        date,
        clock_in  AS "checkIn",
        clock_out AS "checkOut",
        status,
        hours
      FROM attendance
      WHERE employee_id = $1
      ORDER BY date DESC
    `, [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST clock-in (BUG FIX 9: was missing)
exports.clockIn = async (req, res) => {
  try {
    const userId = req.user.id;
    const today  = new Date().toISOString().split("T")[0];
    const now    = new Date().toTimeString().split(" ")[0]; // HH:MM:SS

    // Upsert: insert row for today if not exists, update clock_in
    await pool.query(`
      INSERT INTO attendance (employee_id, date, clock_in, status)
      VALUES ($1, $2, $3, 'present')
      ON CONFLICT (employee_id, date)
      DO UPDATE SET clock_in = $3, status = 'present'
    `, [userId, today, now]);

    res.json({ message: "Clocked in", clockIn: now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST clock-out (BUG FIX 9: was missing)
exports.clockOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const today  = new Date().toISOString().split("T")[0];
    const now    = new Date().toTimeString().split(" ")[0];

    const rec = await pool.query(
      "SELECT clock_in FROM attendance WHERE employee_id=$1 AND date=$2",
      [userId, today]
    );

    let totalHours = null;
    if (rec.rows.length > 0 && rec.rows[0].clock_in) {
      const [inH, inM] = rec.rows[0].clock_in.split(":").map(Number);
      const [outH, outM] = now.split(":").map(Number);
      const mins = (outH * 60 + outM) - (inH * 60 + inM);
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      totalHours = `${h}h ${m}m`;

      await pool.query(`
        UPDATE attendance
        SET clock_out=$1, hours=ROUND($2::numeric,2)
        WHERE employee_id=$3 AND date=$4
      `, [now, (mins / 60).toFixed(2), userId, today]);
    }

    res.json({ message: "Clocked out", clockOut: now, totalHours });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
