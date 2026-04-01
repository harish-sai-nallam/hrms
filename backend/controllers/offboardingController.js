const { pool } = require("../config/db");

// ================= GET =================
exports.getOffboarding = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        employee_id AS "employeeId",
        name,
        department,
        exit_date AS "exitDate",
        exit_type AS "exitType",
        reason,
        notice_period AS "noticePeriod",
        settlement_status AS "settlementStatus",
        exit_notes AS "exitInterviewNotes"
      FROM offboarding
      ORDER BY id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= CREATE =================
exports.createOffboarding = async (req, res) => {
  try {
    const {
      employeeId,
      name,
      department,
      exitDate,
      exitType,
      reason,
      noticePeriod,
      settlementStatus,
      exitInterviewNotes
    } = req.body;

    if (!employeeId || !name || !exitDate) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    await pool.query(
      `INSERT INTO offboarding 
      (employee_id, name, department, exit_date, exit_type, reason, notice_period, settlement_status, exit_notes)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        employeeId,
        name,
        department,
        exitDate,
        exitType,
        reason,
        noticePeriod,
        settlementStatus,
        exitInterviewNotes
      ]
    );

    res.json({ message: "Offboarding record created" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= UPDATE =================
exports.updateOffboarding = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      employeeId,
      name,
      department,
      exitDate,
      exitType,
      reason,
      noticePeriod,
      settlementStatus,
      exitInterviewNotes
    } = req.body;

    await pool.query(
      `UPDATE offboarding SET
        employee_id=$1,
        name=$2,
        department=$3,
        exit_date=$4,
        exit_type=$5,
        reason=$6,
        notice_period=$7,
        settlement_status=$8,
        exit_notes=$9
      WHERE id=$10`,
      [
        employeeId,
        name,
        department,
        exitDate,
        exitType,
        reason,
        noticePeriod,
        settlementStatus,
        exitInterviewNotes,
        id
      ]
    );

    res.json({ message: "Updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= DELETE =================
exports.deleteOffboarding = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM offboarding WHERE id=$1",
      [id]
    );

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};