const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "hrms",
  password: process.env.DB_PASSWORD || "yourpassword",
  port: process.env.DB_PORT || 5432,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log("PostgreSQL Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = { connectDB, pool };