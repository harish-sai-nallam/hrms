const { pool } = require("../config/db");

exports.getPolicies = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM policies ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
