require("dotenv").config();
const { Pool } = require("pg");

// ✅ PostgreSQL Configuration
const pool = new Pool({
  user: process.env.DB_USER || "postgres",  // Default user
  host: process.env.DB_HOST || "localhost", 
  database: process.env.DB_NAME || "event_management",
  password: process.env.DB_PASSWORD || "",  // Ensure this is set
  port: process.env.DB_PORT || 5432, 
});

// ✅ Test the connection
pool.connect()
  .then(() => console.log("✅ PostgreSQL Connected Successfully"))
  .catch((err) => console.error("❌ Database Connection Error:", err));

module.exports = pool;
