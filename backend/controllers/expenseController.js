const { pool } = require("../config/db");

exports.getExpenses = async (req, res) => {
  try {
    const user = req.session.user;

    let query = "";
    let params = [];

    // 👇 ROLE BASED LOGIC
    if (user.role === "employee") {
      query = `
        SELECT 
          e.id,
          e.employee_id AS "employeeId",
          u.name,
          e.category,
          e.amount,
          e.date,
          e.status,
          e.description
        FROM expenses e
        JOIN users u ON u.id = e.employee_id
        WHERE e.employee_id = $1
        ORDER BY e.id DESC
      `;
      params = [user.id];

    } else {
      // manager / admin / super_admin
      query = `
        SELECT 
          e.id,
          e.employee_id AS "employeeId",
          u.name,
          e.category,
          e.amount,
          e.date,
          e.status,
          e.description
        FROM expenses e
        JOIN users u ON u.id = e.employee_id
        ORDER BY e.id DESC
      `;
    }

    const result = await pool.query(query, params);

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.createExpense = async (req, res) => {
  try {
    const user = req.session.user;
    const { category, amount, description } = req.body;

    await pool.query(
      `INSERT INTO expenses (employee_id, category, amount, date, status, description)
       VALUES ($1, $2, $3, CURRENT_DATE, $4, $5)`,
      [user.id, category, amount, "pending", description]
    );

    res.json({ message: "Expense created" });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
};