const { pool } = require("../config/db");

exports.getMyPayslip = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's salary from users table
    const userRes = await pool.query(
      "SELECT salary FROM users WHERE id=$1", [userId]
    );

    if (userRes.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    const gross = parseFloat(userRes.rows[0].salary) || 0;

    // Standard salary breakdown
    const basicSalary       = parseFloat((gross * 0.50).toFixed(2));
    const hra               = parseFloat((gross * 0.20).toFixed(2));
    const conveyance        = parseFloat((gross * 0.10).toFixed(2));
    const medicalAllowance  = parseFloat((gross * 0.10).toFixed(2));
    const specialAllowance  = parseFloat((gross * 0.10).toFixed(2));
    const grossEarnings     = gross;
    const providentFund     = parseFloat((gross * 0.12).toFixed(2));
    const professionalTax   = 200;
    const incomeTax         = parseFloat((gross * 0.05).toFixed(2));
    const totalDeductions   = parseFloat((providentFund + professionalTax + incomeTax).toFixed(2));
    const netSalary         = parseFloat((grossEarnings - totalDeductions).toFixed(2));

    res.json({
      basicSalary, hra, conveyance, medicalAllowance, specialAllowance,
      grossEarnings, providentFund, professionalTax, incomeTax,
      totalDeductions, netSalary,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
